// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title YieldToken
 * @dev Represents token.
 */
contract YieldToken is ERC20, Ownable {
    // Track last mint time for each address
    mapping(address => uint256) public lastMintTime;
    mapping(address => bool) public isStudent;
    // Add student status tracking
    uint256 public constant MINT_COOLDOWN = 1 days;

    constructor(
        address initialOwner,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) Ownable(initialOwner) {}

    /**
     * @dev Regular minting with cooldown period
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint
     */
    function mint(address to, uint256 amount) external {
        require(
            block.timestamp >= lastMintTime[to] + MINT_COOLDOWN,
            "Must wait 24 hours between mints"
        );
        lastMintTime[to] = block.timestamp;
        _mint(to, amount);
    }

    /**
     * @dev Minting specifically for student rewards
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint
     */
    function mintForStudent(address to, uint256 amount) external {
        require(isStudent[to], "Address must be a student");
        lastMintTime[to] = block.timestamp;
        _mint(to, amount);
    }

    /**
     * @dev Minting specifically for contract rewards
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint
     */
    function InsufficientMint(address to, uint256 amount) external {
        lastMintTime[to] = block.timestamp;
        _mint(to, amount);
    }

    /**
     * @dev Set student status for an address
     * @param student Address of the student
     * @param status True if student, false otherwise
     */
    function setStudentStatus(address student, bool status) external {
        isStudent[student] = status;
    }

    /**
     * @dev Check if address is a  student
     * @param student Address of the student
     */
    function getIsStudent(address student) external view returns (bool) {
        return isStudent[student];
    }

    /**
     * @notice only the owner can burn tokens
     * @param from Address of the candidate
     * @param amount Name of the candidate
     */
    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }
}
