// ============================================
// Toast & Loading UI utilities
// ============================================

export function showToast(message, type = 'info', duration = 4000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icons = { success: '&#10003;', error: '&#10007;', info: '&#8505;' };
  const icon = icons[type] || icons.info;

  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

export function showLoading(text = 'Loading...') {
  let overlay = document.getElementById('loading-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    overlay.className = 'loading-overlay';
    document.body.appendChild(overlay);
  }
  overlay.innerHTML = `
    <div class="spinner"></div>
    <div class="loading-text">${text}</div>
  `;
  overlay.classList.add('active');
}

export function hideLoading() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) overlay.classList.remove('active');
}

export function updateLoadingText(text) {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    const textEl = overlay.querySelector('.loading-text');
    if (textEl) textEl.textContent = text;
  }
}
