// ============================================
// Main Application Logic
// ============================================

import './index.css';
import { t, setLang, getLang, applyTranslations } from './i18n/index.js';
import { connectWallet, disconnectWallet, state as walletState, updateWalletUI } from './wallet/index.js';
import { initCreateModule } from './modules/create.js';
import { initMintModule } from './modules/mint.js';
import { initAllowlistModule } from './modules/allowlist.js';
import { initQRModule } from './modules/qr.js';
import { initGalleryModule, loadGallery } from './modules/gallery.js';
import { initDocsModule } from './modules/docs.js';
import { showToast } from './ui/index.js';

let currentMode = 'standalone'; // 'standalone' | 'farcaster'
let currentPage = 'home';

function init() {
  initNavigation();
  initLanguageSwitcher();
  initModeSwitcher();
  initWalletButton();
  initFeatureCards();
  initCreateModule();
  initMintModule();
  initAllowlistModule();
  initQRModule();
  initGalleryModule();
  initDocsModule();
  initModalClose();
  initFarcasterDetection();

  // Apply translations
  applyTranslations();
  updateWalletUI();

  // Listen for wallet changes
  window.addEventListener('walletChanged', () => {
    if (currentPage === 'gallery' && walletState.connected) {
      loadGallery();
    }
  });

  // Listen for toast events
  window.addEventListener('showToast', (e) => {
    showToast(e.detail.message, e.detail.type);
  });

  // Check if embedded in Farcaster
  if (window.location.search.includes('frame=true') || window.location.search.includes('farcaster=true')) {
    setMode('farcaster');
  }
}

function initNavigation() {
  document.querySelectorAll('.nav-item').forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = item.dataset.page;
      if (page) navigateTo(page);
    });
  });

  // Logo click goes home
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', () => navigateTo('home'));
  }

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }
}

function navigateTo(page) {
  currentPage = page;
  document.querySelectorAll('.nav-item').forEach((item) => {
    item.classList.toggle('active', item.dataset.page === page);
  });
  document.querySelectorAll('.page-view').forEach((view) => {
    view.classList.toggle('active', view.id === `page-${page}`);
  });

  // Close mobile menu
  const nav = document.querySelector('.nav');
  if (nav) nav.classList.remove('open');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Page-specific actions
  if (page === 'gallery' && walletState.connected) {
    loadGallery();
  }
}

function initLanguageSwitcher() {
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      setLang(lang);
      document.querySelectorAll('.lang-btn').forEach((b) => {
        b.classList.toggle('active', b.dataset.lang === lang);
      });
      applyTranslations();
      // Re-render dynamic content that depends on i18n
      updateWalletUI();
      if (currentPage === 'gallery') {
        const loadBtn = document.getElementById('gallery-load-btn');
        if (loadBtn) loadBtn.textContent = t('gallery.load');
      }
    });
  });
}

function initModeSwitcher() {
  document.querySelectorAll('.mode-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      setMode(mode);
    });
  });
}

function setMode(mode) {
  currentMode = mode;
  document.querySelectorAll('.mode-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.mode === mode);
  });

  const banner = document.getElementById('farcaster-banner');
  if (banner) {
    banner.classList.toggle('active', mode === 'farcaster');
  }

  // In Farcaster mode, hide certain elements and optimize
  document.body.classList.toggle('farcaster-mode', mode === 'farcaster');
}

function initWalletButton() {
  const btn = document.getElementById('wallet-btn');
  if (btn) {
    btn.addEventListener('click', async () => {
      if (walletState.connected) {
        disconnectWallet();
        showToast(t('toast.wallet.disconnected'), 'info');
      } else {
        const ok = await connectWallet();
        if (ok) showToast(t('toast.wallet.connected'), 'success');
      }
    });
  }
}

function initFeatureCards() {
  document.querySelectorAll('.feature-card[data-page]').forEach((card) => {
    card.addEventListener('click', () => {
      const page = card.dataset.page;
      if (page) navigateTo(page);
    });
  });

  // Hero CTA buttons
  document.querySelectorAll('[data-nav]').forEach((el) => {
    el.addEventListener('click', () => {
      const page = el.dataset.nav;
      if (page) navigateTo(page);
    });
  });
}

function initModalClose() {
  const modal = document.getElementById('poap-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }
  const modalClose = document.getElementById('modal-close');
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      const modal = document.getElementById('poap-modal');
      if (modal) modal.classList.remove('active');
    });
  }
}

function initFarcasterDetection() {
  // Check for Farcaster frame context
  if (window.self !== window.top) {
    // We're in an iframe — likely Farcaster
    const url = new URL(window.location.href);
    if (url.searchParams.get('frame') === 'true') {
      setMode('farcaster');
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
