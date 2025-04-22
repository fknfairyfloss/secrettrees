// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/**
 * @title RicardianContract
 * @dev Contract to manage Ricardian contracts for carbon credit verification
 * Links on-chain tokens with legal verification documents stored on IPFS
 */
contract RicardianContract is AccessControl {
    using ECDSA for bytes32;

    // Roles
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");
    
    // Struct to store verification details
    struct Verification {
        uint256 tokenId;         // Reference to the CarbonToken ID
        string ipfsHash;         // IPFS hash of the verification document
        string metadataURI;      // URI to the metadata about the verification
        string projectId;        // Project identifier
        address verifier;        // Address of the verifier
        uint256 timestamp;       // Time of verification
        bytes signature;         // Verifier's signature
        bool isValid;            // Validity status
    }
    
    // Mapping from verification ID to Verification struct
    mapping(bytes32 => Verification) private _verifications;
    
    // Array to store all verification IDs
    bytes32[] private _verificationIds;
    
    // Events
    event VerificationAdded(
        bytes32 indexed verificationId,
        uint256 indexed tokenId,
        string ipfsHash,
        address verifier,
        uint256 timestamp
    );
    
    event VerificationInvalidated(
        bytes32 indexed verificationId,
        address invalidator,
        uint256 timestamp
    );

    /**
     * @dev Constructor for the RicardianContract
     */
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }
    
    /**
     * @dev Add a new verification record
     * @param tokenId Reference to the CarbonToken ID
     * @param ipfsHash IPFS hash of the verification document
     * @param metadataURI URI to the metadata about the verification
     * @param projectId Project identifier
     * @param signature Verifier's signature
     * @return verificationId ID of the newly added verification
     */
    function addVerification(
        uint256 tokenId,
        string memory ipfsHash,
        string memory metadataURI,
        string memory projectId,
        bytes memory signature
    ) 
        external
        onlyRole(VERIFIER_ROLE)
        returns (bytes32)
    {
        // Create a hash of the verification data
        bytes32 verificationId = keccak256(
            abi.encodePacked(
                tokenId,
                ipfsHash,
                metadataURI,
                projectId,
                msg.sender,
                block.timestamp
            )
        );
        
        // Ensure this verification doesn't already exist
        require(_verifications[verificationId].timestamp == 0, "Verification already exists");
        
        // Verify the signature
        bytes32 messageHash = keccak256(
            abi.encodePacked(
                tokenId,
                ipfsHash,
                metadataURI,
                projectId
            )
        );
        bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
        address signer = ethSignedMessageHash.recover(signature);
        
        // Ensure the signer is the caller or a valid verifier
        require(
            signer == msg.sender || hasRole(VERIFIER_ROLE, signer),
            "Invalid signature"
        );
        
        // Store the verification
        _verifications[verificationId] = Verification({
            tokenId: tokenId,
            ipfsHash: ipfsHash,
            metadataURI: metadataURI,
            projectId: projectId,
            verifier: msg.sender,
            timestamp: block.timestamp,
            signature: signature,
            isValid: true
        });
        
        // Add the verification ID to the array
        _verificationIds.push(verificationId);
        
        emit VerificationAdded(
            verificationId,
            tokenId,
            ipfsHash,
            msg.sender,
            block.timestamp
        );
        
        return verificationId;
    }
    
    /**
     * @dev Invalidate a verification record
     * @param verificationId ID of the verification to invalidate
     */
    function invalidateVerification(bytes32 verificationId) 
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        // Ensure the verification exists and is valid
        require(_verifications[verificationId].timestamp > 0, "Verification does not exist");
        require(_verifications[verificationId].isValid, "Verification already invalidated");
        
        // Invalidate the verification
        _verifications[verificationId].isValid = false;
        
        emit VerificationInvalidated(
            verificationId,
            msg.sender,
            block.timestamp
        );
    }
    
    /**
     * @dev Get verification details
     * @param verificationId ID of the verification to query
     * @return Verification struct containing all verification details
     */
    function getVerification(bytes32 verificationId) 
        external
        view
        returns (Verification memory)
    {
        // Ensure the verification exists
        require(_verifications[verificationId].timestamp > 0, "Verification does not exist");
        
        return _verifications[verificationId];
    }
    
    /**
     * @dev Check if a verification is valid
     * @param verificationId ID of the verification to check
     * @return Validity status
     */
    function isVerificationValid(bytes32 verificationId) 
        external
        view
        returns (bool)
    {
        // Ensure the verification exists
        require(_verifications[verificationId].timestamp > 0, "Verification does not exist");
        
        return _verifications[verificationId].isValid;
    }
    
    /**
     * @dev Get all verification IDs
     * @return Array of all verification IDs
     */
    function getAllVerificationIds() 
        external
        view
        returns (bytes32[] memory)
    {
        return _verificationIds;
    }
    
    /**
     * @dev Get verification IDs for a specific token
     * @param tokenId Token ID to query
     * @return Array of verification IDs for the specified token
     */
    function getVerificationIdsForToken(uint256 tokenId) 
        external
        view
        returns (bytes32[] memory)
    {
        // Count the number of verifications for this token
        uint256 count = 0;
        for (uint256 i = 0; i < _verificationIds.length; i++) {
            if (_verifications[_verificationIds[i]].tokenId == tokenId) {
                count++;
            }
        }
        
        // Create an array of verification IDs for this token
        bytes32[] memory tokenVerificationIds = new bytes32[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < _verificationIds.length; i++) {
            if (_verifications[_verificationIds[i]].tokenId == tokenId) {
                tokenVerificationIds[index] = _verificationIds[i];
                index++;
            }
        }
        
        return tokenVerificationIds;
    }
    
    /**
     * @dev Add a new verifier
     * @param verifier Address of the verifier to add
     */
    function addVerifier(address verifier) 
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        grantRole(VERIFIER_ROLE, verifier);
    }
    
    /**
     * @dev Remove a verifier
     * @param verifier Address of the verifier to remove
     */
    function removeVerifier(address verifier) 
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        revokeRole(VERIFIER_ROLE, verifier);
    }
} 