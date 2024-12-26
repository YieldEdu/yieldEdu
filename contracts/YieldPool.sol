// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./YieldToken.sol";

/**
 * @title YieldPool
 * @dev manages deposits and yield generation
 */
contract YieldPool is ReentrancyGuard {
    IERC20 private immutable _eduToken;
    YieldToken private immutable _yieldToken;
    uint256 private constant YIELD_RATE = 10;
    uint256 private constant YEAR = 365 days;
    uint256 private constant MIN_DURATION = 7 days;
    uint256 private constant MAX_DURATION = 365 days;

    struct Position {
        uint256 amount;
        uint256 startTime;
        uint256 lockDuration;
    }

    mapping(address => Position) private _positions;

    // Events
    event Deposited(address indexed user, uint256 amount, uint256 duration);
    event Withdrawn(address indexed user, uint256 amount, uint256 yield);

    constructor(
        address eduTokenAddress, // This should be the address of the EDU token contract
        string memory _tokenName,
        string memory _tokenSymbol
    ) {
        _eduToken = IERC20(eduTokenAddress); // Initialize with the EDU token contract address
        _yieldToken = new YieldToken(address(this), _tokenName, _tokenSymbol);
    }

    function getEduToken() external view returns (IERC20) {
        return _eduToken;
    }

    function getYieldToken() external view returns (YieldToken) {
        return _yieldToken;
    }

    function getPosition(address user) external view returns (Position memory) {
        return _positions[user];
    }

    /**
     * @notice Deposits tokens into the yield pool.
     * @param amount The amount of tokens to deposit.
     * @param duration The lock duration for the deposit.
     */
    function deposit(uint256 amount, uint256 duration) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(duration > 0, "Duration must be greater than 0");

        _eduToken.transferFrom(msg.sender, address(this), amount);

        _positions[msg.sender] = Position({
            amount: amount,
            startTime: block.timestamp,
            lockDuration: duration
        });

        uint256 yieldTokenAmount = calculateYieldTokens(amount, duration);
        _yieldToken.mint(msg.sender, yieldTokenAmount);

        emit Deposited(msg.sender, amount, duration);
    }

    /**
     * @notice Withdraws tokens from the yield pool.
     */
    function withdraw() external nonReentrant {
        Position memory position = _positions[msg.sender];
        require(position.amount > 0, "No position found");
        require(
            block.timestamp >= position.startTime + position.lockDuration,
            "Still locked"
        );

        uint256 yieldAmount = calculateYield(position);
        uint256 totalAmount;

        // Using unchecked for gas optimization where overflow is impossible
        unchecked {
            totalAmount = position.amount + yieldAmount;
        }

        require(
            _eduToken.balanceOf(address(this)) >= totalAmount,
            "Insufficient funds in pool"
        );

        delete _positions[msg.sender];
        _eduToken.transfer(msg.sender, totalAmount);

        emit Withdrawn(msg.sender, totalAmount, yieldAmount);
    }

    function calculateYieldTokens(
        uint256 amount,
        uint256 duration
    ) public pure returns (uint256) {
        // unchecked for gas optimization where overflow is impossible
        unchecked {
            return (amount * duration * YIELD_RATE) / (YEAR * 100);
        }
    }

    function calculateYield(
        Position memory position
    ) public pure returns (uint256) {
        unchecked {
            return
                (position.amount * position.lockDuration * YIELD_RATE) /
                (YEAR * 100);
        }
    }
}
