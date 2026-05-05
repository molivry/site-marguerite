// ============================================================
//  Réseau Social — Fil d'Actualité
//  Dépend de : firebase-config.js (auth, db, currentUser,
//               firebaseReady, firebase, userFirstName)
// ============================================================

let reseauOpen          = false;
let _reseauFeedUnsub    = null;   // listener Firestore actif sur le fil
let _followedUids       = new Set();
let _allProfiles        = {};     // { uid: { firstName } }
let _reseauActiveTab    = 'fil';
let _commentListeners   = {};     // { postId: unsubscribeFn }
let _myReactions        = new Set(); // postIds où l'utilisateur courant a réagi

// Chat privé
let _chatUnsub          = null;
let _chatTargetUid      = null;

// Demande d'accès carte
let _mapRequestTargetUid  = null;
let _mapRequestTargetName = null;
let _mapRequestMaps       = [];

// ============================================================
//  Ouverture / Fermeture du panneau
// ============================================================
function openReseau() {
    if (!currentUser) { openAuthModal(); return; }
    reseauOpen = true;
    document.getElementById('reseau-panel').classList.remove('hidden');
    document.body.classList.add('reseau-open');
    _switchReseauTab(_reseauActiveTab,
        document.querySelector(`.reseau-tab[data-tab="${_reseauActiveTab}"]`));
    _loadReseauData();
    _renderSidebar();
}

function closeReseau() {
    reseauOpen = false;
    document.getElementById('reseau-panel').classList.add('hidden');
    document.body.classList.remove('reseau-open');
    _reseauUnsubAll();
}

function _reseauUnsubAll() {
    if (_reseauFeedUnsub) { _reseauFeedUnsub(); _reseauFeedUnsub = null; }
    Object.values(_commentListeners).forEach(fn => fn());
    _commentListeners = {};
}

// ============================================================
//  Chargement initial
// ============================================================
async function _loadReseauData() {
    if (!currentUser || !firebaseReady) return;
    await Promise.all([_loadFollowing(), _loadAllProfiles()]);
    _switchReseauTab(_reseauActiveTab);
}

async function _loadFollowing() {
    try {
        const snap = await db.collection('follows').doc(currentUser.uid)
            .collection('following').get();
        _followedUids = new Set(snap.docs.map(d => d.id));
    } catch (_) { _followedUids = new Set(); }
}

async function _loadMyReactions(postIds) {
    if (!currentUser || !postIds.length) return;
    _myReactions = new Set();
    // Firestore limite les requêtes "in" à 30 éléments
    const chunks = [];
    for (let i = 0; i < postIds.length; i += 30) chunks.push(postIds.slice(i, i + 30));
    try {
        await Promise.all(chunks.map(async chunk => {
            await Promise.all(chunk.map(async postId => {
                const snap = await db.collection('activity_posts').doc(postId)
                    .collection('reactions').doc(currentUser.uid).get();
                if (snap.exists) _myReactions.add(postId);
            }));
        }));
    } catch (_) { /* silencieux */ }
}

async function _loadAllProfiles() {
    try {
        const snap = await db.collection('user_profiles').get();
        _allProfiles = {};
        snap.docs.forEach(d => { _allProfiles[d.id] = d.data(); });
    } catch (_) { _allProfiles = {}; }
    _updateHeroStats();
    _renderSidebar();
}

function _updateHeroStats() {
    const amisEl = document.getElementById('rv2-stat-amis');
    const membresEl = document.getElementById('rv2-stat-membres');
    if (amisEl) amisEl.textContent = _followedUids.size;
    const total = Object.keys(_allProfiles).length;
    if (membresEl) membresEl.textContent = total || '—';
    const tabBtn = document.getElementById('rv2-tab-amis-btn');
    if (tabBtn) tabBtn.textContent = `Amis · ${_followedUids.size}`;
}

// ============================================================
//  Navigation onglets
// ============================================================
function switchReseauTab(tabKey, btnEl) {
    document.querySelectorAll('.reseau-tab').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.reseau-tab-panel').forEach(p => p.classList.remove('active'));
    if (btnEl) { btnEl.classList.add('active'); btnEl.setAttribute('aria-selected', 'true'); }
    const panel = document.getElementById('reseau-tab-' + tabKey);
    if (panel) panel.classList.add('active');
    _switchReseauTab(tabKey);
}

function _switchReseauTab(tabKey, btnEl) {
    _reseauActiveTab = tabKey;
    if (tabKey === 'fil')     _renderFil();
    if (tabKey === 'membres') _renderMembres();
    if (tabKey === 'communs') _renderCommuns();
}

// ============================================================
//  Onglet "Mon Fil" — listener temps réel
// ============================================================
function _renderFil() {
    const container = document.getElementById('reseau-fil-content');
    if (!container) return;

    // Unsub du listener précédent si on re-render
    if (_reseauFeedUnsub) { _reseauFeedUnsub(); _reseauFeedUnsub = null; }

    container.innerHTML = '<p class="reseau-loading">Chargement du fil…</p>';

    _reseauFeedUnsub = db.collection('activity_posts')
        .orderBy('createdAt', 'desc')
        .limit(60)
        .onSnapshot(async snap => {
            const posts = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            // Charger l'état des réactions de l'utilisateur courant
            await _loadMyReactions(posts.map(p => p.id));
            _renderFilContent(posts, container);
        }, () => {
            container.innerHTML = '<p class="reseau-empty">Impossible de charger le fil. Vérifiez les règles Firestore.</p>';
        });
}

function _renderFilContent(allPosts, container) {
    const myUid = currentUser?.uid;
    const visible = allPosts.filter(p => p.uid === myUid || _followedUids.has(p.uid));

    const composer = `
        <div class="rv2-composer">
            <textarea id="reseau-post-input"
                      placeholder="Partagez une découverte, une impression…"
                      rows="3" maxlength="500"
                      oninput="document.getElementById('rv2-char-count').textContent=this.value.length+'/500'"></textarea>
            <div class="rv2-composer-footer">
                <span class="rv2-char-count" id="rv2-char-count">0/500</span>
                <button class="rv2-post-btn" onclick="submitReseauPost()">Publier</button>
            </div>
        </div>`;

    const empty = '<p class="reseau-empty">Aucune publication pour l\'instant.<br>Ajoutez des domaines dans Ma Carte ou suivez des membres !</p>';
    const feedRows = visible.length
        ? `<div class="rv2-feed">${visible.map(_buildPostCard).join('')}</div>`
        : empty;
    container.innerHTML = composer + feedRows;
}

function _buildPostCard(post) {
    const time       = post.createdAt?.toDate ? _fmtTime(post.createdAt.toDate()) : '';
    const myUid      = currentUser?.uid;
    const isOwn      = post.uid === myUid;
    const count      = post.reactionsCount || 0;
    const typeTag    = _typeTag(post.type);
    const hasReacted = _myReactions.has(post.id);
    const avatarBg   = _avatarColor(post.firstName || '?');
    const domainMatch = (post.text || '').match(/domaine (.+?)[\s🍾📍]/) ||
                        (post.text || '').match(/(?:visiter|pour) (.+?) chez (.+?)[\s🍷]/);
    const sub = post.domaineName ? `${post.domaineName}${post.appellation ? ' · ' + post.appellation : ''}` : '';

    return `
        <div class="rv2-feed-row" data-post-id="${post.id}">
            <div class="rv2-feed-avatar" style="background:${avatarBg}">${_initial(post.firstName)}</div>
            <div class="rv2-feed-body">
                <div class="rv2-feed-action">
                    <span class="rv2-feed-name">${_esc(post.firstName || 'Membre')}</span>
                    ${typeTag}
                    <br><span style="opacity:0.7">${_esc(post.text || '')}</span>
                </div>
                ${sub ? `<div class="rv2-feed-sub">${_esc(sub)}</div>` : ''}
                <div class="rv2-post-actions">
                    <button class="rv2-reaction-btn ${hasReacted ? 'reacted' : ''}" id="react-btn-${post.id}"
                            onclick="toggleReaction('${post.id}')">
                        🍷 J'ai bu ça aussi !<span id="react-count-${post.id}">${count > 0 ? ' ' + count : ''}</span>
                    </button>
                    <button class="rv2-comment-toggle" onclick="toggleComments('${post.id}')">💬 Commenter</button>
                    ${isOwn ? `<button class="rv2-delete-btn" onclick="deleteReseauPost('${post.id}')" title="Supprimer">×</button>` : ''}
                </div>
                <div class="rv2-comments-section" id="comments-${post.id}">
                    <div id="comments-list-${post.id}"><p class="reseau-empty" style="font-size:12px;padding:8px 0">Aucun commentaire.</p></div>
                    <div class="rv2-comment-form">
                        <input type="text" class="rv2-comment-input" id="comment-input-${post.id}"
                               placeholder="Votre commentaire…" maxlength="300"
                               onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();submitComment('${post.id}')}">
                        <button class="rv2-comment-submit" onclick="submitComment('${post.id}')" aria-label="Envoyer">→</button>
                    </div>
                </div>
            </div>
            <div class="rv2-feed-meta">
                ${count > 0 ? `<div class="rv2-score"><span class="rv2-score-n">${count}</span><span class="rv2-score-l">réactions</span></div>` : ''}
                <div class="rv2-feed-time">${time}</div>
            </div>
        </div>`;
}

function _typeTag(type) {
    const tags = {
        marker_fait:    '<span class="rv2-type-tag rv2-tag--fait">Visité ✓</span>',
        marker_essayer: '<span class="rv2-type-tag rv2-tag--essayer">À essayer</span>',
        cuvee_coeur:    '<span class="rv2-type-tag rv2-tag--coeur">Coup de Cœur 🍷</span>',
    };
    return tags[type] || '';
}

function _avatarColor(name) {
    const palettes = ['#c4661f','#8b4513','#2e5c3a','#6b7a3e','#7d4e6a','#4a6080'];
    const c = String(name || '?').charCodeAt(0) % palettes.length;
    return palettes[c];
}

// ============================================================
//  Publier un post libre
// ============================================================
async function submitReseauPost() {
    if (!currentUser) { openAuthModal(); return; }
    const input = document.getElementById('reseau-post-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    const btn = document.querySelector('.rv2-post-btn');
    if (btn) { btn.disabled = true; btn.textContent = '…'; }

    try {
        await db.collection('activity_posts').add({
            uid:            currentUser.uid,
            firstName:      userFirstName || currentUser.email.split('@')[0],
            type:           'free_post',
            text,
            reactionsCount: 0,
            createdAt:      firebase.firestore.FieldValue.serverTimestamp(),
        });
        input.value = '';
        const cc = document.getElementById('rv2-char-count');
        if (cc) cc.textContent = '0/500';
    } catch (e) {
        console.warn('Erreur publication:', e);
    } finally {
        if (btn) { btn.disabled = false; btn.textContent = 'Publier'; }
    }
}

// ============================================================
//  Supprimer un post
// ============================================================
async function deleteReseauPost(postId) {
    if (!confirm('Supprimer cette publication ?')) return;
    try {
        await db.collection('activity_posts').doc(postId).delete();
    } catch (e) { console.warn('Erreur suppression:', e); }
}

// ============================================================
//  Créer un post automatique (appelé depuis ma-carte.js)
//  type : 'marker_fait' | 'marker_essayer' | 'cuvee_coeur'
// ============================================================
async function createActivityPost(type, domaineName, cuveeName) {
    if (!currentUser || !firebaseReady) return;
    const firstName = userFirstName || currentUser.email.split('@')[0];

    let text;
    if (type === 'marker_fait') {
        text = `${firstName} a découvert le domaine ${domaineName} 🍾`;
    } else if (type === 'marker_essayer') {
        text = `${firstName} a envie de visiter ${domaineName} 📍`;
    } else if (type === 'cuvee_coeur') {
        text = `${firstName} a eu un coup de cœur pour ${cuveeName} chez ${domaineName} 🍷`;
    } else {
        return;
    }

    try {
        await db.collection('activity_posts').add({
            uid:            currentUser.uid,
            firstName,
            type,
            text,
            domaineName:    domaineName || '',
            cuveeName:      cuveeName   || '',
            reactionsCount: 0,
            createdAt:      firebase.firestore.FieldValue.serverTimestamp(),
        });
    } catch (e) {
        console.warn('Erreur post activité:', e);
    }
}

// ============================================================
//  Réactions "J'ai bu ça aussi !"
// ============================================================
async function toggleReaction(postId) {
    if (!currentUser) { openAuthModal(); return; }
    const uid         = currentUser.uid;
    const reactionRef = db.collection('activity_posts').doc(postId)
                          .collection('reactions').doc(uid);
    const postRef     = db.collection('activity_posts').doc(postId);
    const btn         = document.getElementById('react-btn-' + postId);
    const countEl     = document.getElementById('react-count-' + postId);

    try {
        const snap = await reactionRef.get();
        if (snap.exists) {
            await reactionRef.delete();
            await postRef.update({ reactionsCount: firebase.firestore.FieldValue.increment(-1) });
            _myReactions.delete(postId);
            if (btn) btn.classList.remove('reacted');
        } else {
            await reactionRef.set({ uid, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
            await postRef.update({ reactionsCount: firebase.firestore.FieldValue.increment(1) });
            _myReactions.add(postId);
            if (btn) btn.classList.add('reacted');
        }
        const updated = await postRef.get();
        const c = updated.data()?.reactionsCount || 0;
        if (countEl) countEl.textContent = c > 0 ? ' ' + c : '';
    } catch (e) {
        console.warn('Erreur réaction:', e);
    }
}

// ============================================================
//  Commentaires — listener temps réel
// ============================================================
function toggleComments(postId) {
    const section = document.getElementById('comments-' + postId);
    if (!section) return;
    const opening = !section.classList.contains('open');
    section.classList.toggle('open', opening);

    if (opening && !_commentListeners[postId]) {
        _commentListeners[postId] = db.collection('activity_posts').doc(postId)
            .collection('comments')
            .orderBy('createdAt', 'asc')
            .onSnapshot(snap => {
                const listEl = document.getElementById('comments-list-' + postId);
                if (!listEl) return;
                if (!snap.docs.length) {
                    listEl.innerHTML = '<p class="reseau-empty" style="font-size:12px;padding:8px 0">Aucun commentaire.</p>';
                    return;
                }
                listEl.innerHTML = snap.docs.map(d => {
                    const c = d.data();
                    const t = c.createdAt?.toDate ? _fmtTime(c.createdAt.toDate()) : '';
                    const bg = _avatarColor(c.firstName || '?');
                    return `
                        <div class="rv2-comment">
                            <div class="rv2-feed-avatar" style="background:${bg};width:28px;height:28px;font-size:11px;flex-shrink:0">${_initial(c.firstName)}</div>
                            <div class="rv2-comment-body">
                                <span class="rv2-comment-name">${_esc(c.firstName || 'Membre')}</span>
                                <span style="font-size:10px;color:var(--rv2-dim);margin-left:8px">${t}</span>
                                <p class="rv2-comment-text">${_esc(c.text || '')}</p>
                            </div>
                        </div>`;
                }).join('');
            });
    } else if (!opening && _commentListeners[postId]) {
        _commentListeners[postId]();
        delete _commentListeners[postId];
    }
}

async function submitComment(postId) {
    if (!currentUser) { openAuthModal(); return; }
    const input = document.getElementById('comment-input-' + postId);
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    try {
        await db.collection('activity_posts').doc(postId).collection('comments').add({
            uid:       currentUser.uid,
            firstName: userFirstName || currentUser.email.split('@')[0],
            text,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
    } catch (e) {
        console.warn('Erreur commentaire:', e);
        input.value = text; // restaurer si erreur
    }
}

// ============================================================
//  Onglet "Membres"
// ============================================================
function _renderMembres() {
    const container = document.getElementById('reseau-membres-content');
    if (!container) return;

    const others = Object.entries(_allProfiles).filter(([uid]) => uid !== currentUser?.uid);
    const listContent = others.length
        ? `<div class="rv2-membres-grid" id="reseau-membres-list">${_buildMembreCards(others)}</div>`
        : '<p class="reseau-empty" id="reseau-membres-empty">Aucun autre membre pour le moment.<br>Invitez des amis à rejoindre la Route des Vins !</p>';

    container.innerHTML = `
        <p class="rv2-membre-hint">Suivez des membres pour voir leurs découvertes dans votre fil.</p>
        <input type="search" id="reseau-search-membres"
               class="rv2-search-input"
               placeholder="Rechercher un membre…"
               oninput="_filterMembres(this.value)"
               autocomplete="off">
        ${listContent}`;
}

function _buildMembreCards(entries) {
    return entries.map(([uid, profile]) => {
        const followed = _followedUids.has(uid);
        const name = _esc(profile.firstName || 'Membre');
        const bg = _avatarColor(profile.firstName || '?');
        return `
            <div class="rv2-membre-card" data-name="${_esc((profile.firstName || '').toLowerCase())}">
                <div class="rv2-membre-card-band" style="background:${bg}"></div>
                <div class="rv2-membre-card-body">
                    <div class="rv2-membre-top">
                        <div class="rv2-membre-avatar" style="background:${bg}">${_initial(profile.firstName)}</div>
                        <div>
                            <div class="rv2-membre-name">${name}</div>
                            <div class="rv2-membre-bio">Membre de la Route des Vins</div>
                        </div>
                    </div>
                    <div class="rv2-membre-actions">
                        <button class="rv2-follow-btn ${followed ? 'following' : ''}"
                                onclick="toggleFollow('${uid}', this)">
                            ${followed ? 'Suivi ✓' : '+ Suivre'}
                        </button>
                        <button class="rv2-action-btn" title="Envoyer un message"
                                onclick="openChat('${uid}', '${name}')">💬</button>
                        <button class="rv2-action-btn" title="Demander l'accès à une carte"
                                onclick="openMapRequest('${uid}', '${name}')">🗺️</button>
                    </div>
                </div>
            </div>`;
    }).join('');
}

function _filterMembres(query) {
    const q = query.toLowerCase().trim();
    const cards = document.querySelectorAll('#reseau-membres-list .rv2-membre-card');
    let visible = 0;
    cards.forEach(card => {
        const name = card.dataset.name || '';
        const show = !q || name.includes(q);
        card.style.display = show ? '' : 'none';
        if (show) visible++;
    });
    let noResult = document.getElementById('reseau-no-result');
    if (cards.length > 0 && visible === 0) {
        if (!noResult) {
            noResult = document.createElement('p');
            noResult.id = 'reseau-no-result';
            noResult.className = 'reseau-empty';
            noResult.textContent = 'Aucun membre trouvé.';
            document.getElementById('reseau-membres-list').appendChild(noResult);
        }
        noResult.style.display = '';
    } else if (noResult) {
        noResult.style.display = 'none';
    }
}

async function toggleFollow(targetUid, btn) {
    if (!currentUser) { openAuthModal(); return; }
    const ref = db.collection('follows').doc(currentUser.uid)
                  .collection('following').doc(targetUid);
    btn.disabled = true;
    try {
        if (_followedUids.has(targetUid)) {
            await ref.delete();
            _followedUids.delete(targetUid);
            btn.classList.remove('following');
            btn.textContent = '+ Suivre';
        } else {
            await ref.set({ createdAt: firebase.firestore.FieldValue.serverTimestamp() });
            _followedUids.add(targetUid);
            btn.classList.add('following');
            btn.textContent = 'Suivi ✓';
        }
    } catch (e) { console.warn('Erreur follow:', e); }
    btn.disabled = false;
}

// ============================================================
//  Onglet "Coups partagés"
// ============================================================
function _renderCommuns() {
    const container = document.getElementById('reseau-communs-content');
    if (!container) return;
    container.innerHTML = `
        <p class="rv2-membre-hint">Les domaines que vous et vos amis avez tous aimés.</p>
        <p class="reseau-empty" style="margin-top:40px">
            Cette fonctionnalité apparaîtra quand vous et vos amis aurez ajouté des coups de cœur communs.
        </p>`;
}

// ============================================================
//  Sidebar
// ============================================================
function _renderSidebar() {
    const sidebar = document.getElementById('rv2-sidebar');
    if (!sidebar) return;

    const name = userFirstName || currentUser?.email?.split('@')[0] || 'Vous';
    const initial = String(name).charAt(0).toUpperCase();
    const followCount = _followedUids.size;
    const memberCount = Object.keys(_allProfiles).length;

    // Suggestions: members not followed (up to 3)
    const suggestions = Object.entries(_allProfiles)
        .filter(([uid]) => uid !== currentUser?.uid && !_followedUids.has(uid))
        .slice(0, 3);

    const suggestionsHTML = suggestions.length ? suggestions.map(([uid, p]) => {
        const n = _esc(p.firstName || 'Membre');
        const bg = _avatarColor(p.firstName || '?');
        return `
            <div class="rv2-suggestion-row">
                <div class="rv2-feed-avatar" style="background:${bg};width:34px;height:34px;font-size:13px;flex-shrink:0">${_initial(p.firstName)}</div>
                <div style="flex:1;min-width:0">
                    <div class="rv2-suggestion-name">${n}</div>
                    <div class="rv2-suggestion-common">Membre</div>
                </div>
                <button class="rv2-sidebar-follow-btn" onclick="_sidebarFollow('${uid}', this)">+ Suivre</button>
            </div>`;
    }).join('') : '<p class="reseau-empty" style="font-size:12px">Vous suivez tous les membres !</p>';

    sidebar.innerHTML = `
        <div class="rv2-sidebar-card">
            <div class="rv2-profile-top">
                <div class="rv2-profile-avatar">${initial}</div>
                <div>
                    <div class="rv2-profile-name">${_esc(name)}</div>
                    <div class="rv2-profile-bio">Exploratrice de la Route des Vins</div>
                </div>
            </div>
            <div class="rv2-profile-stats">
                <div class="rv2-profile-stat"><span class="rv2-profile-stat-n">${followCount}</span><span class="rv2-profile-stat-l">Amis</span></div>
                <div class="rv2-profile-stat"><span class="rv2-profile-stat-n">${memberCount || '—'}</span><span class="rv2-profile-stat-l">Membres</span></div>
            </div>
        </div>

        ${suggestions.length ? `
        <div class="rv2-sidebar-card">
            <div class="rv2-sidebar-title">Suggestions</div>
            ${suggestionsHTML}
        </div>` : ''}

        <div class="rv2-invite-card">
            <div class="rv2-invite-deco"></div>
            <div class="rv2-invite-title">Inviter un ami</div>
            <p class="rv2-invite-text">Partagez la route avec vos proches.</p>
            <div class="rv2-invite-form">
                <input class="rv2-invite-input" placeholder="Email…" type="email" id="rv2-invite-email">
                <button class="rv2-invite-btn" onclick="_sendInvite()">→</button>
            </div>
        </div>`;
}

function _sidebarFollow(uid, btn) {
    btn.disabled = true;
    const ref = db.collection('follows').doc(currentUser.uid).collection('following').doc(uid);
    ref.set({ createdAt: firebase.firestore.FieldValue.serverTimestamp() })
        .then(() => {
            _followedUids.add(uid);
            btn.textContent = '✓';
            btn.classList.add('done');
            _updateHeroStats();
        })
        .catch(e => { console.warn('follow error', e); btn.disabled = false; });
}

function _sendInvite() {
    const input = document.getElementById('rv2-invite-email');
    if (!input || !input.value.trim()) return;
    input.value = '';
}

// ============================================================
//  Mise à jour du bouton Réseau (appelé depuis firebase-config.js)
// ============================================================
function _updateReseauBtn() {
    const btn = document.getElementById('reseau-btn');
    if (!btn) return;
    btn.classList.toggle('hidden', !currentUser);
}

// ============================================================
//  Utilitaires
// ============================================================
function _esc(str) {
    return String(str || '')
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function _initial(name) {
    return String(name || '?').charAt(0).toUpperCase();
}

function _fmtTime(date) {
    const diff = Math.floor((Date.now() - date.getTime()) / 1000);
    if (diff < 60)     return 'à l\'instant';
    if (diff < 3600)   return `il y a ${Math.floor(diff / 60)} min`;
    if (diff < 86400)  return `il y a ${Math.floor(diff / 3600)} h`;
    if (diff < 604800) return `il y a ${Math.floor(diff / 86400)} j`;
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

// ============================================================
//  Chat privé
// ============================================================
function _convId(uid1, uid2) {
    return [uid1, uid2].sort().join('_');
}

function openChat(targetUid, targetName) {
    if (!currentUser) { openAuthModal(); return; }
    _chatTargetUid = targetUid;
    document.getElementById('chat-title').textContent = 'Discussion avec ' + targetName;
    document.getElementById('chat-input').value = '';
    document.getElementById('chat-panel').classList.remove('hidden');
    _listenChatMessages();
    _markConvAsRead(targetUid);
}

function closeChat() {
    document.getElementById('chat-panel').classList.add('hidden');
    if (_chatUnsub) { _chatUnsub(); _chatUnsub = null; }
    _chatTargetUid = null;
}

function _listenChatMessages() {
    if (_chatUnsub) { _chatUnsub(); _chatUnsub = null; }
    const convId    = _convId(currentUser.uid, _chatTargetUid);
    const container = document.getElementById('chat-messages');
    container.innerHTML = '<p class="reseau-loading">Chargement…</p>';

    _chatUnsub = db.collection('conversations').doc(convId)
        .collection('messages')
        .orderBy('createdAt', 'asc')
        .limit(100)
        .onSnapshot(snap => {
            if (!snap.docs.length) {
                container.innerHTML = '<p class="chat-empty">Commencez la discussion !</p>';
                return;
            }
            container.innerHTML = snap.docs.map(d => {
                const m    = d.data();
                const isMe = m.uid === currentUser.uid;
                const t    = m.createdAt?.toDate ? _fmtTime(m.createdAt.toDate()) : '';
                return `
                    <div class="chat-message ${isMe ? 'chat-message--mine' : 'chat-message--theirs'}">
                        ${!isMe ? `<span class="chat-sender">${_esc(m.firstName)}</span>` : ''}
                        <p class="chat-bubble">${_esc(m.text)}</p>
                        <span class="chat-time">${t}</span>
                    </div>`;
            }).join('');
            container.scrollTop = container.scrollHeight;
        }, () => {
            container.innerHTML = '<p class="reseau-empty">Impossible de charger les messages.</p>';
        });
}

async function sendChatMessage() {
    if (!currentUser || !_chatTargetUid) return;
    const input = document.getElementById('chat-input');
    const text  = (input?.value || '').trim();
    if (!text) return;
    input.value = '';

    const convId   = _convId(currentUser.uid, _chatTargetUid);
    const myUid    = currentUser.uid;
    const theirUid = _chatTargetUid;

    try {
        const batch  = db.batch();
        const msgRef = db.collection('conversations').doc(convId).collection('messages').doc();
        batch.set(msgRef, {
            uid:       myUid,
            firstName: userFirstName || currentUser.email.split('@')[0],
            text,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        const convRef = db.collection('conversations').doc(convId);
        batch.set(convRef, {
            participants:           [myUid, theirUid].sort(),
            lastMessage:            text,
            lastAt:                 firebase.firestore.FieldValue.serverTimestamp(),
            [`unread_${theirUid}`]: firebase.firestore.FieldValue.increment(1),
        }, { merge: true });
        await batch.commit();
    } catch (e) {
        console.warn('Erreur envoi message:', e);
        input.value = text;
    }
}

async function _markConvAsRead(targetUid) {
    if (!currentUser) return;
    const convId = _convId(currentUser.uid, targetUid);
    try {
        await db.collection('conversations').doc(convId).set(
            { [`unread_${currentUser.uid}`]: 0 },
            { merge: true }
        );
    } catch (_) {}
}

// ============================================================
//  Demande d'accès à une carte
// ============================================================
async function openMapRequest(targetUid, targetName) {
    if (!currentUser) { openAuthModal(); return; }
    _mapRequestTargetUid  = targetUid;
    _mapRequestTargetName = targetName;
    _mapRequestMaps       = [];

    document.getElementById('map-request-title').textContent = `Accès aux cartes de ${targetName}`;
    document.getElementById('map-request-body').innerHTML    = '<p class="reseau-loading">Chargement des cartes…</p>';
    document.getElementById('map-request-modal').classList.remove('hidden');

    try {
        const snap = await db.collection('user_maps').doc(targetUid).collection('maps').get();
        if (!snap.docs.length) {
            document.getElementById('map-request-body').innerHTML =
                '<p class="reseau-empty">Cet utilisateur n\'a pas encore de carte.</p>';
            return;
        }
        _mapRequestMaps = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        document.getElementById('map-request-body').innerHTML = `
            <p class="map-request-hint">Choisissez la carte à laquelle vous souhaitez accéder :</p>
            <select id="map-request-select" class="map-request-select">
                ${_mapRequestMaps.map(m => `<option value="${m.id}">${_esc(m.name)}</option>`).join('')}
            </select>
            <div class="map-request-footer">
                <button class="btn btn--secondary" onclick="closeMapRequestModal()">Annuler</button>
                <button class="btn" onclick="submitMapRequest()">Envoyer la demande</button>
            </div>`;
    } catch (e) {
        document.getElementById('map-request-body').innerHTML =
            '<p class="reseau-empty">Impossible de charger les cartes.</p>';
    }
}

async function submitMapRequest() {
    if (!currentUser || !_mapRequestTargetUid) return;
    const selectEl = document.getElementById('map-request-select');
    const mapId    = selectEl?.value;
    const mapObj   = _mapRequestMaps.find(m => m.id === mapId);
    if (!mapId || !mapObj) return;

    try {
        await db.collection('map_access_requests').add({
            fromUid:       currentUser.uid,
            fromFirstName: userFirstName || currentUser.email.split('@')[0],
            toUid:         _mapRequestTargetUid,
            mapId,
            mapName:       mapObj.name,
            status:        'pending',
            createdAt:     firebase.firestore.FieldValue.serverTimestamp(),
        });
        closeMapRequestModal();
        alert(`Demande envoyée à ${_mapRequestTargetName} pour la carte « ${mapObj.name} » !`);
    } catch (e) {
        console.warn('Erreur demande accès:', e);
        alert('Erreur lors de l\'envoi de la demande.');
    }
}

function closeMapRequestModal() {
    document.getElementById('map-request-modal').classList.add('hidden');
    _mapRequestTargetUid  = null;
    _mapRequestTargetName = null;
    _mapRequestMaps       = [];
}
