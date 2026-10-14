// ============================================
// Wallet Connection Module — MetaMask EIP-1193
// ============================================

import { ethers } from 'ethers';
import { t } from '../i18n/index.js';

export const state = {
  provider: null,
  signer: null,
  address: null,
  chainId: null,
  connected: false,
};

const BASE_SEPOLIA_CHAIN_ID = 84532;
const BASE_SEPOLIA_PARAMS = {
  chainId: '0x14a34',
  chainName: 'Base Sepolia',
  nativeCurrency: { name: 'Sepolia ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: ['https://sepolia.base.org'],
  blockExplorerUrls: ['https://sepolia.basescan.org'],
};

export async function connectWallet() {
  if (typeof window.ethereum === 'undefined') {
    showToast(t('toast.wallet.notfound'), 'error');
    return false;
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (!accounts || accounts.length === 0) return false;

    state.provider = new ethers.BrowserProvider(window.ethereum);
    state.signer = await state.provider.getSigner();
    state.address = accounts[0];
    state.connected = true;

    const network = await state.provider.getNetwork();
    state.chainId = Number(network.chainId);

    if (state.chainId !== BASE_SEPOLIA_CHAIN_ID) {
      await switchToBaseSepolia();
    }

    // Listen for account changes
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    updateWalletUI();
    return true;
  } catch (err) {
    console.error('Wallet connect error:', err);
    return false;
  }
}

export async function switchToBaseSepolia() {
  if (!window.ethereum) return false;
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: BASE_SEPOLIA_PARAMS.chainId }],
    });
    const network = await state.provider.getNetwork();
    state.chainId = Number(network.chainId);
    updateWalletUI();
    return true;
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [BASE_SEPOLIA_PARAMS],
        });
        const network = await state.provider.getNetwork();
        state.chainId = Number(network.chainId);
        updateWalletUI();
        return true;
      } catch (addError) {
        console.error('Add chain error:', addError);
        return false;
      }
    }
    console.error('Switch chain error:', switchError);
    return false;
  }
}

function handleAccountsChanged(accounts) {
  if (!accounts || accounts.length === 0) {
    disconnectWallet();
  } else {
    state.address = accounts[0];
    updateWalletUI();
    window.dispatchEvent(new CustomEvent('walletChanged', { detail: state }));
  }
}

function handleChainChanged() {
  window.location.reload();
}

export function disconnectWallet() {
  state.provider = null;
  state.signer = null;
  state.address = null;
  state.chainId = null;
  state.connected = false;
  updateWalletUI();
  window.dispatchEvent(new CustomEvent('walletChanged', { detail: state }));
}

export function updateWalletUI() {
  const btn = document.getElementById('wallet-btn');
  if (!btn) return;

  if (state.connected && state.address) {
    btn.classList.add('connected');
    btn.innerHTML = `
      <span class="wallet-dot"></span>
      <span>${shortenAddress(state.address)}</span>
    `;
  } else {
    btn.classList.remove('connected');
    btn.innerHTML = `<span>${t('header.connect')}</span>`;
  }

  const networkPill = document.getElementById('network-pill');
  if (networkPill) {
    if (state.connected) {
      networkPill.classList.add('connected');
      const dot = networkPill.querySelector('.dot');
      if (dot) {
        dot.style.background = state.chainId === BASE_SEPOLIA_CHAIN_ID ? 'var(--c-success)' : 'var(--c-error)';
      }
    } else {
      networkPill.classList.remove('connected');
    }
  }
}

export function shortenAddress(addr) {
  if (!addr) return '';
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function isCorrectNetwork() {
  return state.chainId === BASE_SEPOLIA_CHAIN_ID;
}

// Simple toast for wallet module
function showToast(msg, type = 'info') {
  window.dispatchEvent(new CustomEvent('showToast', { detail: { message: msg, type } }));
}

export { BASE_SEPOLIA_CHAIN_ID };
