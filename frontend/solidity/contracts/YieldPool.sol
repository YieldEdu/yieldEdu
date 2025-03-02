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
    mapping(address => uint256) private _activePositionsCount;

    address[] private _activeStakers;
    mapping(address => uint256) private _stakerIndex;

    // one position per address
    struct Position {
        address positionAddress;
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

    function getActivePositions()
        external
        view
        returns (Position[] memory positions)
    {
        uint256 totalPositions = 0;
        // count active non-withdrawn positions
        for (uint i = 0; i < _activeStakers.length; i++) {
            Position[] memory userPositions = _positions[_activeStakers[i]];
            for (uint j = 0; j < userPositions.length; j++) {
                if (!userPositions[j].withdrawn) {
                    totalPositions++;
                }
            }
        }

        positions = new Position[](totalPositions);
        uint256 currentIndex = 0;

        //  collect all active positions
        for (uint i = 0; i < _activeStakers.length; i++) {
            Position[] memory userPositions = _positions[_activeStakers[i]];
            for (uint j = 0; j < userPositions.length; j++) {
                if (!userPositions[j].withdrawn) {
                    positions[currentIndex] = userPositions[j];
                    currentIndex++;
                }
            }
        }

        return positions;
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

        require(
            _eduToken.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );

        // Update TVL
        unchecked {
            _totalValueLocked += amount;
        }

        // Update active positions
        if (_positions[msg.sender].length == 0) {
            _stakerIndex[msg.sender] = _activeStakers.length;
            _activeStakers.push(msg.sender);
            _totalStakers++;
        }

        // Create and add new position
        uint256 positionId = _nextPositionId++;
        Position memory newPosition = Position({
            positionAddress: msg.sender,
            id: positionId,
            amount: amount,
            startTime: block.timestamp,
            lockDuration: duration,
            withdrawn: false
        });

        _positions[msg.sender].push(newPosition);
        _positionOwners[positionId] = msg.sender;
        _activePositionsCount[msg.sender]++;

        emit Deposited(msg.sender, amount, duration);
    }

    /**
     * @notice withdraw tokens from the yield pool.
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

        // Check if there are enough tokens in the pool
        uint256 poolBalance = _eduToken.balanceOf(address(this));
        if (poolBalance < totalAmount) {
            // Calculate how much we can pay from pool and how much to mint
            uint256 amountToMint = totalAmount - poolBalance;

            // First we transfer whatever is available in the pool
            if (poolBalance > 0) {
                require(
                    _eduToken.transfer(msg.sender, poolBalance),
                    "Pool transfer failed"
                );
            }

            // Then mint the remaining amount as yield tokens
            _yieldToken.InsufficientMint(msg.sender, amountToMint);
        } else {
            // If enough tokens in pool, transfer normally
            require(
                _eduToken.transfer(msg.sender, totalAmount),
                "Transfer failed"
            );
        }

        unchecked {
            _totalValueLocked -= position.amount;
        }

        // Remove position by swapping with last element and popping
        uint256 lastPositionIndex = userPositions.length - 1;
        if (positionIndex != lastPositionIndex) {
            userPositions[positionIndex] = userPositions[lastPositionIndex];
        }
        userPositions.pop();

        delete _positionOwners[positionId];
        _activePositionsCount[msg.sender]--;

        // Only remove from active stakers if no positions left
        if (userPositions.length == 0) {
            uint256 lastIndex = _activeStakers.length - 1;
            address lastStaker = _activeStakers[lastIndex];

            if (msg.sender != lastStaker) {
                uint256 stakerIndex = _stakerIndex[msg.sender];
                _activeStakers[stakerIndex] = lastStaker;
                _stakerIndex[lastStaker] = stakerIndex;
            }

            _activeStakers.pop();
            _totalStakers--;
        }

        emit Withdrawn(msg.sender, totalAmount, yieldAmount);
    }

    /**
     * @notice Unstake tokens from the yield pool with penalty if before lock duration.
     */
    function unstake(uint256 positionId) external nonReentrant {
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

        uint256 amountToReturn = position.amount;

        // 10% penalty if unstaking before lock duration
        if (block.timestamp < position.startTime + position.lockDuration) {
            uint256 penalty = position.amount / 10; // 10% penalty
            amountToReturn = position.amount - penalty;
        }

        require(
            _eduToken.balanceOf(address(this)) >= amountToReturn,
            "Insufficient funds in pool"
        );

        unchecked {
            _totalValueLocked -= position.amount;
        }

        // Remove position by swapping with last element and pop
        uint256 lastPositionIndex = userPositions.length - 1;
        if (positionIndex != lastPositionIndex) {
            userPositions[positionIndex] = userPositions[lastPositionIndex];
        }
        userPositions.pop();

        delete _positionOwners[positionId];
        _activePositionsCount[msg.sender]--;

        // remove from active stakers if no positions is left
        if (userPositions.length == 0) {
            uint256 lastIndex = _activeStakers.length - 1;
            address lastStaker = _activeStakers[lastIndex];

            if (msg.sender != lastStaker) {
                uint256 stakerIndex = _stakerIndex[msg.sender];
                _activeStakers[stakerIndex] = lastStaker;
                _stakerIndex[lastStaker] = stakerIndex;
            }

            _activeStakers.pop();
            _totalStakers--;
        }

        _eduToken.transfer(msg.sender, amountToReturn);

        emit Withdrawn(msg.sender, amountToReturn, 0);
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
