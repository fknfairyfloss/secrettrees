// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title CarbonToken
 * @dev ERC1155 token representing verified carbon sequestration from hemp construction
 * Each token represents 1 tonne of verified CO2 sequestration
 */
contract CarbonToken is ERC1155, AccessControl, ERC1155Supply {
    using Strings for uint256;
    
    // Roles
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    
    // Base URI for token metadata
    string private _baseURI;
    
    // Mapping from token ID to IPFS hash containing verification details
    mapping(uint256 => string) private _tokenMetadataURIs;
    
    // Mapping from token ID to verifier address
    mapping(uint256 => address) private _tokenVerifiers;
    
    // Mapping from token ID to GPS location (encoded as string)
    mapping(uint256 => string) private _tokenLocations;
    
    // Total carbon credits issued
    uint256 private _totalCarbonCredits;
    
    // Token ID tracker
    uint256 private _tokenIdTracker;
    
    // Mapping from token ID to retirement status
    mapping(uint256 => bool) private _retiredTokens;
    
    // Events
    event CarbonTokenMinted(
        uint256 indexed tokenId, 
        uint256 amount, 
        address verifier, 
        string metadataURI, 
        string location
    );
    
    event CarbonTokenRetired(
        uint256 indexed tokenId, 
        uint256 amount, 
        address indexed retiredBy
    );

    /**
     * @dev Constructor for the CarbonToken contract
     * @param initialBaseURI Base URI for token metadata
     */
    constructor(string memory initialBaseURI) ERC1155("") {
        _baseURI = initialBaseURI;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    /**
     * @dev Mint new carbon tokens
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint (1 token = 1 tonne CO2)
     * @param metadataURI IPFS URI containing verification details
     * @param verifier Address of the verifier who validated this carbon sequestration
     * @param location GPS location of the hemp building (encoded as string)
     * @return tokenId ID of the newly minted token
     */
    function mintCarbonToken(
        address to,
        uint256 amount,
        string memory metadataURI,
        address verifier,
        string memory location
    ) 
        external
        onlyRole(MINTER_ROLE) 
        returns (uint256)
    {
        require(amount > 0, "Amount must be greater than 0");
        require(hasRole(VERIFIER_ROLE, verifier), "Invalid verifier");
        
        uint256 newTokenId = _tokenIdTracker;
        _tokenIdTracker++;
        
        _mint(to, newTokenId, amount, "");
        
        _tokenMetadataURIs[newTokenId] = metadataURI;
        _tokenVerifiers[newTokenId] = verifier;
        _tokenLocations[newTokenId] = location;
        
        _totalCarbonCredits += amount;
        
        emit CarbonTokenMinted(newTokenId, amount, verifier, metadataURI, location);
        
        return newTokenId;
    }
    
    /**
     * @dev Retire carbon tokens (mark as used for offsetting)
     * @param tokenId Token ID to retire
     * @param amount Amount to retire
     */
    function retireTokens(uint256 tokenId, uint256 amount) external {
        require(balanceOf(msg.sender, tokenId) >= amount, "Insufficient balance");
        require(!_retiredTokens[tokenId], "Token already retired");
        require(amount > 0, "Amount must be greater than 0");
        
        _burn(msg.sender, tokenId, amount);
        _retiredTokens[tokenId] = true;
        
        emit CarbonTokenRetired(tokenId, amount, msg.sender);
    }
    
    /**
     * @dev Get metadata URI for a specific token
     * @param tokenId Token ID to query
     * @return Token metadata URI
     */
    function uri(uint256 tokenId) public view override returns (string memory) {
        require(exists(tokenId), "URI query for nonexistent token");
        
        string memory tokenURI = _tokenMetadataURIs[tokenId];
        
        // If there's no specific metadata URI, use the tokenId with the base URI
        if (bytes(tokenURI).length == 0) {
            return string(abi.encodePacked(_baseURI, tokenId.toString()));
        }
        
        return tokenURI;
    }
    
    /**
     * @dev Set the base URI for all tokens
     * @param newBaseURI New base URI
     */
    function setBaseURI(string memory newBaseURI) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _baseURI = newBaseURI;
    }
    
    /**
     * @dev Get verifier for a specific token
     * @param tokenId Token ID to query
     * @return Verifier address
     */
    function getTokenVerifier(uint256 tokenId) external view returns (address) {
        require(exists(tokenId), "Query for nonexistent token");
        return _tokenVerifiers[tokenId];
    }
    
    /**
     * @dev Get location for a specific token
     * @param tokenId Token ID to query
     * @return Location string
     */
    function getTokenLocation(uint256 tokenId) external view returns (string memory) {
        require(exists(tokenId), "Query for nonexistent token");
        return _tokenLocations[tokenId];
    }
    
    /**
     * @dev Check if a token has been retired
     * @param tokenId Token ID to query
     * @return Retirement status
     */
    function isTokenRetired(uint256 tokenId) external view returns (bool) {
        require(exists(tokenId), "Query for nonexistent token");
        return _retiredTokens[tokenId];
    }
    
    /**
     * @dev Get total carbon credits issued
     * @return Total amount of carbon credits
     */
    function totalCarbonCredits() external view returns (uint256) {
        return _totalCarbonCredits;
    }
    
    /**
     * @dev Add a new verifier
     * @param verifier Address of the verifier to add
     */
    function addVerifier(address verifier) external onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(VERIFIER_ROLE, verifier);
    }
    
    /**
     * @dev Remove a verifier
     * @param verifier Address of the verifier to remove
     */
    function removeVerifier(address verifier) external onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(VERIFIER_ROLE, verifier);
    }
    
    /**
     * @dev Add a new minter
     * @param minter Address of the minter to add
     */
    function addMinter(address minter) external onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(MINTER_ROLE, minter);
    }
    
    // The following functions are overrides required by Solidity
    
    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    ) internal override(ERC1155, ERC1155Supply) {
        super._update(from, to, ids, values);
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
} 