// ============================================
// Minting Hub Module
// ============================================

import { t } from '../i18n/index.js';
import { state as walletState } from '../wallet/index.js';
import { mintPublic, mintAllowlist, mintSignature, getBaseScanTxUrl, getPoapInfo } from '../contract/index.js';
import { showToast, showLoading, hideLoading, updateLoadingText } from '../ui/index.js';

export function initMintModule() {
  bindMintTabs();
  bindMintForms();
}

function bindMintTabs() {
  document.querySelectorAll('.mint-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.mintTab;
      document.querySelectorAll('.mint-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.mint-panel').forEach((p) => p.classList.remove('active'));
      const panel = document.getElementById(`mint-panel-${target}`);
      if (panel) panel.classList.add('active');
    });
  });
}

function bindMintForms() {
  // Public mint
  const publicBtn = document.getElementById('mint-public-btn');
  if (publicBtn) publicBtn.addEventListener('click', handlePublicMint);

  // Allowlist mint
  const allowlistBtn = document.getElementById('mint-allowlist-btn');
  if (allowlistBtn) allowlistBtn.addEventListener('click', handleAllowlistMint);

  // Signature mint
  const sigBtn = document.getElementById('mint-signature-btn');
  if (sigBtn) sigBtn.addEventListener('click', handleSignatureMint);
}

async function handlePublicMint() {
  const poapId = document.getElementById('mint-public-poapid')?.value;
  const recipient = document.getElementById('mint-public-recipient')?.value;

  if (!poapId) {
    showToast('Please enter a POAP ID', 'error');
    return;
  }
  if (!walletState.connected) {
    showToast(t('header.connect'), 'error');
    return;
  }

  const btn = document.getElementById('mint-public-btn');
  setBtnLoading(btn, true);
  showLoading(t('mint.minting'));

  try {
    const result = await mintPublic(parseInt(poapId), recipient || null);
    updateLoadingText(t('toast.tx.sent'));
    showToast(t('mint.success'), 'success');
    showMintResult(result.hash, 'mint-public-result');
  } catch (err) {
    handleMintError(err);
  } finally {
    hideLoading();
    setBtnLoading(btn, false);
  }
}

async function handleAllowlistMint() {
  const poapId = document.getElementById('mint-allowlist-poapid')?.value;
  const recipient = document.getElementById('mint-allowlist-recipient')?.value;
  const proof = document.getElementById('mint-allowlist-proof')?.value;

  if (!poapId || !proof) {
    showToast('Please enter POAP ID and Merkle proof', 'error');
    return;
  }
  if (!walletState.connected) {
    showToast(t('header.connect'), 'error');
    return;
  }

  const btn = document.getElementById('mint-allowlist-btn');
  setBtnLoading(btn, true);
  showLoading(t('mint.minting'));

  try {
    const result = await mintAllowlist(parseInt(poapId), recipient || null, proof);
    updateLoadingText(t('toast.tx.sent'));
    showToast(t('mint.success'), 'success');
    showMintResult(result.hash, 'mint-allowlist-result');
  } catch (err) {
    handleMintError(err);
  } finally {
    hideLoading();
    setBtnLoading(btn, false);
  }
}

async function handleSignatureMint() {
  const poapId = document.getElementById('mint-signature-poapid')?.value;
  const recipient = document.getElementById('mint-signature-recipient')?.value;
  const deadline = document.getElementById('mint-signature-deadline')?.value;
  const signature = document.getElementById('mint-signature-sig')?.value;

  if (!poapId || !signature) {
    showToast('Please enter POAP ID and signature', 'error');
    return;
  }
  if (!walletState.connected) {
    showToast(t('header.connect'), 'error');
    return;
  }

  const btn = document.getElementById('mint-signature-btn');
  setBtnLoading(btn, true);
  showLoading(t('mint.minting'));

  try {
    const result = await mintSignature(parseInt(poapId), recipient || null, parseInt(deadline), signature);
    updateLoadingText(t('toast.tx.sent'));
    showToast(t('mint.success'), 'success');
    showMintResult(result.hash, 'mint-signature-result');
  } catch (err) {
    handleMintError(err);
  } finally {
    hideLoading();
    setBtnLoading(btn, false);
  }
}

function setBtnLoading(btn, loading) {
  if (!btn) return;
  if (loading) {
    btn.dataset.originalText = btn.innerHTML;
    btn.innerHTML = '<span class="spinner"></span>';
    btn.disabled = true;
  } else {
    btn.innerHTML = btn.dataset.originalText || btn.textContent;
    btn.disabled = false;
  }
}

function handleMintError(err) {
  console.error('Mint error:', err);
  let msg = t('toast.tx.failed');
  if (err.shortMessage) msg += ': ' + err.shortMessage;
  else if (err.reason) msg += ': ' + err.reason;
  else if (err.message) msg += ': ' + err.message.slice(0, 100);
  showToast(msg, 'error');
}

function showMintResult(txHash, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.classList.remove('hidden');
  container.innerHTML = `
    <div class="glass-card" style="border-color: var(--c-success); margin-top: var(--sp-5);">
      <div class="flex items-center gap-3 mb-4">
        <span style="color: var(--c-success); font-size: 1.5rem;">&#10003;</span>
        <h3>${t('mint.success')}</h3>
      </div>
      <div class="preview-meta-row">
        <span class="label">Tx Hash</span>
        <span class="value text-mono text-sm"><a href="${getBaseScanTxUrl(txHash)}" target="_blank">${txHash.slice(0, 10)}...${txHash.slice(-8)}</a></span>
      </div>
      <div class="modal-actions mt-4">
        <a href="${getBaseScanTxUrl(txHash)}" target="_blank" class="btn btn-secondary btn-sm">${t('mint.view.basescan')}</a>
      </div>
    </div>
  `;
}
