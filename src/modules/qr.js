// ============================================
// QR & Signature Generator Module
// ============================================

import { t } from '../i18n/index.js';
import { state as walletState } from '../wallet/index.js';
import { signMintAuthorization } from '../contract/index.js';
import { showToast, showLoading, hideLoading } from '../ui/index.js';
import QRCode from 'qrcode';

export function initQRModule() {
  const generateBtn = document.getElementById('qr-generate-btn');
  if (generateBtn) generateBtn.addEventListener('click', handleGenerateQR);

  const downloadBtn = document.getElementById('qr-download-btn');
  if (downloadBtn) downloadBtn.addEventListener('click', handleDownloadQR);

  const signBtn = document.getElementById('sign-generate-btn');
  if (signBtn) signBtn.addEventListener('click', handleGenerateSignature);
}

async function handleGenerateQR() {
  const url = document.getElementById('qr-url')?.value?.trim();
  const size = parseInt(document.getElementById('qr-size')?.value || '300');
  const color = document.getElementById('qr-color')?.value || '#060818';

  if (!url) {
    showToast('Please enter a URL', 'error');
    return;
  }

  try {
    const canvas = document.createElement('canvas');
    await QRCode.toCanvas(canvas, url, {
      width: size,
      margin: 2,
      color: { dark: color, light: '#ffffff' },
      errorCorrectionLevel: 'M',
    });

    const wrap = document.getElementById('qr-canvas-wrap');
    if (wrap) {
      wrap.innerHTML = '';
      wrap.appendChild(canvas);
    }
    showToast('QR code generated', 'success');
  } catch (err) {
    console.error('QR generation error:', err);
    showToast('Failed to generate QR code', 'error');
  }
}

function handleDownloadQR() {
  const canvas = document.querySelector('#qr-canvas-wrap canvas');
  if (!canvas) {
    showToast('Generate a QR code first', 'error');
    return;
  }
  const link = document.createElement('a');
  link.download = 'poap-mint-qr.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
  showToast('QR code downloaded', 'success');
}

async function handleGenerateSignature() {
  const poapId = document.getElementById('sign-poapid')?.value;
  const recipient = document.getElementById('sign-recipient')?.value;
  const days = parseInt(document.getElementById('sign-deadline')?.value || '37');

  if (!poapId || !recipient) {
    showToast('Please enter POAP ID and recipient address', 'error');
    return;
  }
  if (!walletState.connected) {
    showToast(t('header.connect'), 'error');
    return;
  }

  const btn = document.getElementById('sign-generate-btn');
  if (btn) {
    btn.dataset.original = btn.innerHTML;
    btn.innerHTML = '<span class="spinner"></span>';
    btn.disabled = true;
  }

  showLoading('Generating signature...');

  try {
    const result = await signMintAuthorization(parseInt(poapId), recipient, days);
    const outputEl = document.getElementById('sign-output');
    if (outputEl) {
      outputEl.classList.remove('hidden');
      outputEl.innerHTML = `
        <div class="glass-card" style="border-color: var(--c-accent); margin-top: var(--sp-5);">
          <h4 style="margin-bottom: var(--sp-3); color: var(--c-accent);">Signature Data</h4>
          <div class="preview-meta-row">
            <span class="label">Signature</span>
            <span class="value text-mono text-sm" style="word-break: break-all;">${result.signature}</span>
          </div>
          <div class="preview-meta-row">
            <span class="label">Deadline</span>
            <span class="value text-mono text-sm">${result.deadline}</span>
          </div>
          <div class="preview-meta-row">
            <span class="label">Deadline (Human)</span>
            <span class="value">${new Date(result.deadline * 1000).toLocaleString()}</span>
          </div>
          <div class="modal-actions mt-4">
            <button class="btn btn-secondary btn-sm" onclick="navigator.clipboard.writeText('${result.signature}').then(() => {})">${t('common.copy')} Signature</button>
            <button class="btn btn-secondary btn-sm" onclick="navigator.clipboard.writeText('${result.deadline}').then(() => {})">${t('common.copy')} Deadline</button>
          </div>
        </div>
      `;
    }
    showToast('Signature generated successfully', 'success');
  } catch (err) {
    console.error('Signature generation error:', err);
    showToast('Failed to generate signature: ' + (err.shortMessage || err.message || ''), 'error');
  } finally {
    hideLoading();
    if (btn) {
      btn.innerHTML = btn.dataset.original || btn.textContent;
      btn.disabled = false;
    }
  }
}
