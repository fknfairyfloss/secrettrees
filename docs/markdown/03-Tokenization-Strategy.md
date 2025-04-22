# Blockchain Tokenization Strategy

## Purpose

This document outlines the blockchain framework used to tokenize carbon sequestration outputs from Secret Trees' hempcrete buildings, ensuring traceability, transparency, and regulatory alignment across the EU.

## Token Design

- **Token Standard**: ERC-1155 (Multi-token standard)
- **Represents**: 1 tonne of verified CO₂ sequestration per token
- **Batch minting**: Linked to verification events
- **Metadata includes**:
  - Project ID
  - Verifier + methodology
  - GPS + timestamps
  - Batch quantity + lifecycle data

### Utility Token Classification

- Non-fungible batches, but each token is standardized for registry
- Designed to meet EU's MiCA definition of a utility token
- Token is not a financial instrument, as no expectation of profit from others' efforts (MiCA Article 3)

## Smart Contract Architecture

### Platform: Polygon PoS (Ethereum Layer 2)

- Low energy footprint
- EVM-compatible
- Fast, cheap transactions

### Contract Logic:

Smart contract manages lifecycle of carbon tokens:

- `mintCarbonToken()` after verification batch approval
- `retireToken()` for ESG buyers and final carbon retirement
- `transfer()` enables transparent exchange of unused tokens
- IPFS integration for Ricardian contract & third-party verifier evidence
- Admin roles for verifier, DAO, and token owner

## Ricardian Contracts

Each verification batch is linked to a Ricardian contract:

- Includes legal verification agreement
- Full metadata and carbon methodology
- IPFS-hosted hash linked on-chain
- Ensures legal enforceability of environmental claims

## Regulatory Compliance

| Regulation | Status | Notes |
|------------|--------|-------|
| MiCA | ✅ Aligned | Utility token, not financial security |
| EU Taxonomy | ✅ Aligned | Project eligible under climate mitigation activity |
| SFDR | ✅ Suitable | Tokens support Article 9 ESG disclosure |
| GDPR | ✅ Enforced | No personal data stored on-chain |

## Token Use Cases

- **ESG Credits**: Verified carbon retirement for corporate sustainability reports
- **Eco-tourism Access**: Token holders get discounts or early access to Secret Trees cottages
- **Governance**: Participate in DAO decision-making (future roadmap)
- **Impact Proof**: Tokens link to dashboard showing real-time sequestration

## Token Lifecycle

1. Hemp-lime construction completed ✅
2. Verification logged and signed off ✅
3. Ricardian contract + data hash generated ✅
4. ERC-1155 tokens minted on Polygon ✅
5. Tokens distributed to investors / buyers ✅
6. Option to trade or retire with proof-of-impact ✅

See also: [[01-Carbon-Methodology]] | [[04-Legal-Compliance]] | [[07-AI-Automation]] 