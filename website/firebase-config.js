// ============================================================
//  Route des Vins Marguerite — Firebase (Auth + Favoris)
//
//  ► ÉTAPE 1 : Créez un projet sur https://console.firebase.google.com
//  ► ÉTAPE 2 : Activez "Authentication" → Email/Mot de passe
//  ► ÉTAPE 3 : Créez une base Firestore (mode production)
//  ► ÉTAPE 4 : Remplacez les valeurs ci-dessous par votre config
//              (Paramètres projet → Vos applications → SDK Firebase)
// ============================================================
const FIREBASE_CONFIG = {
    apiKey:            "AIzaSyDUVQPr2JTGgYltGTZYHx93zQMHVWBpwu8",
    authDomain:        "routedesvins-619cd.firebaseapp.com",
    projectId:         "routedesvins-619cd",
    storageBucket:     "routedesvins-619cd.firebasestorage.app",
    messagingSenderId: "241974496911",
    appId:             "1:241974496911:web:95c7c5c6127d3975fb6afa"
};

// ---- Initialisation sécurisée --------------------------------
let auth, db, firebaseReady = false;
try {
    firebase.initializeApp(FIREBASE_CONFIG);
    auth = firebase.auth();
    db   = firebase.firestore();
    firebaseReady = true;
} catch (e) {
    console.warn('⚠️  Firebase non configuré. Remplacez FIREBASE_CONFIG dans firebase-config.js.', e.message);
}

// ---- État global ---------------------------------------------
let currentUser   = null;
let userFavorites = {};   // { "44_0": { region, idx, name, regionName } }
let favoritesMode = false;
let isAdminUser   = false;
let userFirstName = null; // prénom affiché dans le réseau social
let _unreadUnsub  = null; // listener messages non lus

// ---- Écouteur d'état d'authentification ----------------------
if (firebaseReady) {
    auth.onAuthStateChanged(async user => {
        currentUser = user;
        if (user) {
            // Sauvegarde l'email et vérifie le rôle admin
            try {
                const userRef    = db.collection('users').doc(user.uid);
                const userSnap   = await userRef.get();
                isAdminUser      = userSnap.exists && userSnap.data().isAdmin === true;
                await userRef.set({ email: user.email }, { merge: true });
            } catch (_) {
                isAdminUser = false;
            }
            // Charge le prénom depuis user_profiles (ou crée un profil minimal si absent)
            try {
                const profileRef  = db.collection('user_profiles').doc(user.uid);
                const profileSnap = await profileRef.get();
                if (profileSnap.exists) {
                    userFirstName = profileSnap.data().firstName || null;
                } else {
                    // Utilisateur créé avant le système de profils : on crée un profil avec l'email
                    const fallback = user.email.split('@')[0];
                    await profileRef.set({
                        firstName: fallback,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    });
                    userFirstName = fallback;
                }
            } catch (_) { userFirstName = null; }
            _updateUserButton(user.email);
            _updateAdminUI();
            await loadFavorites();
            if (typeof _updateReseauBtn === 'function') _updateReseauBtn();
            _initUnreadListener();
        } else {
            isAdminUser   = false;
            userFirstName = null;
            userFavorites = {};
            _updateUserButton(null);
            _updateFavButton();
            _updateAdminUI();
            if (typeof _updateReseauBtn === 'function') _updateReseauBtn();
            if (favoritesMode) exitFavoritesMode();
            if (_unreadUnsub) { _unreadUnsub(); _unreadUnsub = null; }
            _updateChatBadge(0);
        }
    });
}

// ---- Badge et bouton admin -----------------------------------
function _updateAdminUI() {
    const badge = document.getElementById('admin-badge');
    const btn   = document.getElementById('admin-tools-btn');
    if (badge) badge.classList.toggle('hidden', !isAdminUser);
    if (btn)   btn.classList.toggle('hidden',   !isAdminUser);
}

// ---- Mise à jour du bouton utilisateur -----------------------
function _updateUserButton(email) {
    const btn = document.getElementById('user-btn');
    if (!btn) return;
    if (email) {
        const displayName = userFirstName || email.split('@')[0];
        btn.textContent = '👤 ' + (displayName.length > 14 ? displayName.slice(0, 14) + '…' : displayName);
        btn.classList.add('user-logged-in');
    } else {
        btn.textContent = '👤 Connexion';
        btn.classList.remove('user-logged-in');
    }
    _updateFavButton();
    if (typeof _updateMesDonneesBtn === 'function') _updateMesDonneesBtn();
}

// ---- Chargement des favoris depuis Firestore -----------------
async function loadFavorites() {
    if (!currentUser || !firebaseReady) return;
    try {
        const snap = await db.collection('users').doc(currentUser.uid).collection('favorites').get();
        userFavorites = {};
        snap.forEach(doc => { userFavorites[doc.id] = doc.data(); });
        _updateFavButton();
        refreshHeartButtons();
        if (favoritesMode) updateMapFavHighlight();
    } catch (e) {
        console.warn('Erreur chargement favoris:', e);
    }
}

// ---- Toggle favori -------------------------------------------
async function toggleFavorite(regionId, domaineIdx, wineKey, wineName, domaineName, regionName) {
    if (!firebaseReady) {
        alert('Firebase non configuré. Suivez les instructions dans firebase-config.js.');
        return;
    }
    if (!currentUser) { openAuthModal(); return; }

    const key = `${regionId}_${domaineIdx}_${wineKey}`;
    const ref = db.collection('users').doc(currentUser.uid).collection('favorites').doc(key);
    try {
        if (userFavorites[key]) {
            await ref.delete();
            delete userFavorites[key];
        } else {
            const data = {
                region:      String(regionId),
                idx:         domaineIdx,
                wineKey:     String(wineKey),
                name:        wineName,
                domaineName: domaineName,
                regionName:  regionName,
                savedAt:     firebase.firestore.FieldValue.serverTimestamp()
            };
            await ref.set(data);
            userFavorites[key] = data;
        }
        _updateFavButton();
        refreshHeartButtons();
        if (favoritesMode) {
            updateMapFavHighlight();
            if (Object.keys(userFavorites).length === 0) exitFavoritesMode();
        }
    } catch (e) {
        console.warn('Erreur toggle favori:', e);
    }
}

// ---- Mise à jour du bouton Coups de Cœur --------------------
function _updateFavButton() {
    const btn = document.getElementById('coeur-btn');
    if (!btn) return;
    const count = Object.keys(userFavorites).length;
    if (!currentUser || count === 0) {
        btn.classList.add('hidden');
    } else {
        btn.classList.remove('hidden');
        btn.innerHTML = `♥ Mes Coups de Cœur <span class="fav-count">${count}</span>`;
    }
}

// ---- Rafraîchir l'état des cœurs visibles -------------------
function refreshHeartButtons() {
    document.querySelectorAll('.heart-btn[data-fav-key]').forEach(btn => {
        const key   = btn.dataset.favKey;
        const isFav = !!userFavorites[key];
        btn.classList.toggle('is-fav', isFav);
        btn.textContent = isFav ? '♥' : '♡';
        btn.setAttribute('title',      isFav ? 'Retirer des favoris' : 'Ajouter aux favoris');
        btn.setAttribute('aria-label', isFav ? 'Retirer des favoris' : 'Ajouter aux favoris');
    });
}

// ---- Surbrillance de la carte selon les favoris --------------
function updateMapFavHighlight() {
    const favRegions = new Set(Object.values(userFavorites).map(f => String(f.region)));
    document.querySelectorAll('#france-map path.wine-region').forEach(path => {
        const dept = String(path.dataset.numerodepartement);
        path.classList.toggle('fav-dim',       favoritesMode && !favRegions.has(dept));
        path.classList.toggle('fav-highlight',  favoritesMode &&  favRegions.has(dept));
    });
}

// ---- Panneau "Mes Coups de Cœur" ----------------------------
function showFavoritesPanel() {
    const entries = Object.entries(userFavorites);
    if (entries.length === 0) return;

    favoritesMode = true;
    updateMapFavHighlight();
    const coeurBtn = document.getElementById('coeur-btn');
    if (coeurBtn) coeurBtn.classList.add('fav-btn-active');

    // Grouper par région
    const byRegion = {};
    entries.forEach(([key, f]) => {
        const rn = f.regionName || f.region;
        if (!byRegion[rn]) byRegion[rn] = [];
        byRegion[rn].push({ key, ...f });
    });

    const cards = Object.entries(byRegion)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([rName, wines]) => {
            const wineCards = wines.map(f => {
                const safeWN = f.name.replace(/'/g, "\\'");
                const safeDN = (f.domaineName || '').replace(/'/g, "\\'");
                const safeRN = rName.replace(/'/g, "\\'");
                return `
                <div class="domain-card" role="button" tabindex="0"
                     onclick="navigateToFav('${f.region}', ${f.idx})"
                     onkeydown="if(event.key==='Enter')navigateToFav('${f.region}',${f.idx})"
                     aria-label="${f.name}">
                    <img src="logo%20vignoble.png" alt="" class="domain-logo" loading="lazy" onerror="this.style.display='none'">
                    <div style="flex:1">
                        <div class="domain-name">${f.name}</div>
                        <div class="domain-sub">${f.domaineName || ''} — ${rName}</div>
                    </div>
                    <button class="heart-btn is-fav" data-fav-key="${f.key}"
                            onclick="event.stopPropagation();toggleFavorite('${f.region}',${f.idx},'${f.wineKey}','${safeWN}','${safeDN}','${safeRN}')"
                            aria-label="Retirer des favoris" title="Retirer des favoris">♥</button>
                </div>`;
            }).join('');
            return `<h3>${rName}</h3>${wineCards}`;
        }).join('');

    const content = document.getElementById('panel-content');
    content.innerHTML = `
        <h2>♥ Mes Coups de Cœur</h2>
        <p class="breadcrumb">${entries.length} cuvée${entries.length > 1 ? 's' : ''} favorite${entries.length > 1 ? 's' : ''}</p>
        ${cards}`;

    currentView = 'favorites';
    showPanel();
    document.getElementById('back-button').classList.remove('hidden');
}

// ---- Quitter le mode favoris --------------------------------
function exitFavoritesMode() {
    favoritesMode = false;
    updateMapFavHighlight();
    const btn = document.getElementById('coeur-btn');
    if (btn) btn.classList.remove('fav-btn-active');
}

// ---- Naviguer vers un favori depuis le panneau --------------
function navigateToFav(regionId, domaineIdx) {
    exitFavoritesMode();
    currentRegion  = String(regionId);
    currentDomaine = domaineIdx;

    // Activer le département sur la carte
    document.querySelectorAll('#france-map path.wine-region').forEach(p => p.classList.remove('active'));
    const path = document.querySelector(`#france-map path[data-numerodepartement="${regionId}"]`);
    if (path) {
        path.classList.add('active');
        const svg = document.getElementById('france-map');
        if (!initialViewBox) initialViewBox = svg.getAttribute('viewBox').split(' ').map(Number);
        animateViewBox(
            svg.getAttribute('viewBox').split(' ').map(Number),
            calculateTargetViewBox(path)
        );
        renderMarkers(WINE_DATA[regionId].domaines);
    }
    showDomaineView(domaineIdx);
}


// ============================================================
//  Modal d'authentification
// ============================================================
let _authMode = 'login';

function openAuthModal() {
    if (!firebaseReady) {
        alert('Firebase non configuré. Suivez les instructions dans firebase-config.js pour activer les comptes utilisateurs.');
        return;
    }
    if (currentUser) { _showUserMenu(); return; }

    _authMode = 'login';
    document.getElementById('auth-title').textContent        = 'Connexion';
    document.getElementById('auth-submit').textContent       = 'Se connecter';
    document.getElementById('auth-toggle-text').textContent  = 'Pas encore de compte ?';
    document.getElementById('auth-toggle').textContent       = "S'inscrire";
    document.getElementById('auth-error').textContent        = '';
    document.getElementById('auth-error').classList.add('hidden');
    document.getElementById('auth-email').value    = '';
    document.getElementById('auth-password').value = '';
    document.getElementById('auth-modal').classList.remove('hidden');
    setTimeout(() => document.getElementById('auth-email').focus(), 50);
}

function closeAuthModal() {
    document.getElementById('auth-modal').classList.add('hidden');
}

function toggleAuthMode() {
    _authMode = _authMode === 'login' ? 'signup' : 'login';
    const isLogin = _authMode === 'login';
    document.getElementById('auth-title').textContent        = isLogin ? 'Connexion' : 'Créer un compte';
    document.getElementById('auth-submit').textContent       = isLogin ? 'Se connecter' : "S'inscrire";
    document.getElementById('auth-toggle-text').textContent  = isLogin ? 'Pas encore de compte ?' : 'Déjà un compte ?';
    document.getElementById('auth-toggle').textContent       = isLogin ? "S'inscrire" : 'Se connecter';
    document.getElementById('auth-error').classList.add('hidden');
    // Afficher le champ prénom uniquement à l'inscription
    const firstnameWrap = document.getElementById('auth-firstname-wrap');
    if (firstnameWrap) firstnameWrap.classList.toggle('hidden', isLogin);
}

async function submitAuth() {
    const email    = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;
    const errEl    = document.getElementById('auth-error');
    const btn      = document.getElementById('auth-submit');

    if (!email || !password) {
        errEl.textContent = 'Veuillez remplir tous les champs.';
        errEl.classList.remove('hidden');
        return;
    }

    btn.disabled    = true;
    btn.textContent = '…';
    errEl.classList.add('hidden');

    try {
        if (_authMode === 'login') {
            await auth.signInWithEmailAndPassword(email, password);
        } else {
            const firstName = (document.getElementById('auth-firstname')?.value || '').trim();
            const cred = await auth.createUserWithEmailAndPassword(email, password);
            // Sauvegarder le profil public
            if (firstName) {
                try {
                    await db.collection('user_profiles').doc(cred.user.uid).set({
                        firstName,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    });
                    userFirstName = firstName;
                } catch (_) {}
            }
        }
        closeAuthModal();
    } catch (err) {
        const msgs = {
            'auth/email-already-in-use': 'Cet email est déjà utilisé.',
            'auth/user-not-found':       'Aucun compte avec cet email.',
            'auth/wrong-password':       'Mot de passe incorrect.',
            'auth/invalid-email':        'Email invalide.',
            'auth/weak-password':        'Mot de passe trop faible (6 caractères min.).',
            'auth/invalid-credential':   'Email ou mot de passe incorrect.',
            'auth/too-many-requests':    'Trop de tentatives. Réessayez plus tard.',
        };
        errEl.textContent = msgs[err.code] || err.message;
        errEl.classList.remove('hidden');
    } finally {
        btn.disabled    = false;
        btn.textContent = _authMode === 'login' ? 'Se connecter' : "S'inscrire";
    }
}

function _showUserMenu() {
    if (confirm(`Se déconnecter de ${currentUser.email} ?`)) {
        auth.signOut();
    }
}

// ============================================================
//  Badge messages non lus sur le bouton Réseau
// ============================================================
function _initUnreadListener() {
    if (_unreadUnsub) { _unreadUnsub(); _unreadUnsub = null; }
    if (!currentUser || !firebaseReady) return;

    _unreadUnsub = db.collection('conversations')
        .where('participants', 'array-contains', currentUser.uid)
        .onSnapshot(snap => {
            let total = 0;
            snap.docs.forEach(d => { total += d.data()[`unread_${currentUser.uid}`] || 0; });
            _updateChatBadge(total);
        }, () => {});
}

function _updateChatBadge(count) {
    const btn = document.getElementById('reseau-btn');
    if (!btn) return;
    let badge = btn.querySelector('.chat-badge');
    if (count > 0) {
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'chat-badge';
            btn.appendChild(badge);
        }
        badge.textContent = count > 9 ? '9+' : String(count);
    } else if (badge) {
        badge.remove();
    }
}
