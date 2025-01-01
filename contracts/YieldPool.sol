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
    uint256 private constant MIN_DURATION = 1 days;
    uint256 private constant MAX_DURATION = 365 days;
    uint256 private _totalStakers;
    uint256 private _totalValueLocked;
    uint256 private _nextPositionId = 1;
    mapping(address => bool) private _hasStaked;

    address[] private _activeStakers;
    mapping(address => uint256) private _stakerIndex;

    // Only one position per address
    struct Position {
        uint256 id;
        uint256 amount;
        uint256 startTime;
        uint256 lockDuration;
        bool withdrawn;
    }

    mapping(address => Position[]) private _positions;
    mapping(uint256 => address) private _positionOwners;

    // Events
    event Deposited(address indexed user, uint256 amount, uint256 duration);
    event Withdrawn(address indexed user, uint256 amount, uint256 yield);

    constructor(
        address eduTokenAddress,
        string memory _tokenName,
        string memory _tokenSymbol
    ) {
        _eduToken = IERC20(eduTokenAddress);
        _yieldToken = new YieldToken(address(this), _tokenName, _tokenSymbol);
    }

    function getEduToken() external view returns (IERC20) {
        return _eduToken;
    }

    function getYieldToken() external view returns (YieldToken) {
        return _yieldToken;
    }

    function getPositions(
        address user
    ) external view returns (Position[] memory) {
        return _positions[user];
    }

    function getPosition(
        uint256 positionId
    ) external view returns (Position memory) {
        address owner = _positionOwners[positionId];
        Position[] memory userPositions = _positions[owner];
        for (uint i = 0; i < userPositions.length; i++) {
            if (userPositions[i].id == positionId) {
                return userPositions[i];
            }
        }
        revert("Position not found");
    }

    function getTotalStakers() external view returns (uint256) {
        return _totalStakers;
    }

    function getTotalValueLocked() external view returns (uint256) {
        return _totalValueLocked;
    }

    // function to get active positions
    function getActivePositions()
        external
        view
        returns (address[] memory stakers, Position[] memory positions)
    {
        stakers = _activeStakers;
        positions = new Position[](_activeStakers.length);

        for (uint i = 0; i < _activeStakers.length; i++) {
            positions[i] = _positions[_activeStakers[i]][0];
        }

        return (stakers, positions);
    }

    /**
     * @notice Deposits tokens into the yield pool.
     * @param amount The amount of tokens to deposit.
     * @param duration The lock duration for the deposit.
     */
    function deposit(uint256 amount, uint256 duration) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(
            duration >= MIN_DURATION && duration <= MAX_DURATION,
            "Invalid duration"
        );

        // Transfer tokens from user to contract
        require(
            _eduToken.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );

        // Update TVL
        unchecked {
            _totalValueLocked += amount;
        }

        // Create new position with unique ID
        uint256 positionId = _nextPositionId++;
        Position memory newPosition = Position({
            id: positionId,
            amount: amount,
            startTime: block.timestamp,
            lockDuration: duration,
            withdrawn: false
        });

        // Add to user's positions
        _positions[msg.sender].push(newPosition);
        _positionOwners[positionId] = msg.sender;

        if (!_hasStaked[msg.sender]) {
            _hasStaked[msg.sender] = true;
            _stakerIndex[msg.sender] = _activeStakers.length;
            _activeStakers.push(msg.sender);
            _totalStakers++;
        }

        uint256 yieldTokenAmount = calculateYieldTokens(amount, duration);
        _yieldToken.mint(msg.sender, yieldTokenAmount);

        emit Deposited(msg.sender, amount, duration);
    }

    /**
     * @notice Withdraws tokens from the yield pool.
     */
    function withdraw(uint256 positionId) external nonReentrant {
        require(
            _positionOwners[positionId] == msg.sender,
            "Not position owner"
        );

        Position[] storage userPositions = _positions[msg.sender];
        uint256 positionIndex;
        bool found;

        for (uint i = 0; i < userPositions.length; i++) {
            if (userPositions[i].id == positionId) {
                positionIndex = i;
                found = true;
                break;
            }
        }

        require(found, "Position not found");
        Position storage position = userPositions[positionIndex];
        require(!position.withdrawn, "Already withdrawn");
        require(
            block.timestamp >= position.startTime + position.lockDuration,
            "Still locked"
        );

        uint256 yieldAmount = calculateYield(position);
        uint256 totalAmount;

        unchecked {
            totalAmount = position.amount + yieldAmount;
        }

        require(
            _eduToken.balanceOf(address(this)) >= totalAmount,
            "Insufficient funds in pool"
        );

        // Update TVL before transfer
        unchecked {
            _totalValueLocked -= position.amount;
        }

        position.withdrawn = true;
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
