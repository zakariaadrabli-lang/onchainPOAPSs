// ============================================
// Allowlist & Merkle Tree Generator Module
// ============================================

import { t } from '../i18n/index.js';
import { parseAddresses, generateMerkleData } from '../merkle/index.js';
import { showToast } from '../ui/index.js';

let currentMerkleData = null;

export function initAllowlistModule() {
  const generateBtn = document.getElementById('merkle-generate-btn');
  if (generateBtn) generateBtn.addEventListener('click', handleGenerate);

  const copyRootBtn = document.getElementById('copy-root-btn');
  if (copyRootBtn) copyRootBtn.addEventListener('click', () => copyToClipboard('merkle-root', 'copy-root-btn'));

  const copyProofsBtn = document.getElementById('copy-proofs-btn');
  if (copyProofsBtn) copyProofsBtn.addEventListener('click', () => copyToClipboard('merkle-proofs', 'copy-proofs-btn'));
}

function handleGenerate() {
  const input = document.getElementById('allowlist-input')?.value;
  if (!input || !input.trim()) {
    showToast(t('allowlist.error'), 'error');
    return;
  }

  const addresses = parseAddresses(input);
  if (addresses.length === 0) {
    showToast(t('allowlist.error'), 'error');
    return;
  }

  try {
    currentMerkleData = generateMerkleData(addresses);

    // Display root
    const rootEl = document.getElementById('merkle-root');
    if (rootEl) rootEl.textContent = currentMerkleData.root;

    // Display count
    const countEl = document.getElementById('merkle-count');
    if (countEl) countEl.textContent = `${addresses.length} ${t('allowlist.count')}`;

    // Display proofs
    const proofsEl = document.getElementById('merkle-proofs');
    if (proofsEl) {
      const html = Object.entries(currentMerkleData.proofs).map(([addr, proof]) => {
        const proofStr = proof.join(', ');
        return `
          <div class="proof-item">
            <div class="addr">${addr}</div>
            <div class="proof">${proofStr}</div>
          </div>
        `;
      }).join('');
      proofsEl.innerHTML = html;
    }

    showToast('Merkle tree generated successfully', 'success');
  } catch (err) {
    console.error('Merkle generation error:', err);
    showToast(t('toast.error'), 'error');
  }
}

async function copyToClipboard(elementId, btnId) {
  const el = document.getElementById(elementId);
  if (!el || !el.textContent) return;
  try {
    let text = el.textContent;
    if (elementId === 'merkle-proofs') {
      // Copy as JSON
      if (currentMerkleData) {
        const exportObj = {};
        for (const [addr, proof] of Object.entries(currentMerkleData.proofs)) {
          exportObj[addr] = proof;
        }
        text = JSON.stringify({ root: currentMerkleData.root, proofs: exportObj }, null, 2);
      }
    }
    await navigator.clipboard.writeText(text);
    showToast(t('allowlist.copied'), 'success');
    const btn = document.getElementById(btnId);
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = '&#10003;';
      setTimeout(() => { btn.textContent = orig; }, 2000);
    }
  } catch (err) {
    showToast('Failed to copy', 'error');
  }
}

export function getCurrentMerkleData() {
  return currentMerkleData;
}
