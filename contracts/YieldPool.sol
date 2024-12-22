// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
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

    constructor(address eduToken, string memory _name, string memory _symbol) {
        _eduToken = IERC20(eduToken);
        _yieldToken = new YieldToken(msg.sender, _name, _symbol);
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

    function deposit(uint256 amount, uint256 duration) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(duration >= MIN_DURATION, "Min duration is 7 days");
        require(duration <= MAX_DURATION, "Max duration is 365 days");

        unchecked {
            require(
                _eduToken.transferFrom(msg.sender, address(this), amount),
                "Transfer failed"
            );

            _positions[msg.sender] = Position({
                amount: amount,
                startTime: block.timestamp,
                lockDuration: duration
            });

            uint256 yieldTokenAmount = calculateYieldTokens(amount, duration);
            _yieldToken.mint(msg.sender, yieldTokenAmount);

            emit Deposited(msg.sender, amount, duration);
        }
    }

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

        _yieldToken.burn(
            msg.sender,
            calculateYieldTokens(position.amount, position.lockDuration)
        );

        require(_eduToken.transfer(msg.sender, totalAmount), "Transfer failed");

        emit Withdrawn(msg.sender, position.amount, yieldAmount);
    }

    function calculateYieldTokens(
        uint256 amount,
        uint256 duration
    ) public pure returns (uint256) {
        // Using unchecked for gas optimization where overflow is impossible
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
