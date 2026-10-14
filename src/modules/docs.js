// ============================================
// Documentation Content Module
// ============================================

import { t } from '../i18n/index.js';

export function initDocsModule() {
  document.querySelectorAll('.docs-nav-item').forEach((item) => {
    item.addEventListener('click', () => {
      const target = item.dataset.docsSection;
      document.querySelectorAll('.docs-nav-item').forEach((i) => i.classList.remove('active'));
      item.classList.add('active');
      document.querySelectorAll('.docs-section').forEach((s) => s.classList.remove('active'));
      const section = document.getElementById(`docs-section-${target}`);
      if (section) section.classList.add('active');
    });
  });
}
