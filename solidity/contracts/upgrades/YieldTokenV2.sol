// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract YieldTokenV2 is
    Initializable,
    ERC20Upgradeable,
    OwnableUpgradeable,
    ReentrancyGuardUpgradeable,
    UUPSUpgradeable
{
    using SafeERC20 for IERC20;

    // Track last mint time for each address
    mapping(address => uint256) public lastMintTime;
    mapping(address => bool) public isStudent;
    mapping(address => bool) public isMinter;
    address[] minters;
    // Add student status tracking
    uint256 public constant MINT_COOLDOWN = 1 days;

    /// @custom:oz-upgrades-unsafe-allow constructor
    event MinterSet(address account, bool status);
    // Event for tracking mints
    event TokensMinted(
        address indexed to,
        uint256 amount,
        address indexed minter
    );

    // Custom error for unauthorized minting
    error UnauthorizedMinter(address caller);
    error ZeroAddressMint();

    constructor() {
        _disableInitializers();
    }

    function initialize(
        string memory _name,
        string memory _symbol,
        address _adminOwner
    ) public initializer {
        __ERC20_init(_name, _symbol);
        __Ownable_init(_adminOwner);
        __ReentrancyGuard_init();
        __UUPSUpgradeable_init();
    }

    function setMinter(address account, bool status) external onlyOwner {
        isMinter[account] = status;
        minters.push(account);
        emit MinterSet(account, status);
    }

    function removeMinter(address account) public onlyOwner {
        require(account != address(0), "Invalid address");
        require(isMinter[account], "Address is not a minter");

        // delete instead of setting to false
        delete isMinter[account];

        // Remove from array
        for (uint256 i = 0; i < minters.length; i++) {
            if (minters[i] == account) {
                minters[i] = minters[minters.length - 1];
                minters.pop();
                break;
            }
        }

        emit MinterSet(account, false);
    }

    function getMinters() public view onlyOwner returns (address[] memory) {
        return minters;
    }

    /**
     * @notice Mints new tokens to a specified address
     * @dev Only owner or approved minters can call this function
     * @param to Address to receive the minted tokens
     * @param amount Amount of tokens to mint
     */
    function mint(address to, uint256 amount) public {
        // Check for zero address
        if (to == address(0)) revert ZeroAddressMint();

        // Check if caller is authorized to mint
        if (msg.sender != owner() && !isMinter[msg.sender]) {
            revert UnauthorizedMinter(msg.sender);
        }

        _mint(to, amount);
        emit TokensMinted(to, amount, msg.sender);
    }

    function mintToPool(address _yieldPoolAddress) public onlyOwner {
        _mint(_yieldPoolAddress, 10_000_000 * 10 ** 18);
        emit TokensMinted(_yieldPoolAddress, 10_000_000 * 10 ** 18, msg.sender);
    }

    /**
     * @dev Set student status for an address
     * @param student Address of the student
     * @param status True if student, false otherwise
     */
    function setStudentStatus(address student, bool status) external onlyOwner {
        isStudent[student] = status;
    }

    /**
     * @dev Check if address is a student
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

    /**
     * @dev Function that should revert when `msg.sender` is not authorized to upgrade the contract.
     * Required by the UUPSUpgradeable contract.
     */
    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}
}
