// ============================================
// Contract Interaction Module
// ============================================

import { ethers } from 'ethers';
import { state as walletState } from '../wallet/index.js';

export const CONTRACT_ADDRESS = '0xC3249356a483fbe17d5355D39105D2eA666d9de6';
export const BASESCAN_BASE = 'https://sepolia.basescan.org';
export const OPENSEA_BASE = 'https://testnets.opensea.org/assets/base-sepolia';

// Minimal ABI — adjust to match the actual deployed contract
export const CONTRACT_ABI = [
  // ERC-721 standard
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function tokenURI(uint256 tokenId) view returns (string)',
  'function ownerOf(uint256 tokenId) view returns (address)',
  'function balanceOf(address owner) view returns (uint256)',
  'function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)',

  // POAP-specific
  'function createPoap(string memory _name, string memory _svgData, bool _soulbound, bool _publicMint, string memory _description, string memory _location, string memory _eventDate, string memory _externalUrl) returns (uint256)',
  'function mintPublic(uint256 _poapId, address _recipient) payable',
  'function mintAllowlist(uint256 _poapId, address _recipient, bytes32[] calldata _merkleProof) payable',
  'function mintSignature(uint256 _poapId, address _recipient, uint256 _deadline, bytes calldata _signature) payable',
  'function getPoapCount() view returns (uint256)',
  'function getPoapInfo(uint256 _poapId) view returns (tuple(string name, string svgData, bool soulbound, bool publicMint, string description, string location, string eventDate, string externalUrl, uint256 totalMinted))',
  'function getTokensOfOwner(address owner) view returns (uint256[])',
  'function isSoulbound(uint256 tokenId) view returns (bool)',
  'function getPoapIdByToken(uint256 tokenId) view returns (uint256)',
];

export function getContract(withSigner = false) {
  if (!walletState.provider) return null;
  if (withSigner && !walletState.signer) return null;
  const target = withSigner ? walletState.signer : walletState.provider;
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, target);
}

export function getReadOnlyContract() {
  if (!walletState.provider) {
    // Fallback to a read-only provider via public RPC
    const provider = new ethers.JsonRpcProvider('https://sepolia.base.org');
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  }
  return getContract(false);
}

// --- Read functions ---

export async function getPoapCount() {
  try {
    const contract = getReadOnlyContract();
    if (!contract) return 0;
    const count = await contract.getPoapCount();
    return Number(count);
  } catch (err) {
    console.error('getPoapCount error:', err);
    return 0;
  }
}

export async function getPoapInfo(poapId) {
  try {
    const contract = getReadOnlyContract();
    if (!contract) return null;
    const info = await contract.getPoapInfo(poapId);
    return {
      name: info[0] || info.name || '',
      svgData: info[1] || info.svgData || '',
      soulbound: info[2] ?? info.soulbound ?? false,
      publicMint: info[3] ?? info.publicMint ?? false,
      description: info[4] || info.description || '',
      location: info[5] || info.location || '',
      eventDate: info[6] || info.eventDate || '',
      externalUrl: info[7] || info.externalUrl || '',
      totalMinted: Number(info[8] ?? info.totalMinted ?? 0),
    };
  } catch (err) {
    console.error('getPoapInfo error:', err);
    return null;
  }
}

export async function getTokensOfOwner(address) {
  try {
    const contract = getReadOnlyContract();
    if (!contract) return [];
    const tokens = await contract.getTokensOfOwner(address);
    return tokens.map(Number);
  } catch (err) {
    console.error('getTokensOfOwner error:', err);
    return [];
  }
}

export async function getTokenMetadata(tokenId) {
  try {
    const contract = getReadOnlyContract();
    if (!contract) return null;
    const uri = await contract.tokenURI(tokenId);
    // If it's a data URI, parse it; otherwise fetch
    if (uri.startsWith('data:application/json')) {
      const encoded = uri.split(',')[1];
      const decoded = atob(encoded);
      return JSON.parse(decoded);
    } else if (uri.startsWith('http')) {
      const resp = await fetch(uri);
      return await resp.json();
    }
    // Try base64
    try {
      return JSON.parse(atob(uri));
    } catch {
      return { image: uri, name: `Token #${tokenId}` };
    }
  } catch (err) {
    console.error('getTokenMetadata error:', err);
    return null;
  }
}

export async function getPoapIdByToken(tokenId) {
  try {
    const contract = getReadOnlyContract();
    if (!contract) return null;
    const poapId = await contract.getPoapIdByToken(tokenId);
    return Number(poapId);
  } catch {
    return null;
  }
}

export async function isTokenSoulbound(tokenId) {
  try {
    const contract = getReadOnlyContract();
    if (!contract) return false;
    return await contract.isSoulbound(tokenId);
  } catch {
    return false;
  }
}

// --- Write functions ---

export async function createPoap(params) {
  const contract = getContract(true);
  if (!contract) throw new Error('Wallet not connected');

  const tx = await contract.createPoap(
    params.name,
    params.svgData,
    params.soulbound,
    params.publicMint,
    params.description || '',
    params.location || '',
    params.eventDate || '',
    params.externalUrl || ''
  );

  const receipt = await tx.wait();
  return { hash: tx.hash, receipt };
}

export async function mintPublic(poapId, recipient) {
  const contract = getContract(true);
  if (!contract) throw new Error('Wallet not connected');
  const addr = recipient || walletState.address;
  const tx = await contract.mintPublic(poapId, addr);
  const receipt = await tx.wait();
  return { hash: tx.hash, receipt };
}

export async function mintAllowlist(poapId, recipient, merkleProof) {
  const contract = getContract(true);
  if (!contract) throw new Error('Wallet not connected');
  const addr = recipient || walletState.address;
  const proofArray = merkleProof.split(',').map((p) => p.trim()).filter(Boolean);
  const tx = await contract.mintAllowlist(poapId, addr, proofArray);
  const receipt = await tx.wait();
  return { hash: tx.hash, receipt };
}

export async function mintSignature(poapId, recipient, deadline, signature) {
  const contract = getContract(true);
  if (!contract) throw new Error('Wallet not connected');
  const addr = recipient || walletState.address;
  const tx = await contract.mintSignature(poapId, addr, deadline, signature);
  const receipt = await tx.wait();
  return { hash: tx.hash, receipt };
}

// --- Helpers ---

export function getBaseScanTxUrl(txHash) {
  return `${BASESCAN_BASE}/tx/${txHash}`;
}

export function getBaseScanTokenUrl(tokenId) {
  return `${BASESCAN_BASE}/token/${CONTRACT_ADDRESS}?a=${tokenId}`;
}

export function getOpenSeaUrl(tokenId) {
  return `${OPENSEA_BASE}/${CONTRACT_ADDRESS}/${tokenId}`;
}

// Sign a mint authorization (for creators generating signatures)
export async function signMintAuthorization(poapId, recipient, deadlineDays) {
  if (!walletState.signer) throw new Error('Wallet not connected');
  const deadline = Math.floor(Date.now() / 1000) + (deadlineDays * 86400);
  const domain = {
    name: 'OnchainPOAPs',
    version: '1',
    chainId: 84532,
    verifyingContract: CONTRACT_ADDRESS,
  };
  const types = {
    MintAuthorization: [
      { name: 'poapId', type: 'uint256' },
      { name: 'recipient', type: 'address' },
      { name: 'deadline', type: 'uint256' },
    ],
  };
  const value = {
    poapId: poapId,
    recipient: recipient,
    deadline: deadline,
  };
  const sig = await walletState.signer.signTypedData(domain, types, value);
  return { signature: sig, deadline };
}
