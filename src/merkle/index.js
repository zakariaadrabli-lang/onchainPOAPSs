// ============================================
// Merkle Tree Implementation (client-side)
// ============================================

import { ethers } from 'ethers';

// Simple Merkle Tree using keccak256
export class MerkleTree {
  constructor(leaves) {
    this.leaves = leaves.map((leaf) => {
      if (typeof leaf === 'string') {
        // Normalize address to lowercase, then hash
        const normalized = leaf.toLowerCase().trim();
        return ethers.solidityPackedKeccak256(['address'], [normalized]);
      }
      return leaf;
    });
    this.layers = [this.leaves];
    this.build();
  }

  build() {
    let current = this.leaves;
    while (current.length > 1) {
      const next = [];
      for (let i = 0; i < current.length; i += 2) {
        const left = current[i];
        const right = i + 1 < current.length ? current[i + 1] : current[i];
        // Sort pair to ensure deterministic ordering
        const [a, b] = left <= right ? [left, right] : [right, left];
        next.push(ethers.keccak256(ethers.concat([a, b])));
      }
      this.layers.push(next);
      current = next;
    }
  }

  getRoot() {
    if (this.layers.length === 0) return ethers.ZeroHash;
    const last = this.layers[this.layers.length - 1];
    return last[0] || ethers.ZeroHash;
  }

  getProof(index) {
    const proof = [];
    let idx = index;
    for (let i = 0; i < this.layers.length - 1; i++) {
      const layer = this.layers[i];
      const siblingIdx = idx % 2 === 0 ? idx + 1 : idx - 1;
      if (siblingIdx < layer.length) {
        proof.push(layer[siblingIdx]);
      }
      idx = Math.floor(idx / 2);
    }
    return proof;
  }

  getProofForAddress(address) {
    const normalized = address.toLowerCase().trim();
    const leaf = ethers.solidityPackedKeccak256(['address'], [normalized]);
    const idx = this.leaves.indexOf(leaf);
    if (idx === -1) return null;
    return this.getProof(idx);
  }

  verify(proof, leaf, root) {
    let computed = leaf;
    for (const sibling of proof) {
      const [a, b] = computed <= sibling ? [computed, sibling] : [sibling, computed];
      computed = ethers.keccak256(ethers.concat([a, b]));
    }
    return computed === root;
  }
}

// Parse addresses from textarea input
export function parseAddresses(text) {
  return text
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .filter((s) => ethers.isAddress(s));
}

// Generate full merkle data
export function generateMerkleData(addresses) {
  const tree = new MerkleTree(addresses);
  const root = tree.getRoot();
  const proofs = {};
  addresses.forEach((addr, i) => {
    const proof = tree.getProof(i);
    proofs[addr.toLowerCase()] = proof;
  });
  return { root, proofs, tree, count: addresses.length };
}
