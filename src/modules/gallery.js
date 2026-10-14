// ============================================
// User POAP Gallery Module
// ============================================

import { t } from '../i18n/index.js';
import { state as walletState } from '../wallet/index.js';
import { getTokensOfOwner, getTokenMetadata, getPoapIdByToken, isTokenSoulbound, getBaseScanTokenUrl, getOpenSeaUrl } from '../contract/index.js';
import { showToast, showLoading, hideLoading } from '../ui/index.js';

export function initGalleryModule() {
  const loadBtn = document.getElementById('gallery-load-btn');
  if (loadBtn) loadBtn.addEventListener('click', loadGallery);

  // Auto-load if wallet is connected
  if (walletState.connected) {
    loadGallery();
  }
}

export async function loadGallery() {
  if (!walletState.connected || !walletState.address) {
    showToast(t('header.connect'), 'error');
    return;
  }

  const grid = document.getElementById('gallery-grid');
  const empty = document.getElementById('gallery-empty');
  const loadBtn = document.getElementById('gallery-load-btn');

  if (loadBtn) {
    loadBtn.innerHTML = '<span class="spinner"></span>';
    loadBtn.disabled = true;
  }

  showLoading(t('gallery.loading'));

  try {
    const tokenIds = await getTokensOfOwner(walletState.address);

    if (tokenIds.length === 0) {
      if (grid) grid.innerHTML = '';
      if (empty) empty.classList.remove('hidden');
      hideLoading();
      return;
    }

    if (empty) empty.classList.add('hidden');
    if (grid) grid.innerHTML = '';

    // Fetch metadata for each token
    const tokens = await Promise.all(
      tokenIds.slice(0, 50).map(async (tokenId) => {
        const [meta, poapId, soulbound] = await Promise.all([
          getTokenMetadata(tokenId),
          getPoapIdByToken(tokenId),
          isTokenSoulbound(tokenId),
        ]);
        return { tokenId, meta, poapId, soulbound };
      })
    );

    tokens.forEach((token) => {
      const card = createGalleryCard(token);
      if (grid) grid.appendChild(card);
    });

    showToast(`Loaded ${tokens.length} POAPs`, 'success');
  } catch (err) {
    console.error('Gallery load error:', err);
    showToast('Failed to load gallery', 'error');
  } finally {
    hideLoading();
    if (loadBtn) {
      loadBtn.textContent = t('gallery.load');
      loadBtn.disabled = false;
    }
  }
}

function createGalleryCard(token) {
  const card = document.createElement('div');
  card.className = 'glass-card gallery-item';
  card.style.padding = 'var(--sp-3)';

  const imgContent = token.meta?.image
    ? extractSvgFromImage(token.meta.image)
    : '<div class="preview-svg-placeholder"><div class="icon">&#127942;</div></div>';

  const name = token.meta?.name || `POAP #${token.tokenId}`;

  card.innerHTML = `
    <div class="gallery-img-wrap">
      ${imgContent}
      <div class="verify-badge">
        <span class="badge badge-verified">${t('gallery.verified')}</span>
      </div>
    </div>
    <div class="gallery-item-title">${escapeHtml(name)}</div>
    <div class="gallery-item-meta">Token #${token.tokenId}${token.poapId !== null ? ' - POAP #' + token.poapId : ''}</div>
    ${token.soulbound ? '<span class="badge badge-secondary mt-4">' + t('gallery.soulbound') + '</span>' : ''}
  `;

  card.addEventListener('click', () => showTokenModal(token));

  return card;
}

function extractSvgFromImage(imageUri) {
  if (!imageUri) return '';
  if (imageUri.startsWith('data:image/svg+xml')) {
    const encoded = imageUri.split(',')[1];
    try {
      return decodeURIComponent(encoded);
    } catch {
      try { return atob(encoded); } catch { return ''; }
    }
  }
  if (imageUri.startsWith('<svg')) return imageUri;
  if (imageUri.startsWith('data:image/svg;base64')) {
    const encoded = imageUri.split(',')[1];
    try { return atob(encoded); } catch { return ''; }
  }
  // Fallback: try as regular image URL
  return `<img src="${imageUri}" style="width:100%;height:100%;object-fit:contain;" />`;
}

function showTokenModal(token) {
  const modal = document.getElementById('poap-modal');
  const modalBody = document.getElementById('modal-body');
  if (!modal || !modalBody) return;

  const imgContent = token.meta?.image
    ? extractSvgFromImage(token.meta.image)
    : '<div class="preview-svg-placeholder"><div class="icon">&#127942;</div></div>';

  const name = token.meta?.name || `POAP #${token.tokenId}`;
  const desc = token.meta?.description || t('common.none');
  const attrs = token.meta?.attributes || [];

  modalBody.innerHTML = `
    <div class="modal-svg-wrap">${imgContent}</div>
    <h3 style="margin-bottom: var(--sp-3);">${escapeHtml(name)}</h3>
    <div class="flex gap-2 flex-wrap mb-4">
      <span class="badge badge-verified">${t('gallery.verified')}</span>
      ${token.soulbound ? '<span class="badge badge-secondary">' + t('gallery.soulbound') + '</span>' : ''}
    </div>
    <div class="modal-meta-row"><span class="label">${t('modal.id')}</span><span class="value">#${token.tokenId}</span></div>
    ${token.poapId !== null ? `<div class="modal-meta-row"><span class="label">${t('modal.poapid')}</span><span class="value">#${token.poapId}</span></div>` : ''}
    <div class="modal-meta-row"><span class="label">${t('modal.desc')}</span><span class="value">${escapeHtml(desc)}</span></div>
    <div class="modal-meta-row"><span class="label">${t('modal.owner')}</span><span class="value text-mono">${walletState.address || ''}</span></div>
    ${attrs.map(a => `<div class="modal-meta-row"><span class="label">${escapeHtml(String(p.trait_type || 'Trait'))}</span><span class="value">${escapeHtml(String(p.value || ''))}</span></div>`).join('')}
    <div class="modal-actions">
      <a href="${getBaseScanTokenUrl(token.tokenId)}" target="_blank" class="btn btn-secondary btn-sm">${t('modal.basescan')}</a>
      <a href="${getOpenSeaUrl(token.tokenId)}" target="_blank" class="btn btn-secondary btn-sm">${t('modal.opensea')}</a>
    </div>
  `;

  modal.classList.add('active');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
