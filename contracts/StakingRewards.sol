// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./YieldPool.sol";

/**
 * @title StakingRewards
 * @dev Handles EDU staking for bonus yield
 */

contract StakingRewards is ReentrancyGuard {
    // State variables marked as private
    IERC20 private immutable _eduToken;
    YieldPool private immutable _yieldPool;

    struct Stake {
        uint256 amount;
        uint256 startTime;
    }

    // Private mapping with getter function
    mapping(address => Stake) private _stakes;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);

    constructor(address eduToken, address yieldPoolAddress) {
        _eduToken = IERC20(eduToken);
        _yieldPool = YieldPool(yieldPoolAddress);
    }

    function getEduToken() external view returns (IERC20) {
        return _eduToken;
    }

    function getYieldPool() external view returns (YieldPool) {
        return _yieldPool;
    }

    function getStake(address user) external view returns (Stake memory) {
        return _stakes[user];
    }

    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");

        require(
            _eduToken.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );

        // Using unchecked for gas optimization where overflow is impossible
        unchecked {
            _stakes[msg.sender].amount += amount;
        }

        if (_stakes[msg.sender].startTime == 0) {
            _stakes[msg.sender].startTime = block.timestamp;
        }

        emit Staked(msg.sender, amount);
    }

    function unstake() external nonReentrant {
        Stake memory userStake = _stakes[msg.sender];
        require(userStake.amount > 0, "No stake found");

        uint256 amount = userStake.amount;
        delete _stakes[msg.sender];

        require(_eduToken.transfer(msg.sender, amount), "Transfer failed");

        emit Unstaked(msg.sender, amount);
    }
}
