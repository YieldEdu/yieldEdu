// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title YieldToken
 * @dev Represents token.
 */
contract YieldToken is ERC20, Ownable {
    constructor(
        address initialOwner,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) Ownable(initialOwner) {}

    /**
     * @notice only the owner can mint tokens
     * @param to Address of the candidate
     * @param amount Name of the candidate
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
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
