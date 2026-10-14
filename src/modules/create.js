// ============================================
// POAP Registration Module
// ============================================

import { t } from '../i18n/index.js';
import { state as walletState, shortenAddress } from '../wallet/index.js';
import { createPoap as contractCreatePoap } from '../contract/index.js';
import { showToast, showLoading, hideLoading, updateLoadingText } from '../ui/index.js';

let svgData = '';
let formState = {
  name: '',
  soulbound: true,
  publicMint: false,
  description: '',
  location: '',
  eventDate: '',
  externalUrl: '',
};

export function initCreateModule() {
  bindFormEvents();
  updatePreview();
}

function bindFormEvents() {
  // Name input
  const nameInput = document.getElementById('create-name');
  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      formState.name = e.target.value;
      updatePreview();
    });
  }

  // SVG file upload
  const fileInput = document.getElementById('svg-file-input');
  const fileUploadArea = document.getElementById('svg-upload-area');
  if (fileInput && fileUploadArea) {
    fileInput.addEventListener('change', handleFileSelect);
    fileUploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      fileUploadArea.classList.add('dragover');
    });
    fileUploadArea.addEventListener('dragleave', () => {
      fileUploadArea.classList.remove('dragover');
    });
    fileUploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      fileUploadArea.classList.remove('dragover');
      const file = e.dataTransfer.files[0];
      if (file) processSvgFile(file);
    });
  }

  // SVG paste textarea
  const svgTextarea = document.getElementById('svg-paste');
  if (svgTextarea) {
    svgTextarea.addEventListener('input', (e) => {
      svgData = e.target.value;
      updatePreview();
    });
  }

  // Toggles
  const soulboundToggle = document.getElementById('toggle-soulbound');
  if (soulboundToggle) {
    soulboundToggle.addEventListener('change', (e) => {
      formState.soulbound = e.target.checked;
      updatePreview();
    });
  }

  const publicToggle = document.getElementById('toggle-public');
  if (publicToggle) {
    publicToggle.addEventListener('change', (e) => {
      formState.publicMint = e.target.checked;
      updatePreview();
    });
  }

  // Optional fields
  const descInput = document.getElementById('create-desc');
  if (descInput) {
    descInput.addEventListener('input', (e) => { formState.description = e.target.value; updatePreview(); });
  }

  const locInput = document.getElementById('create-location');
  if (locInput) {
    locInput.addEventListener('input', (e) => { formState.location = e.target.value; updatePreview(); });
  }

  const dateInput = document.getElementById('create-date');
  if (dateInput) {
    dateInput.addEventListener('input', (e) => { formState.eventDate = e.target.value; updatePreview(); });
  }

  const urlInput = document.getElementById('create-url');
  if (urlInput) {
    urlInput.addEventListener('input', (e) => { formState.externalUrl = e.target.value; updatePreview(); });
  }

  // Submit
  const submitBtn = document.getElementById('create-submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', handleSubmit);
  }
}

function handleFileSelect(e) {
  const file = e.target.files[0];
  if (file) processSvgFile(file);
}

function processSvgFile(file) {
  if (file.size > 100 * 1024) {
    showToast('SVG file too large (max 100KB)', 'error');
    return;
  }
  if (!file.name.endsWith('.svg') && file.type !== 'image/svg+xml') {
    showToast('Please upload an SVG file', 'error');
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    svgData = e.target.result;
    const pasteArea = document.getElementById('svg-paste');
    if (pasteArea) pasteArea.value = svgData;
    updatePreview();
  };
  reader.readAsText(file);
}

export function updatePreview() {
  const previewSvg = document.getElementById('preview-svg-container');
  const previewPlaceholder = document.getElementById('preview-placeholder');
  const previewName = document.getElementById('preview-name');
  const previewBadges = document.getElementById('preview-badges');
  const previewSoulbound = document.getElementById('preview-soulbound');
  const previewPublic = document.getElementById('preview-public');
  const previewDesc = document.getElementById('preview-desc');
  const previewLoc = document.getElementById('preview-loc');
  const previewDate = document.getElementById('preview-date');

  if (svgData && previewSvg) {
    previewSvg.innerHTML = svgData;
    if (previewPlaceholder) previewPlaceholder.style.display = 'none';
    previewSvg.style.display = 'flex';
  } else if (previewSvg) {
    previewSvg.style.display = 'none';
    if (previewPlaceholder) previewPlaceholder.style.display = 'block';
  }

  if (previewName) previewName.textContent = formState.name || 'Untitled POAP';

  // Badges
  if (previewBadges) {
    const badges = [];
    if (formState.soulbound) {
      badges.push('<span class="badge badge-secondary">Soulbound</span>');
    }
    if (formState.publicMint) {
      badges.push('<span class="badge badge-primary">Public</span>');
    } else {
      badges.push('<span class="badge badge-warning">Private</span>');
    }
    previewBadges.innerHTML = badges.join('');
  }

  // Meta rows
  if (previewDesc) previewDesc.textContent = formState.description || t('common.none');
  if (previewLoc) previewLoc.textContent = formState.location || t('common.none');
  if (previewDate) previewDate.textContent = formState.eventDate || t('common.none');
}

async function handleSubmit() {
  if (!walletState.connected) {
    showToast(t('toast.error') + ' — ' + t('header.connect'), 'error');
    return;
  }
  if (!formState.name.trim()) {
    showToast('Please enter a POAP name', 'error');
    return;
  }
  if (!svgData.trim()) {
    showToast('Please provide SVG artwork', 'error');
    return;
  }

  const submitBtn = document.getElementById('create-submit');
  if (submitBtn) submitBtn.disabled = true;

  showLoading(t('create.registering'));

  try {
    const result = await contractCreatePoap({
      name: formState.name,
      svgData: svgData,
      soulbound: formState.soulbound,
      publicMint: formState.publicMint,
      description: formState.description,
      location: formState.location,
      eventDate: formState.eventDate,
      externalUrl: formState.externalUrl,
    });

    updateLoadingText(t('toast.tx.sent'));
    showToast(t('create.success'), 'success');
    hideLoading();

    // Show result
    showCreateResult(result.hash);
  } catch (err) {
    console.error('Create POAP error:', err);
    hideLoading();
    showToast(t('toast.tx.failed') + ': ' + (err.shortMessage || err.message || 'Unknown error'), 'error');
  } finally {
    if (submitBtn) submitBtn.disabled = false;
  }
}

function showCreateResult(txHash) {
  const resultDiv = document.getElementById('create-result');
  if (!resultDiv) return;
  resultDiv.classList.remove('hidden');
  resultDiv.innerHTML = `
    <div class="glass-card" style="border-color: var(--c-success); margin-top: var(--sp-5);">
      <div class="flex items-center gap-3 mb-4">
        <span style="color: var(--c-success); font-size: 1.5rem;">&#10003;</span>
        <h3>${t('create.success')}</h3>
      </div>
      <div class="preview-meta-row">
        <span class="label">${t('create.tx')}</span>
        <span class="value text-mono text-sm"><a href="https://sepolia.basescan.org/tx/${txHash}" target="_blank">${txHash.slice(0, 10)}...${txHash.slice(-8)}</a></span>
      </div>
    </div>
  `;
}
