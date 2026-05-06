// ============================================================
//  Ma Carte — Carnet de Route Personnel
//  Géocodage automatique via Nominatim (OpenStreetMap)
//  Dépend de : firebase-config.js (auth, db, currentUser,
//               firebaseReady, firebase déjà initialisés)
// ============================================================

let maCarteActive  = false;
let maCarteMarkers = {};  // marqueurs de la carte active seulement
let mcSelectedId   = null;

// ---- Multi-cartes --------------------------------------------------
let userMaps        = {};   // { mapId: { id, name, createdAt } }
let activeMapId     = 'default';
let _migrationDone  = false;
let _allMarkersCache = {}; // tous les marqueurs toutes cartes confondues

// ---- Dashboard -----
let _inventaireAll  = []; // liste plate de cuvées (pour le filtre)

// ============================================================
//  Projection SVG — transformation affine lat/lng → SVG x,y
//
//  Calibrée sur 5 domaines du dataset dont les coordonnées
//  géographiques sont connues :
//    Tissot (Jura)          lat=46.902  lng=5.768   x=565  y=315
//    Lacourte (Champagne)   lat=49.219  lng=3.964   x=462  y=160
//    Chevalier (Loire-Atl.) lat=47.028  lng=-1.642  x=228  y=268
//    Loïc Mahé (Savennières)lat=47.378  lng=-0.618  x=255  y=245
//    La Taille au Loup (37) lat=47.382  lng=0.838   x=310  y=250
//
//  x = Ax * lng + Bx * lat + Cx
//  y = Ay * lng + By * lat + Cy
// ============================================================
const SVG_Ax =  46.07,  SVG_Bx = -7.43,   SVG_Cx = 647.36;
const SVG_Ay =   5.275, SVG_By = -62.8,   SVG_Cy = 3230.02;

// Limites du viewBox SVG (105 18 568 567) + marge intérieure de 10
const SVG_XMIN = 115, SVG_XMAX = 663;
const SVG_YMIN = 28,  SVG_YMAX = 575;

function _clamp(v, min, max) { return v < min ? min : v > max ? max : v; }

function latLngToSVG(lat, lng) {
    return {
        x: _clamp(SVG_Ax * lng + SVG_Bx * lat + SVG_Cx, SVG_XMIN, SVG_XMAX),
        y: _clamp(SVG_Ay * lng + SVG_By * lat + SVG_Cy, SVG_YMIN, SVG_YMAX)
    };
}

// ============================================================
//  Géocodage — Base Adresse Nationale (gouvernement français)
//  api-adresse.data.gouv.fr — gratuit, sans clé, CORS ouvert (*)
//  Fonctionne depuis file://, localhost et tout hébergement HTTPS
// ============================================================
async function geocodeAddress(address) {
    // ① Essai principal : BAN (Base Adresse Nationale)
    // La propriété `context` retourne "33, Gironde, Nouvelle-Aquitaine"
    // → le premier segment est le numéro de département.
    try {
        const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address)}&limit=1`;
        const res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            if (data.features && data.features.length) {
                const feat = data.features[0];
                const [lng, lat] = feat.geometry.coordinates;
                const context  = feat.properties.context || '';
                const rawDept  = context.split(',')[0].trim();
                const deptCode = rawDept ? rawDept.padStart(2, '0') : null;
                return { lat, lng, displayName: feat.properties.label, deptCode };
            }
        }
    } catch (_) { /* fallback */ }

    // ② Fallback : Nominatim/OpenStreetMap (fonctionne en HTTPS)
    // On demande les détails d'adresse pour extraire le code postal.
    const url = `https://nominatim.openstreetmap.org/search?` +
        `q=${encodeURIComponent(address)}&format=json&limit=1&countrycodes=fr&addressdetails=1`;
    const res = await fetch(url, {
        headers: { 'Accept-Language': 'fr', 'User-Agent': 'RouteDsVinsMarguerite/1.0' }
    });
    if (!res.ok) throw new Error('Géocodage indisponible');
    const data = await res.json();
    if (!data.length) return null;
    const postcode = data[0].address?.postcode || '';
    const deptCode = postcode.length >= 2 ? postcode.substring(0, 2).padStart(2, '0') : null;
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), displayName: data[0].display_name, deptCode };
}

// ============================================================
//  Toggle entre Carte Marguerite et Ma Carte
// ============================================================
function toggleMapView() {
    maCarteActive = !maCarteActive;

    const toggleBtn = document.getElementById('map-view-toggle');
    const fab       = document.getElementById('mc-fab');
    const container = document.getElementById('map-container');

    if (maCarteActive) {
        if (!currentUser) {
            maCarteActive = false;
            openAuthModal();
            return;
        }
        if (toggleBtn) { toggleBtn.textContent = '← Carte Marguerite'; toggleBtn.classList.add('mc-toggle-active'); }
        fab.classList.remove('hidden');
        container.classList.add('ma-carte-mode');

        // Réinitialiser la vue officielle : zoom, région active, panneau d'info
        const svg = document.getElementById('france-map');
        if (svg) {
            svg.querySelectorAll('.wine-region.active').forEach(p => p.classList.remove('active'));
            if (typeof initialViewBox !== 'undefined' && initialViewBox) {
                svg.setAttribute('viewBox', initialViewBox.join(' '));
            }
        }
        document.getElementById('markers-container').innerHTML = '';
        const infoPanel = document.getElementById('info-panel');
        if (infoPanel) infoPanel.classList.remove('visible');

        loadUserMarkers();
        updateMapIndicator();
    } else {
        if (toggleBtn) { toggleBtn.textContent = 'Ma Carte →'; toggleBtn.classList.remove('mc-toggle-active'); }
        fab.classList.add('hidden');
        container.classList.remove('ma-carte-mode');
        _clearMarkersLayer();
        _clearDepartmentColors();
        closeMcInfoPanel();
        closeMcForm();
        updateMapIndicator();
    }
}

// ============================================================
//  Firestore — CRUD
// ============================================================
async function loadUserMarkers() {
    if (!currentUser || !firebaseReady) return;
    try {
        // 1. Charger les métadonnées de cartes (sous-collection "maps")
        await _loadUserMaps();

        // 2. Charger tous les marqueurs (toutes cartes)
        const snap = await db
            .collection('user_maps')
            .doc(currentUser.uid)
            .collection('markers')
            .get();
        _allMarkersCache = {};
        snap.forEach(d => { _allMarkersCache[d.id] = { id: d.id, ...d.data() }; });

        // 3. Migration : assigner mapId aux anciens marqueurs + enrichir deptCode
        await _runMigrationIfNeeded();
        await _enrichMissingDeptCodes();

        // 3b. Reclamper les marqueurs dont les coordonnées SVG sont hors carte
        _clampAllMarkers();

        // 4. Filtrer pour la carte active et afficher
        _filterMarkersForActiveMap();
        _renderAllMarkers();
    } catch (e) {
        console.warn('Erreur chargement Ma Carte :', e);
    }
}

// ============================================================
//  Clamp — recalcule les coordonnées SVG hors viewBox
// ============================================================
function _clampAllMarkers() {
    Object.values(_allMarkersCache).forEach(m => {
        if (m.lat && m.lng) {
            // Recalcul + clamp depuis lat/lng (source de vérité)
            const { x, y } = latLngToSVG(m.lat, m.lng);
            if (m.x !== x || m.y !== y) {
                m.x = x;
                m.y = y;
                // Persist silencieusement si changement
                db.collection('user_maps').doc(currentUser.uid)
                  .collection('markers').doc(m.id)
                  .update({ x, y }).catch(() => {});
            }
        } else {
            // Pas de lat/lng : clamp brut
            m.x = _clamp(m.x, SVG_XMIN, SVG_XMAX);
            m.y = _clamp(m.y, SVG_YMIN, SVG_YMAX);
        }
    });
}

// ============================================================
//  Multi-cartes — helpers Firestore
// ============================================================
async function _loadUserMaps() {
    const snap = await db
        .collection('user_maps').doc(currentUser.uid)
        .collection('maps').get();
    userMaps = {};
    snap.forEach(d => { userMaps[d.id] = { id: d.id, ...d.data() }; });
    if (!Object.keys(userMaps).length) {
        await _createMapDoc('default', 'Ma Carte');
    }
}

async function _createMapDoc(mapId, name) {
    await db.collection('user_maps').doc(currentUser.uid)
            .collection('maps').doc(mapId)
            .set({ name, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    userMaps[mapId] = { id: mapId, name };
}

async function _runMigrationIfNeeded() {
    if (_migrationDone) return;
    const toMigrate = Object.values(_allMarkersCache).filter(m => !m.mapId);
    if (!toMigrate.length) { _migrationDone = true; return; }
    if (!userMaps['default']) await _createMapDoc('default', 'Ma Carte');
    const batch = db.batch();
    toMigrate.forEach(m => {
        const ref = db.collection('user_maps').doc(currentUser.uid)
                      .collection('markers').doc(m.id);
        batch.update(ref, { mapId: 'default' });
        _allMarkersCache[m.id].mapId = 'default';
    });
    await batch.commit();
    _migrationDone = true;
}

function _filterMarkersForActiveMap() {
    maCarteMarkers = {};
    Object.values(_allMarkersCache).forEach(m => {
        if (m.mapId === activeMapId) maCarteMarkers[m.id] = m;
    });
}

// ============================================================
//  Multi-cartes — gestion UI
// ============================================================
async function createMap(name) {
    if (!currentUser || !name.trim()) return;
    const id = 'map_' + Date.now();
    await _createMapDoc(id, name.trim());
    activeMapId = id;
    _filterMarkersForActiveMap();
    _renderAllMarkers();
    renderMapSwitcher();
    if (_isDashboardOpen()) renderMdCartesList();
}

async function renameMap(mapId, newName) {
    if (!newName.trim()) return;
    await db.collection('user_maps').doc(currentUser.uid)
            .collection('maps').doc(mapId)
            .update({ name: newName.trim() });
    userMaps[mapId].name = newName.trim();
    renderMapSwitcher();
    if (_isDashboardOpen()) renderMdCartesList();
}

async function deleteMap(mapId) {
    if (Object.keys(userMaps).length <= 1) {
        alert('Vous ne pouvez pas supprimer votre seule carte.');
        return;
    }
    if (!confirm(`Supprimer la carte "${userMaps[mapId]?.name}" et tous ses marqueurs ?`)) return;
    const toDelete = Object.values(_allMarkersCache).filter(m => m.mapId === mapId);
    const batch = db.batch();
    toDelete.forEach(m => {
        batch.delete(db.collection('user_maps').doc(currentUser.uid)
                       .collection('markers').doc(m.id));
        delete _allMarkersCache[m.id];
    });
    await batch.commit();
    await db.collection('user_maps').doc(currentUser.uid)
            .collection('maps').doc(mapId).delete();
    delete userMaps[mapId];
    if (activeMapId === mapId) activeMapId = Object.keys(userMaps)[0] || 'default';
    _filterMarkersForActiveMap();
    _renderAllMarkers();
    renderMapSwitcher();
    if (_isDashboardOpen()) renderMdCartesList();
}

function switchActiveMap(mapId) {
    activeMapId = mapId;
    _filterMarkersForActiveMap();
    _renderAllMarkers();
    closeMcInfoPanel();
    updateMapIndicator();
}

function promptCreateMap() {
    const name = prompt('Nom de la nouvelle carte :');
    if (name && name.trim()) createMap(name.trim());
}

function promptRenameMap(mapId) {
    const current = userMaps[mapId]?.name || '';
    const name = prompt('Nouveau nom :', current);
    if (name && name.trim() && name.trim() !== current) renameMap(mapId, name.trim());
}

function renderMapSwitcher() {
    const sel = document.getElementById('mc-map-select');
    if (!sel) return;
    sel.innerHTML = Object.values(userMaps)
        .map(m => `<option value="${_esc(m.id)}" ${m.id === activeMapId ? 'selected' : ''}>${_esc(m.name)}</option>`)
        .join('');
    updateMapIndicator();
}

function updateMapIndicator() {
    const indicator = document.getElementById('map-indicator');
    const nameEl    = document.getElementById('map-indicator-name');
    if (!indicator || !nameEl) return;
    if (!maCarteActive) {
        nameEl.textContent = 'Carte Marguerite';
        indicator.classList.remove('mc-active');
    } else {
        nameEl.textContent = userMaps[activeMapId]?.name || 'Ma Carte';
        indicator.classList.add('mc-active');
    }
}

function handleMapIndicatorClick() {
    const popup = document.getElementById('map-indicator-popup');
    if (!popup.classList.contains('hidden')) {
        popup.classList.add('hidden');
        return;
    }
    let html = `<div class="mip-item ${!maCarteActive ? 'mip-active' : ''}" onclick="selectMapFromIndicator(null)">Carte Marguerite</div>`;
    if (currentUser && Object.keys(userMaps).length) {
        Object.values(userMaps).forEach(m => {
            const active = maCarteActive && activeMapId === m.id;
            html += `<div class="mip-item ${active ? 'mip-active' : ''}" onclick="selectMapFromIndicator('${_esc(m.id)}')">${_esc(m.name)}</div>`;
        });
    } else {
        html += `<div class="mip-item" onclick="selectMapFromIndicator('__login__')">Ma Carte →</div>`;
    }
    popup.innerHTML = html;
    popup.classList.remove('hidden');

    // Positionner le popup juste au-dessus du bouton
    const btn = document.getElementById('map-indicator');
    const btnRect = btn.getBoundingClientRect();
    popup.style.bottom = (window.innerHeight - btnRect.top + 8) + 'px';
    popup.style.left   = (btnRect.left + btnRect.width / 2) + 'px';
    popup.style.top    = 'auto';
}

function selectMapFromIndicator(mapId) {
    document.getElementById('map-indicator-popup').classList.add('hidden');
    if (mapId === null) {
        if (maCarteActive) toggleMapView();
    } else if (mapId === '__login__') {
        if (currentUser) toggleMapView(); else openAuthModal();
    } else {
        activeMapId = mapId; // ← fixer la carte AVANT le chargement
        if (!maCarteActive) toggleMapView();
        else switchActiveMap(mapId);
    }
}

// ============================================================
//  Migration — reverse géocodage pour les anciens marqueurs
//  qui n'ont pas de deptCode stocké en Firestore.
//  Utilise l'API BAN (reverse) : gratuit, CORS ouvert.
// ============================================================
async function _enrichMissingDeptCodes() {
    const missing = Object.values(_allMarkersCache).filter(m => !m.deptCode && m.lat && m.lng);
    for (const m of missing) {
        try {
            const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${m.lng}&lat=${m.lat}`;
            const res = await fetch(url);
            if (!res.ok) continue;
            const data = await res.json();
            if (!data.features || !data.features.length) continue;
            const context  = data.features[0].properties.context || '';
            const rawDept  = context.split(',')[0].trim();
            const deptCode = rawDept ? rawDept.padStart(2, '0') : null;
            if (!deptCode) continue;
            // Mise à jour des deux caches locaux
            if (_allMarkersCache[m.id]) _allMarkersCache[m.id].deptCode = deptCode;
            if (maCarteMarkers[m.id])   maCarteMarkers[m.id].deptCode   = deptCode;
            // Persistance Firestore (une seule fois, silencieuse)
            db.collection('user_maps').doc(currentUser.uid)
              .collection('markers').doc(m.id)
              .update({ deptCode })
              .catch(() => {});
        } catch (_) { /* silencieux — coloration tentée au prochain chargement */ }
    }
}

async function _saveMarker(data) {
    const markerData = { ...data, mapId: activeMapId };
    const ref = await db
        .collection('user_maps')
        .doc(currentUser.uid)
        .collection('markers')
        .add({ ...markerData, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    const newMarker = { id: ref.id, ...markerData };
    _allMarkersCache[ref.id] = newMarker;
    maCarteMarkers[ref.id]   = newMarker;
    _renderAllMarkers();
    // --- Fil d'actualité ---
    if (typeof createActivityPost === 'function') {
        const type = data.statut === 'fait' ? 'marker_fait' : 'marker_essayer';
        createActivityPost(type, data.name);
        // Post "Coup de Cœur" pour chaque cuvée marquée
        if (Array.isArray(data.cuvees)) {
            data.cuvees.filter(c => c.statut === 'coup_de_coeur' && c.nom)
                       .forEach(c => createActivityPost('cuvee_coeur', data.name, c.nom));
        }
    }
    return ref.id;
}

async function _deleteMarker(markerId) {
    await db
        .collection('user_maps')
        .doc(currentUser.uid)
        .collection('markers')
        .doc(markerId)
        .delete();
    delete maCarteMarkers[markerId];
    delete _allMarkersCache[markerId];
    _renderAllMarkers();
}

async function _updateMarker(markerId, data) {
    // Si l'adresse a changé, recalculer le deptCode
    const prev = _allMarkersCache[markerId];
    if (data.address && prev && data.address !== prev.address) {
        // Extraction rapide depuis le code postal dans l'adresse
        const match = data.address.match(/\b(\d{5})\b/);
        if (match) {
            data.deptCode = match[1].substring(0, 2).padStart(2, '0');
        } else {
            // Tentative via géocodage complet
            try {
                const geo = await geocodeAddress(data.address);
                if (geo?.deptCode) data.deptCode = geo.deptCode;
            } catch (_) {}
        }
    }
    await db
        .collection('user_maps')
        .doc(currentUser.uid)
        .collection('markers')
        .doc(markerId)
        .update({ ...data, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
    // Mise à jour des deux caches locaux
    Object.assign(maCarteMarkers[markerId], data);
    if (_allMarkersCache[markerId]) Object.assign(_allMarkersCache[markerId], data);
    _renderAllMarkers();
}

// ============================================================
//  Rendu SVG des marqueurs personnels
// ============================================================
function _clearMarkersLayer() {
    const layer = document.getElementById('mc-markers-layer');
    if (layer) layer.innerHTML = '';
}

function _renderAllMarkers() {
    _clearMarkersLayer();
    const svg = document.getElementById('france-map');
    if (!svg) return;

    let layer = document.getElementById('mc-markers-layer');
    if (!layer) {
        layer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        layer.setAttribute('id', 'mc-markers-layer');
        svg.appendChild(layer);
    }
    Object.values(maCarteMarkers).forEach(m => layer.appendChild(_buildPin(m)));
    _colorDepartments();
}

// ============================================================
//  Coloration dynamique des départements (statut "Fait")
// ============================================================

/**
 * Applique la classe mc-dept-fait à chaque département SVG
 * pour lequel l'utilisateur a au moins un marqueur "fait".
 */
function _colorDepartments() {
    _clearDepartmentColors();
    const faitDepts = new Set();
    Object.values(maCarteMarkers).forEach(m => {
        if (m.statut !== 'fait') return;

        let code = m.deptCode;

        // Fallback : extraire le code département depuis le code postal (5 chiffres) dans l'adresse
        if (!code && m.address) {
            const match = m.address.match(/\b(\d{5})\b/);
            if (match) {
                code = match[1].substring(0, 2).padStart(2, '0');
                // Mettre à jour les caches et persister silencieusement
                if (_allMarkersCache[m.id]) _allMarkersCache[m.id].deptCode = code;
                if (maCarteMarkers[m.id])   maCarteMarkers[m.id].deptCode   = code;
                if (currentUser) {
                    db.collection('user_maps').doc(currentUser.uid)
                      .collection('markers').doc(m.id)
                      .update({ deptCode: code }).catch(() => {});
                }
            }
        }

        if (code) faitDepts.add(code);
    });
    faitDepts.forEach(code => {
        const path = document.querySelector(
            `#france-map path[data-numerodepartement="${code}"]`
        );
        if (path) path.classList.add('mc-dept-fait');
    });
}

/**
 * Retire la classe mc-dept-fait de tous les départements SVG.
 */
function _clearDepartmentColors() {
    document.querySelectorAll('#france-map path.mc-dept-fait')
        .forEach(p => p.classList.remove('mc-dept-fait'));
}

function _buildPin(marker) {
    const isFait   = marker.statut === 'fait';
    // Mêmes couleurs que les pills du formulaire (sélectionnées)
    const fill     = isFait ? '#1C4220' : '#C4661F';   // --green-dark / --gold
    const px = marker.x;
    const py = marker.y;

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', `mc-pin mc-pin--${marker.statut}`);
    g.setAttribute('data-marker-id', marker.id);
    g.style.cursor = 'pointer';

    // Pastille extérieure (même couleur que la pill active)
    const outer = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    outer.setAttribute('cx', px);
    outer.setAttribute('cy', py);
    outer.setAttribute('r',  '7');
    outer.setAttribute('fill',         fill);
    outer.setAttribute('stroke',       'white');
    outer.setAttribute('stroke-width', '1.5');

    // Pastille intérieure blanche (cohérence avec les pills)
    const inner = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    inner.setAttribute('cx', px);
    inner.setAttribute('cy', py);
    inner.setAttribute('r',  '3');
    inner.setAttribute('fill', 'white');

    g.appendChild(outer);
    g.appendChild(inner);
    g.addEventListener('click', e => { e.stopPropagation(); showMcMarkerInfo(marker.id); });
    return g;
}

// ============================================================
//  Formulaire d'ajout
// ============================================================
function openMcForm() {
    if (!currentUser) { openAuthModal(); return; }

    const modal = document.getElementById('mc-form-modal');
    modal.style.display = 'flex';
    document.getElementById('mc-form').reset();
    // Vider les lignes de cuvées dynamiques (non gérées par reset())
    const list = document.getElementById('mc-cuvees-list');
    if (list) list.innerHTML = '';
    _setGeoStatus('idle', '');
    renderMapSwitcher();
}

function closeMcForm() {
    const modal = document.getElementById('mc-form-modal');
    if (modal) modal.style.display = 'none';
}

async function submitMcForm(e) {
    e.preventDefault();

    const name    = document.getElementById('mc-name').value.trim();
    const address = document.getElementById('mc-address').value.trim();
    const cuvees  = _collectCuvees('mc-cuvees-list');
    const statut  = document.querySelector('input[name="mc-statut"]:checked').value;

    if (!name) return;

    // Adresse obligatoire pour le placement
    if (!address) {
        _setGeoStatus('error', 'Veuillez renseigner une adresse pour placer le point sur la carte.');
        document.getElementById('mc-address').focus();
        return;
    }

    const btn = document.getElementById('mc-submit-btn');
    btn.disabled = true;
    _setGeoStatus('loading', 'Géolocalisation en cours…');

    try {
        // 1. Géocoder l'adresse
        let geo;
        try {
            geo = await geocodeAddress(address);
        } catch (geoErr) {
            console.warn('Géocodage échoué :', geoErr);
            const isFileProtocol = window.location.protocol === 'file:';
            _setGeoStatus('error', isFileProtocol
                ? 'Le géocodage ne fonctionne pas en mode fichier local (file://). Ouvrez le site via un serveur HTTP : lancez serve.py dans le dossier du projet.'
                : 'Impossible de localiser l\'adresse. Vérifiez votre connexion internet.');
            btn.disabled = false;
            return;
        }

        if (!geo) {
            _setGeoStatus('error', 'Adresse introuvable en France. Essayez avec la ville ou le code postal (ex : Saint Patrice, 37130).');
            btn.disabled = false;
            return;
        }

        // 2. Convertir lat/lng en coordonnées SVG
        const { x, y } = latLngToSVG(geo.lat, geo.lng);
        _setGeoStatus('success', `Placé à : ${geo.displayName.split(',').slice(0, 2).join(',')}`);

        // 3. Sauvegarder dans Firestore (deptCode pour la coloration de département)
        try {
            await _saveMarker({ name, address, cuvees, statut, x, y, lat: geo.lat, lng: geo.lng, deptCode: geo.deptCode || null });
        } catch (dbErr) {
            console.warn('Erreur Firestore :', dbErr);
            const isPermission = dbErr.code === 'permission-denied' || String(dbErr).includes('permission');
            _setGeoStatus('error', isPermission
                ? 'Permissions Firestore insuffisantes. Ajoutez la règle user_maps dans la console Firebase (voir instructions).'
                : 'Erreur d\'enregistrement : ' + (dbErr.message || dbErr));
            btn.disabled = false;
            return;
        }

        closeMcForm();
    } catch (err) {
        console.warn('Erreur inattendue :', err);
        _setGeoStatus('error', 'Erreur inattendue : ' + (err.message || err));
        btn.disabled = false;
    }
}

// ---- Indicateur de statut du géocodage --------------------
function _setGeoStatus(state, msg) {
    const el  = document.getElementById('mc-geo-status');
    const btn = document.getElementById('mc-submit-btn');
    if (!el) return;

    el.textContent  = msg;
    el.dataset.state = state;

    if (state === 'loading') {
        btn.textContent = 'Localisation…';
        btn.disabled    = true;
    } else if (state === 'success') {
        btn.textContent = 'Enregistrer';
        btn.disabled    = false;
    } else {
        btn.textContent = 'Enregistrer';
        if (state !== 'error') btn.disabled = false;
    }
}

// ============================================================
//  Notification de confirmation
// ============================================================
function _showSaveNotif() {
    const notif = document.getElementById('mc-save-notif');
    if (!notif) return;
    notif.classList.add('visible');
    setTimeout(() => notif.classList.remove('visible'), 2800);
}

// ============================================================
//  Panneau d'info — mode lecture
// ============================================================
function showMcMarkerInfo(markerId) {
    const m = maCarteMarkers[markerId];
    if (!m) return;
    mcSelectedId = markerId;

    const isFait = m.statut === 'fait';
    const color  = isFait ? '#1C4220' : '#C4661F';
    const label  = isFait ? 'Fait ✓' : 'À essayer';

    const _inItin = typeof isInItineraryMc !== 'undefined' && isInItineraryMc(markerId);
    const panel = document.getElementById('mc-info-panel');
    panel.innerHTML = `
        <div class="mc-ip-header">
            <span class="mc-statut-badge" style="background:${color}">${label}</span>
            <button class="mc-ip-close" onclick="closeMcInfoPanel()" aria-label="Fermer">×</button>
        </div>
        <h3 class="mc-ip-name">${_esc(m.name)}</h3>
        ${m.address ? `<p class="mc-ip-address">📍 ${_esc(m.address)}</p>` : ''}
        ${_renderCuveesReadHtml(m.cuvees)}
        <button class="btn-add-to-itin ${_inItin ? 'added' : ''}"
                data-mc-id="${markerId}"
                onclick="addMcMarkerToItinerary('${markerId}')"
                ${_inItin ? 'disabled' : ''}>
            <span class="btn-add-to-itin-icon">${_inItin ? '✓' : '+'}</span>
            ${_inItin ? 'Dans votre itinéraire' : 'Ajouter à mon itinéraire'}
        </button>
        <div class="mc-ip-actions">
            <button class="mc-edit-btn" onclick="_renderMcInfoEdit('${markerId}')">✏ Modifier</button>
            <button class="mc-delete-btn" onclick="confirmDeleteMcMarker('${markerId}')">Supprimer</button>
        </div>
    `;
    panel.classList.add('visible');
}

// ============================================================
//  Panneau d'info — mode édition
// ============================================================
function _renderMcInfoEdit(markerId) {
    const m = maCarteMarkers[markerId];
    if (!m) return;

    const panel = document.getElementById('mc-info-panel');
    panel.innerHTML = `
        <div class="mc-ip-header">
            <span class="mc-ip-edit-title">Modifier le domaine</span>
            <button class="mc-ip-close" onclick="showMcMarkerInfo('${markerId}')" aria-label="Annuler">×</button>
        </div>
        <div class="mc-ip-edit-form">
            <label class="mc-ip-label">
                <span>Nom <span class="mc-required">*</span></span>
                <input id="mc-edit-name" type="text" value="${_esc(m.name)}">
            </label>
            <label class="mc-ip-label">
                <span>Adresse</span>
                <input id="mc-edit-address" type="text" value="${_esc(m.address || '')}">
            </label>
            <div class="mc-cuvees-section">
                <div class="mc-cuvees-header">Cuvées</div>
                <div id="mc-edit-cuvees-list"></div>
                <button type="button" class="mc-add-cuvee-btn" onclick="addCuveeRow('mc-edit-cuvees-list')">+ Ajouter une cuvée</button>
            </div>
            <fieldset class="mc-ip-statut-field">
                <legend>Statut du domaine</legend>
                <label class="mc-radio">
                    <input type="radio" name="mc-edit-statut" value="a_essayer" ${m.statut !== 'fait' ? 'checked' : ''}>
                    <span class="mc-radio-pill mc-pill--essayer">À essayer</span>
                </label>
                <label class="mc-radio">
                    <input type="radio" name="mc-edit-statut" value="fait" ${m.statut === 'fait' ? 'checked' : ''}>
                    <span class="mc-radio-pill mc-pill--fait">Fait ✓</span>
                </label>
            </fieldset>
            <p id="mc-edit-error" class="mc-edit-error"></p>
            <div class="mc-ip-edit-actions">
                <button class="btn mc-save-edit-btn" id="mc-save-edit-btn" onclick="saveMcMarkerEdit('${markerId}')">Enregistrer</button>
                <button class="mc-cancel-edit-btn" onclick="showMcMarkerInfo('${markerId}')">Annuler</button>
            </div>
        </div>
    `;

    // Pré-remplir les cuvées existantes
    const cuvees = Array.isArray(m.cuvees)
        ? m.cuvees
        : (m.cuvees ? [{ nom: m.cuvees, appellation: '', prix: '', commentaire: '', statut: 'a_essayer' }] : []);
    cuvees.forEach(c => addCuveeRow('mc-edit-cuvees-list', c));
}

// ============================================================
//  Sauvegarde de l'édition
// ============================================================
async function saveMcMarkerEdit(markerId) {
    const name    = document.getElementById('mc-edit-name')?.value.trim();
    const address = document.getElementById('mc-edit-address')?.value.trim();
    const cuvees  = _collectCuvees('mc-edit-cuvees-list');
    const statut  = document.querySelector('input[name="mc-edit-statut"]:checked')?.value;
    const errEl   = document.getElementById('mc-edit-error');
    const saveBtn = document.getElementById('mc-save-edit-btn');

    if (!name) {
        if (errEl) errEl.textContent = 'Le nom du domaine est obligatoire.';
        document.getElementById('mc-edit-name')?.focus();
        return;
    }

    saveBtn.disabled    = true;
    saveBtn.textContent = 'Enregistrement…';
    if (errEl) errEl.textContent = '';

    try {
        const oldMarker = maCarteMarkers[markerId];
        await _updateMarker(markerId, { name, address, cuvees, statut });
        showMcMarkerInfo(markerId);   // Retour en mode lecture
        _showSaveNotif();
        // --- Fil d'actualité : post si le statut a changé ou nouvelles cuvées coeur ---
        if (typeof createActivityPost === 'function') {
            if (oldMarker && oldMarker.statut !== statut) {
                const type = statut === 'fait' ? 'marker_fait' : 'marker_essayer';
                createActivityPost(type, name);
            }
            if (Array.isArray(cuvees)) {
                const oldCuvees = Array.isArray(oldMarker?.cuvees) ? oldMarker.cuvees : [];
                const oldCoeurs = new Set(oldCuvees.filter(c => c.statut === 'coup_de_coeur').map(c => c.nom));
                cuvees.filter(c => c.statut === 'coup_de_coeur' && c.nom && !oldCoeurs.has(c.nom))
                      .forEach(c => createActivityPost('cuvee_coeur', name, c.nom));
            }
        }
    } catch (err) {
        console.warn('Erreur mise à jour :', err);
        saveBtn.disabled    = false;
        saveBtn.textContent = 'Enregistrer';
        if (errEl) {
            const isPermission = err.code === 'permission-denied';
            errEl.textContent = isPermission
                ? 'Permissions insuffisantes. Ajoutez la règle user_maps dans la console Firebase.'
                : 'Erreur d\'enregistrement. Réessayez.';
        }
    }
}

function closeMcInfoPanel() {
    const panel = document.getElementById('mc-info-panel');
    if (panel) panel.classList.remove('visible');
    mcSelectedId = null;
}

async function confirmDeleteMcMarker(markerId) {
    if (!confirm('Supprimer ce point de votre carnet de route ?')) return;
    await _deleteMarker(markerId);
    closeMcInfoPanel();
}

// ============================================================
//  Cuvées — helpers (formulaire et lecture)
// ============================================================

/**
 * Ajoute une ligne de saisie de cuvée dans le conteneur identifié par containerId.
 * data : { nom, appellation, prix, commentaire, statut } — valeurs initiales optionnelles.
 */
// Types de vin — source unique de vérité (formulaire + lecture)
const MC_VIN_TYPES = [
    { key: 'rouge',      label: 'Rouge',      dot: '#b94040' },
    { key: 'blanc',      label: 'Blanc',      dot: '#c9a227' },
    { key: 'rose',       label: 'Rosé',       dot: '#d4728a' },
    { key: 'bulles',     label: 'Bulles',     dot: '#5dade2' },
    { key: 'maceration', label: 'Macération', dot: '#c97a2a' },
    { key: 'spiritueux', label: 'Spiritueux', dot: '#7b6b8a' },
];

function addCuveeRow(containerId, data = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Nom unique pour les groupes radio (évite les conflits entre lignes)
    const uid = '_' + Date.now() + '_' + Math.floor(Math.random() * 9999);
    const tv  = data.typeVin || '';

    const typePills = MC_VIN_TYPES.map(t => `
        <label class="mc-radio">
            <input type="radio" name="cuvee-type${uid}" value="${t.key}" class="mc-cuvee-type-radio" ${tv === t.key ? 'checked' : ''}>
            <span class="mc-type-pill mc-type--${t.key}">${t.label}</span>
        </label>`).join('');

    const row = document.createElement('div');
    row.className = 'mc-cuvee-row';
    row.innerHTML = `
        <div class="mc-cuvee-row-header">
            <span class="mc-cuvee-row-title">Cuvée</span>
            <button type="button" class="mc-cuvee-remove" onclick="_removeCuveeRow(this)" aria-label="Supprimer cette cuvée">×</button>
        </div>
        <label class="mc-cuvee-field-label">
            <span>Nom de la cuvée</span>
            <input type="text" class="mc-cuvee-nom" value="${_esc(data.nom || '')}" placeholder="ex : Cuvée Origine">
        </label>
        <fieldset class="mc-vin-type-field">
            <legend>Type de vin</legend>
            ${typePills}
        </fieldset>
        <label class="mc-cuvee-field-label">
            <span>Appellation</span>
            <input type="text" class="mc-cuvee-appellation" value="${_esc(data.appellation || '')}" placeholder="ex : Côte Roannaise">
        </label>
        <label class="mc-cuvee-field-label">
            <span>Cépage(s)</span>
            <input type="text" class="mc-cuvee-cepage" value="${_esc(data.cepage || '')}" placeholder="ex : Gamay, Pinot Noir">
        </label>
        <label class="mc-cuvee-field-label">
            <span>Millésime</span>
            <input type="text" class="mc-cuvee-millesime" value="${_esc(data.millesime || '')}" placeholder="ex : 2021">
        </label>
        <label class="mc-cuvee-field-label">
            <span>Prix (€)</span>
            <input type="text" class="mc-cuvee-prix" value="${_esc(data.prix || '')}" placeholder="ex : 15">
        </label>
        <label class="mc-cuvee-field-label">
            <span>Commentaire de dégustation</span>
            <textarea class="mc-cuvee-commentaire" rows="3" placeholder="Notes, arômes, impressions…">${_esc(data.commentaire || '')}</textarea>
        </label>
        <label class="mc-cuvee-field-label">
            <span>Mots-clés</span>
            <input type="text" class="mc-cuvee-tags" value="${_esc(data.tags || '')}" placeholder="ex : fruité, léger, apéritif">
        </label>
        <fieldset class="mc-cuvee-statut-field">
            <label class="mc-radio">
                <input type="radio" name="cuvee-statut${uid}" value="a_essayer" class="mc-cuvee-statut-radio" ${data.statut !== 'deja_bue' && data.statut !== 'coup_de_coeur' ? 'checked' : ''}>
                <span class="mc-radio-pill mc-pill--essayer">À essayer</span>
            </label>
            <label class="mc-radio">
                <input type="radio" name="cuvee-statut${uid}" value="deja_bue" class="mc-cuvee-statut-radio" ${data.statut === 'deja_bue' ? 'checked' : ''}>
                <span class="mc-radio-pill mc-pill--bue">Déjà bue ✓</span>
            </label>
            <label class="mc-radio">
                <input type="radio" name="cuvee-statut${uid}" value="coup_de_coeur" class="mc-cuvee-statut-radio" ${data.statut === 'coup_de_coeur' ? 'checked' : ''}>
                <span class="mc-radio-pill mc-pill--coeur">Coup de Cœur 🍷</span>
            </label>
        </fieldset>
    `;
    container.appendChild(row);
}

function _removeCuveeRow(btn) {
    btn.closest('.mc-cuvee-row').remove();
}

/**
 * Lit toutes les lignes de cuvées dans le conteneur et retourne un tableau d'objets.
 * Les lignes sans nom sont ignorées.
 */
function _collectCuvees(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return [];
    return Array.from(container.querySelectorAll('.mc-cuvee-row'))
        .map(row => ({
            nom:         row.querySelector('.mc-cuvee-nom')?.value.trim()              || '',
            typeVin:     row.querySelector('.mc-cuvee-type-radio:checked')?.value      || '',
            appellation: row.querySelector('.mc-cuvee-appellation')?.value.trim()      || '',
            cepage:      row.querySelector('.mc-cuvee-cepage')?.value.trim()           || '',
            millesime:   row.querySelector('.mc-cuvee-millesime')?.value.trim()        || '',
            prix:        row.querySelector('.mc-cuvee-prix')?.value.trim()             || '',
            commentaire: row.querySelector('.mc-cuvee-commentaire')?.value.trim()      || '',
            tags:        row.querySelector('.mc-cuvee-tags')?.value.trim()             || '',
            statut:      row.querySelector('.mc-cuvee-statut-radio:checked')?.value    || 'a_essayer',
        }))
        .filter(c => c.nom);
}

/**
 * Génère le HTML de lecture pour la liste des cuvées.
 * Même pattern que la carte officielle : filter-bar + wine-category-section.
 * Rétrocompatible si cuvees est une chaîne (ancien format).
 */
function _renderCuveesReadHtml(cuvees) {
    // Ancien format texte libre
    if (typeof cuvees === 'string') {
        return cuvees
            ? `<div class="mc-ip-cuvees"><strong>Cuvées</strong><p>${_esc(cuvees).replace(/\n/g, '<br>')}</p></div>`
            : '';
    }
    if (!Array.isArray(cuvees) || !cuvees.length) return '';

    // Carte HTML d'une cuvée
    function _cuveeCard(c) {
        const isBue     = c.statut === 'deja_bue';
        const isCoeur   = c.statut === 'coup_de_coeur';
        const tagCls    = isCoeur ? 'mc-cuvee-tag--coeur' : isBue ? 'mc-cuvee-tag--bue' : 'mc-cuvee-tag--essayer';
        const tagLbl    = isCoeur ? 'Coup de Cœur 🍷' : isBue ? 'Déjà bue ✓' : 'À essayer';
        const meta      = [c.appellation, c.cepage, c.millesime, c.prix ? `${c.prix} €` : ''].filter(Boolean).join(' · ');
        const tagsPills = c.tags
            ? c.tags.split(',').map(t => t.trim()).filter(Boolean)
                .map(t => `<span class="mc-cuvee-keyword">${_esc(t)}</span>`).join('')
            : '';
        return `
            <div class="mc-cuvee-card">
                <div class="mc-cuvee-card-top">
                    <span class="mc-cuvee-card-name">${_esc(c.nom)}</span>
                    <span class="mc-cuvee-tag ${tagCls}">${tagLbl}</span>
                </div>
                ${meta          ? `<div class="mc-cuvee-card-meta">${_esc(meta)}</div>` : ''}
                ${c.commentaire ? `<p class="mc-cuvee-card-comment">${_esc(c.commentaire).replace(/\n/g, '<br>')}</p>` : ''}
                ${tagsPills     ? `<div class="mc-cuvee-keywords">${tagsPills}</div>` : ''}
            </div>`;
    }

    // Groupement par typeVin dans l'ordre MC_VIN_TYPES + "autres"
    const groups = {};
    MC_VIN_TYPES.forEach(t => { groups[t.key] = []; });
    groups[''] = [];
    cuvees.forEach(c => {
        const key = MC_VIN_TYPES.some(t => t.key === c.typeVin) ? c.typeVin : '';
        groups[key].push(c);
    });

    // Barre de filtres (même pattern que la carte officielle)
    const presentTypes = MC_VIN_TYPES.filter(t => groups[t.key].length);
    const hasOthers    = groups[''].length > 0;
    const showBar      = presentTypes.length + (hasOthers ? 1 : 0) > 1;

    let filterHtml = '';
    if (showBar) {
        const btns = [
            `<button class="filter-btn active" onclick="applyMcCuveeFilter('all',this)">Tout</button>`,
            ...presentTypes.map(t =>
                `<button class="filter-btn" onclick="applyMcCuveeFilter('${t.key}',this)">
                    <span class="mc-cuvee-type-dot" style="background:${t.dot};display:inline-block;margin-right:5px;vertical-align:middle"></span>${t.label}s
                </button>`
            ),
            ...(hasOthers ? [`<button class="filter-btn" onclick="applyMcCuveeFilter('autres',this)">Autres</button>`] : []),
        ].join('');
        filterHtml = `<div class="filter-bar">${btns}</div>`;
    }

    // Sections de cuvées (même structure que wine-category-section)
    let sectionsHtml = '';
    presentTypes.forEach(({ key, label, dot }) => {
        sectionsHtml += `
            <div class="wine-category-section" data-filter="${key}">
                <div class="wine-category-title">
                    <span class="mc-cuvee-type-dot" style="background:${dot}"></span> ${label}s
                </div>
                ${groups[key].map(_cuveeCard).join('')}
            </div>`;
    });
    if (hasOthers) {
        sectionsHtml += `
            <div class="wine-category-section" data-filter="autres">
                <div class="wine-category-title">Autres</div>
                ${groups[''].map(_cuveeCard).join('')}
            </div>`;
    }

    return `<div class="mc-ip-cuvees"><strong>Cuvées</strong>${filterHtml}${sectionsHtml}</div>`;
}

/**
 * Filtre les sections de cuvées dans le panneau Ma Carte.
 * Même logique que applyFilter() de la carte officielle.
 */
function applyMcCuveeFilter(key, btn) {
    const panel = document.getElementById('mc-info-panel');
    panel.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    panel.querySelectorAll('.wine-category-section').forEach(section => {
        if (key === 'all' || section.dataset.filter === key) {
            section.removeAttribute('data-hidden');
        } else {
            section.setAttribute('data-hidden', 'true');
        }
    });
}

// ============================================================
//  Utilitaire
// ============================================================
function _esc(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// ============================================================
//  Bouton "Mes Données" — visibilité selon connexion
// ============================================================
function _updateMesDonneesBtn() {
    const btn = document.getElementById('mes-donnees-btn');
    if (!btn) return;
    btn.classList.toggle('hidden', !currentUser);
}

function _isDashboardOpen() {
    const p = document.getElementById('mes-donnees-panel');
    return p && !p.classList.contains('hidden');
}

// ============================================================
//  Dashboard "Mes Données"
// ============================================================
async function openMesDonnees() {
    if (!currentUser) { openAuthModal(); return; }
    const panel = document.getElementById('mes-donnees-panel');
    panel.classList.remove('hidden');
    document.body.classList.add('md-open');
    // Charger les données si pas encore fait
    if (!Object.keys(_allMarkersCache).length && !Object.keys(maCarteMarkers).length) {
        await loadUserMarkers();
    } else if (!Object.keys(userMaps).length) {
        await _loadUserMaps();
    }
    // Afficher l'onglet actif
    const activeTab = document.querySelector('.md-tab.active');
    const tabKey = activeTab?.dataset.tab || 'cartes';
    _renderMdTab(tabKey);
}

function closeMesDonnees() {
    document.getElementById('mes-donnees-panel').classList.add('hidden');
    document.body.classList.remove('md-open');
}

function switchMdTab(tabKey, btnEl) {
    document.querySelectorAll('.md-tab').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.md-tab-panel').forEach(p => p.classList.remove('active'));
    if (btnEl) { btnEl.classList.add('active'); btnEl.setAttribute('aria-selected', 'true'); }
    const panel = document.getElementById('md-tab-' + tabKey);
    if (panel) panel.classList.add('active');
    _renderMdTab(tabKey);
}

function _renderMdTab(tabKey) {
    const renders = {
        'cartes':         renderMdCartesList,
        'stats':          renderMdStats,
        'coups-de-coeur': renderMdCoeur,
        'inventaire':     renderMdInventaire,
        'departements':   renderMdDepartements,
        'profil':         renderMdProfil,
        'partages':       renderMdPartages,
    };
    if (renders[tabKey]) renders[tabKey]();
}

// ---- Onglet Profil ---------------------------------------------
function renderMdProfil() {
    const container = document.getElementById('md-profil-content');
    if (!container) return;
    const email = currentUser ? currentUser.email : '';
    const nom   = userFirstName || '';
    container.innerHTML = `
        <div class="md-profil-form">
            <div class="md-profil-row">
                <label class="md-profil-label">Adresse e-mail</label>
                <p class="md-profil-email">${email}</p>
            </div>
            <div class="md-profil-row">
                <label class="md-profil-label" for="md-profil-prenom">Prénom affiché</label>
                <div class="md-profil-input-wrap">
                    <input id="md-profil-prenom" type="text" class="md-profil-input"
                           value="${nom.replace(/"/g, '&quot;')}"
                           maxlength="30" placeholder="Votre prénom">
                    <button class="md-profil-save-btn" onclick="saveMdProfil()">Enregistrer</button>
                </div>
                <p id="md-profil-msg" class="md-profil-msg hidden"></p>
            </div>
        </div>`;
}

async function saveMdProfil() {
    if (!currentUser || !firebaseReady) return;
    const input  = document.getElementById('md-profil-prenom');
    const msgEl  = document.getElementById('md-profil-msg');
    const newName = (input?.value || '').trim();
    if (!newName) {
        msgEl.textContent = 'Le prénom ne peut pas être vide.';
        msgEl.className = 'md-profil-msg md-profil-msg--error';
        return;
    }
    try {
        await db.collection('user_profiles').doc(currentUser.uid).set(
            { firstName: newName },
            { merge: true }
        );
        userFirstName = newName;
        _updateUserButton(currentUser.email);
        msgEl.textContent = 'Prénom mis à jour !';
        msgEl.className = 'md-profil-msg md-profil-msg--ok';
    } catch (e) {
        msgEl.textContent = 'Erreur lors de la sauvegarde.';
        msgEl.className = 'md-profil-msg md-profil-msg--error';
    }
}

// ---- Onglet Partages -------------------------------------------
async function renderMdPartages() {
    const container = document.getElementById('md-partages-content');
    if (!container || !currentUser) return;
    container.innerHTML = '<p class="reseau-loading">Chargement…</p>';

    try {
        const [receivedSnap, sentSnap] = await Promise.all([
            db.collection('map_access_requests').where('toUid',   '==', currentUser.uid).get(),
            db.collection('map_access_requests').where('fromUid', '==', currentUser.uid).get(),
        ]);

        const received = receivedSnap.docs.map(d => ({ id: d.id, ...d.data() }))
            .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        const sent = sentSnap.docs.map(d => ({ id: d.id, ...d.data() }))
            .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));

        const pendingCount = received.filter(r => r.status === 'pending').length;

        // Mettre à jour le badge sur l'onglet
        const tabBtn = document.getElementById('md-tab-btn-partages');
        if (tabBtn) tabBtn.textContent = pendingCount > 0 ? `Partages (${pendingCount})` : 'Partages';

        let html = `<h3 class="md-partages-subtitle">Demandes reçues${pendingCount ? ` <span class="md-partages-badge">${pendingCount}</span>` : ''}</h3>`;
        if (!received.length) {
            html += '<p class="md-empty">Aucune demande reçue.</p>';
        } else {
            html += received.map(r => `
                <div class="md-partage-row md-partage-row--${r.status}">
                    <div class="md-partage-info">
                        <span class="md-partage-from">${_esc(r.fromFirstName || 'Membre')}</span>
                        <span class="md-partage-map"> demande accès à <strong>${_esc(r.mapName)}</strong></span>
                    </div>
                    <div class="md-partage-actions">
                        ${r.status === 'pending' ? `
                            <button class="md-partage-accept" onclick="acceptMapRequest('${r.id}','${r.fromUid}','${r.mapId}')">Accepter</button>
                            <button class="md-partage-reject" onclick="rejectMapRequest('${r.id}')">Refuser</button>
                        ` : `<span class="md-partage-status md-partage-status--${r.status}">${r.status === 'accepted' ? 'Accepté ✓' : 'Refusé'}</span>`}
                    </div>
                </div>`).join('');
        }

        html += `<h3 class="md-partages-subtitle md-partages-subtitle--second">Demandes envoyées</h3>`;
        if (!sent.length) {
            html += '<p class="md-empty">Aucune demande envoyée.</p>';
        } else {
            html += sent.map(r => `
                <div class="md-partage-row md-partage-row--${r.status}">
                    <div class="md-partage-info">
                        <span class="md-partage-map">Carte <strong>${_esc(r.mapName)}</strong></span>
                    </div>
                    <div class="md-partage-actions">
                        <span class="md-partage-status md-partage-status--${r.status}">${
                            r.status === 'pending'  ? '⏳ En attente' :
                            r.status === 'accepted' ? '✓ Accepté'     : '✗ Refusé'
                        }</span>
                    </div>
                </div>`).join('');
        }

        container.innerHTML = html;
    } catch (e) {
        container.innerHTML = '<p class="md-empty">Impossible de charger les partages. Vérifiez les règles Firestore.</p>';
        console.warn('Erreur partages:', e);
    }
}

async function acceptMapRequest(requestId, fromUid, mapId) {
    if (!currentUser) return;
    try {
        const batch = db.batch();
        batch.update(db.collection('map_access_requests').doc(requestId), { status: 'accepted' });
        batch.update(
            db.collection('user_maps').doc(currentUser.uid).collection('maps').doc(mapId),
            { sharedWith: firebase.firestore.FieldValue.arrayUnion(fromUid) }
        );
        await batch.commit();
        renderMdPartages();
    } catch (e) {
        console.warn('Erreur acceptation:', e);
        alert('Erreur lors de l\'acceptation.');
    }
}

async function rejectMapRequest(requestId) {
    if (!currentUser) return;
    try {
        await db.collection('map_access_requests').doc(requestId).update({ status: 'rejected' });
        renderMdPartages();
    } catch (e) {
        console.warn('Erreur refus:', e);
    }
}

// ---- Onglet Mes Cartes -----------------------------------------
function renderMdCartesList() {
    const container = document.getElementById('md-cartes-list');
    if (!container) return;
    const maps = Object.values(userMaps);
    if (!maps.length) {
        container.innerHTML = '<p class="md-empty">Aucune carte. Créez-en une !</p>';
        return;
    }
    container.innerHTML = maps.map(m => {
        const count = Object.values(_allMarkersCache).filter(mk => mk.mapId === m.id).length;
        const isActive = m.id === activeMapId;
        return `
        <div class="md-carte-row ${isActive ? 'md-carte-row--active' : ''}">
            <div class="md-carte-info">
                <span class="md-carte-name">${_esc(m.name)}</span>
                <span class="md-carte-count">${count} domaine${count !== 1 ? 's' : ''}</span>
            </div>
            <div class="md-carte-actions">
                ${!isActive
                    ? `<button class="md-btn-sm md-btn-primary" onclick="switchActiveMap('${_esc(m.id)}');closeMesDonnees()">Activer</button>`
                    : '<span class="md-badge-active">Active ✓</span>'}
                <button class="md-btn-sm" onclick="promptRenameMap('${_esc(m.id)}')" title="Renommer">✏</button>
                <button class="md-btn-sm md-btn-danger" onclick="deleteMap('${_esc(m.id)}')" title="Supprimer">✕</button>
            </div>
        </div>`;
    }).join('');
}

// ---- Onglet Statistiques ---------------------------------------
function renderMdStats() {
    const container = document.getElementById('md-stats-content');
    if (!container) return;
    const all = Object.values(_allMarkersCache);
    const totalDomaines = all.length;
    const fait  = all.filter(m => m.statut === 'fait').length;
    const aEssayer = totalDomaines - fait;
    let totalCuvees = 0;
    const typeCounts = {};
    MC_VIN_TYPES.forEach(t => { typeCounts[t.key] = 0; });
    typeCounts['other'] = 0;
    all.forEach(m => {
        if (Array.isArray(m.cuvees)) {
            m.cuvees.forEach(c => {
                totalCuvees++;
                if (typeCounts.hasOwnProperty(c.typeVin)) typeCounts[c.typeVin]++;
                else typeCounts['other']++;
            });
        }
    });
    const colorBar = totalCuvees > 0
        ? MC_VIN_TYPES.map(t => {
            const pct = Math.round((typeCounts[t.key] || 0) / totalCuvees * 100);
            return pct > 0
                ? `<div class="md-color-seg" style="width:${pct}%;background:${t.dot}" title="${t.label} ${pct}%"></div>`
                : '';
          }).join('')
        : '<div class="md-color-seg" style="width:100%;background:#e0e0e0"></div>';

    container.innerHTML = `
        <div class="md-stat-grid">
            <div class="md-stat-card">
                <span class="md-stat-num">${totalDomaines}</span>
                <span class="md-stat-label">Domaines enregistrés</span>
            </div>
            <div class="md-stat-card">
                <span class="md-stat-num">${fait}</span>
                <span class="md-stat-label">Domaines visités</span>
            </div>
            <div class="md-stat-card">
                <span class="md-stat-num">${aEssayer}</span>
                <span class="md-stat-label">À essayer</span>
            </div>
            <div class="md-stat-card">
                <span class="md-stat-num">${totalCuvees}</span>
                <span class="md-stat-label">Cuvées enregistrées</span>
            </div>
        </div>
        <div class="md-color-section">
            <h3>Répartition par couleur</h3>
            <div class="md-color-bar">${colorBar}</div>
            <div class="md-color-legend">
                ${MC_VIN_TYPES.map(t => {
                    const c = typeCounts[t.key] || 0;
                    const p = totalCuvees ? Math.round(c / totalCuvees * 100) : 0;
                    return `<span><span class="mc-cuvee-type-dot" style="background:${t.dot};display:inline-block;margin-right:4px;vertical-align:middle"></span>${t.label} — ${c} (${p}%)</span>`;
                }).join('')}
            </div>
        </div>`;
}

// ---- Onglet Coups de Cœur -------------------------------------
function renderMdCoeur() {
    const container = document.getElementById('md-coeur-content');
    if (!container) return;
    const favEntries = Object.entries(userFavorites);
    if (!favEntries.length) {
        container.innerHTML = '<p class="md-empty">Aucun coup de cœur enregistré.</p>';
        return;
    }
    const byDomain = {};
    favEntries.forEach(([key, f]) => {
        const dn = f.domaineName || 'Domaine inconnu';
        if (!byDomain[dn]) byDomain[dn] = [];
        byDomain[dn].push({ key, ...f });
    });
    container.innerHTML = Object.entries(byDomain)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([domName, wines]) => `
            <div class="md-coeur-domain">
                <div class="md-coeur-domain-name">${_esc(domName)}</div>
                ${wines.map(f => `
                    <div class="md-coeur-wine-row">
                        <span class="md-coeur-wine-name">${_esc(f.name || '')}</span>
                        <span class="md-coeur-wine-region">${_esc(f.regionName || '')}</span>
                    </div>`).join('')}
            </div>`).join('');
}

// ---- Onglet Inventaire des cuvées -----------------------------
function renderMdInventaire() {
    const container = document.getElementById('md-inventaire-content');
    if (!container) return;
    _inventaireAll = [];
    Object.values(_allMarkersCache).forEach(m => {
        if (!Array.isArray(m.cuvees)) return;
        m.cuvees.forEach(c => {
            _inventaireAll.push({
                ...c,
                _domaineName: m.name || '',
                _mapName:     userMaps[m.mapId]?.name || m.mapId || '',
            });
        });
    });
    _inventaireAll.sort((a, b) => (a.nom || '').localeCompare(b.nom || ''));
    filterMdInventaire(document.getElementById('md-inventaire-search')?.value || '');
}

function filterMdInventaire(query) {
    const container = document.getElementById('md-inventaire-content');
    if (!container) return;
    const q = query.toLowerCase().trim();
    const filtered = q
        ? _inventaireAll.filter(c =>
            (c.nom || '').toLowerCase().includes(q)  ||
            (c.appellation || '').toLowerCase().includes(q) ||
            (c._domaineName || '').toLowerCase().includes(q))
        : _inventaireAll;
    if (!filtered.length) {
        container.innerHTML = '<p class="md-empty">Aucune cuvée trouvée.</p>';
        return;
    }
    // Regrouper par typeVin
    const byType = {};
    MC_VIN_TYPES.forEach(t => { byType[t.key] = []; });
    byType[''] = [];
    filtered.forEach(c => {
        const k = MC_VIN_TYPES.some(t => t.key === c.typeVin) ? c.typeVin : '';
        byType[k].push(c);
    });
    const rows = arr => arr.map(c => `
        <div class="md-inv-row">
            <span class="md-inv-name">${_esc(c.nom || '')}</span>
            <span class="md-inv-meta">${[c.appellation, c.millesime, c.prix ? c.prix + ' €' : ''].filter(Boolean).join(' · ')}</span>
            <span class="md-inv-domain">${_esc(c._domaineName)}</span>
            <span class="${c.statut === 'deja_bue' ? 'md-inv-bue' : c.statut === 'coup_de_coeur' ? 'md-inv-coeur' : 'md-inv-essayer'}">${c.statut === 'deja_bue' ? 'Dégustée ✓' : c.statut === 'coup_de_coeur' ? 'Coup de Cœur 🍷' : 'À essayer'}</span>
        </div>`).join('');
    container.innerHTML =
        MC_VIN_TYPES.filter(t => byType[t.key].length).map(t => `
            <div class="md-inv-section">
                <div class="md-inv-type-header">
                    <span class="mc-cuvee-type-dot" style="background:${t.dot};display:inline-block;margin-right:6px;vertical-align:middle"></span>
                    ${t.label}s (${byType[t.key].length})
                </div>
                ${rows(byType[t.key])}
            </div>`).join('')
        + (byType[''].length ? `
            <div class="md-inv-section">
                <div class="md-inv-type-header">Autres (${byType[''].length})</div>
                ${rows(byType[''])}
            </div>` : '');
}

// ---- Onglet Départements ---------------------------------------
function renderMdDepartements() {
    const container = document.getElementById('md-dept-content');
    const countEl   = document.getElementById('md-dept-count');
    if (!container) return;
    const depts = new Set(
        Object.values(_allMarkersCache)
            .filter(m => m.statut === 'fait' && m.deptCode)
            .map(m => m.deptCode)
    );
    const sorted = [...depts].sort();
    if (countEl) countEl.textContent = `${sorted.length} département${sorted.length !== 1 ? 's' : ''} visité${sorted.length !== 1 ? 's' : ''}`;
    if (!sorted.length) {
        container.innerHTML = '<p class="md-empty">Aucun département visité pour l\'instant.</p>';
        return;
    }
    container.innerHTML = `<div class="md-dept-grid">
        ${sorted.map(code => {
            const count = Object.values(_allMarkersCache)
                .filter(m => m.deptCode === code && m.statut === 'fait').length;
            return `<div class="md-dept-chip">
                <span class="md-dept-code">${_esc(code)}</span>
                <span class="md-dept-count">${count} domaine${count !== 1 ? 's' : ''}</span>
            </div>`;
        }).join('')}
    </div>`;
}
