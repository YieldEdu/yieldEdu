/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  YieldTokenV2,
  YieldTokenV2Interface,
} from "../../../contracts/upgrades/YieldTokenV2";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "ERC1967InvalidImplementation",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC1967NonPayable",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedCall",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    inputs: [],
    name: "UUPSUnauthorizedCallContext",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "slot",
        type: "bytes32",
      },
    ],
    name: "UUPSUnsupportedProxiableUUID",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "UnauthorizedMinter",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroAddressMint",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "MinterSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "minter",
        type: "address",
      },
    ],
    name: "TokensMinted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "MINT_COOLDOWN",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UPGRADE_INTERFACE_VERSION",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "student",
        type: "address",
      },
    ],
    name: "getIsStudent",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMinters",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "address",
        name: "_adminOwner",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isMinter",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isStudent",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastMintTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_yieldPoolAddress",
        type: "address",
      },
    ],
    name: "mintToPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "removeMinter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "setMinter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "student",
        type: "address",
      },
      {
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "setStudentStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a06040523060805234801561001457600080fd5b5061001d610022565b6100d4565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a00805468010000000000000000900460ff16156100725760405163f92ee8a960e01b815260040160405180910390fd5b80546001600160401b03908116146100d15780546001600160401b0319166001600160401b0390811782556040519081527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b50565b608051611c296100fd60003960008181610f8101528181610faa01526110eb0152611c296000f3fe6080604052600436106101b75760003560e01c8063715018a6116100ec578063ad3cb1cc1161008a578063cf456ae711610064578063cf456ae71461054e578063dd62ed3e1461056e578063f2fde38b1461058e578063f7ee7a43146105ae57600080fd5b8063ad3cb1cc146104c4578063c95c2fc7146104f5578063cefee7bc1461051557600080fd5b806395d89b41116100c657806395d89b411461043f5780639dc29fac14610454578063a9059cbb14610474578063aa271e1a1461049457600080fd5b8063715018a6146103cd57806382f7d392146103e25780638da5cb5b1461041257600080fd5b806340c10f19116101595780635ea3f9d1116101335780635ea3f9d11461031b5780636aa71d181461033b5780636b32810b1461036857806370a082311461038a57600080fd5b806340c10f19146102d35780634f1ef286146102f357806352d1902d1461030657600080fd5b806318160ddd1161019557806318160ddd1461023957806323b872dd146102775780633092afd514610297578063313ce567146102b757600080fd5b806306fdde03146101bc578063077f224a146101e7578063095ea7b314610209575b600080fd5b3480156101c857600080fd5b506101d16105c5565b6040516101de91906116bf565b60405180910390f35b3480156101f357600080fd5b506102076102023660046117be565b610688565b005b34801561021557600080fd5b50610229610224366004611837565b6107b4565b60405190151581526020016101de565b34801561024557600080fd5b507f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace02545b6040519081526020016101de565b34801561028357600080fd5b50610229610292366004611861565b6107ce565b3480156102a357600080fd5b506102076102b236600461189e565b6107f4565b3480156102c357600080fd5b50604051601281526020016101de565b3480156102df57600080fd5b506102076102ee366004611837565b610a13565b6102076103013660046118b9565b610ae1565b34801561031257600080fd5b50610269610b00565b34801561032757600080fd5b5061020761033636600461189e565b610b1d565b34801561034757600080fd5b5061026961035636600461189e565b60006020819052908152604090205481565b34801561037457600080fd5b5061037d610b88565b6040516101de919061191b565b34801561039657600080fd5b506102696103a536600461189e565b6001600160a01b03166000908152600080516020611bb4833981519152602052604090205490565b3480156103d957600080fd5b50610207610bf2565b3480156103ee57600080fd5b506102296103fd36600461189e565b60016020526000908152604090205460ff1681565b34801561041e57600080fd5b50610427610c06565b6040516001600160a01b0390911681526020016101de565b34801561044b57600080fd5b506101d1610c34565b34801561046057600080fd5b5061020761046f366004611837565b610c73565b34801561048057600080fd5b5061022961048f366004611837565b610c85565b3480156104a057600080fd5b506102296104af36600461189e565b60026020526000908152604090205460ff1681565b3480156104d057600080fd5b506101d1604051806040016040528060058152602001640352e302e360dc1b81525081565b34801561050157600080fd5b50610207610510366004611967565b610c93565b34801561052157600080fd5b5061022961053036600461189e565b6001600160a01b031660009081526001602052604090205460ff1690565b34801561055a57600080fd5b50610207610569366004611967565b610cc6565b34801561057a57600080fd5b506102696105893660046119a3565b610d73565b34801561059a57600080fd5b506102076105a936600461189e565b610dbd565b3480156105ba57600080fd5b506102696201518081565b7f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace038054606091600080516020611bb483398151915291610604906119d6565b80601f0160208091040260200160405190810160405280929190818152602001828054610630906119d6565b801561067d5780601f106106525761010080835404028352916020019161067d565b820191906000526020600020905b81548152906001019060200180831161066057829003601f168201915b505050505091505090565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a008054600160401b810460ff16159067ffffffffffffffff166000811580156106ce5750825b905060008267ffffffffffffffff1660011480156106eb5750303b155b9050811580156106f9575080155b156107175760405163f92ee8a960e01b815260040160405180910390fd5b845467ffffffffffffffff19166001178555831561074157845460ff60401b1916600160401b1785555b61074b8888610dfb565b61075486610e0d565b61075c610e1e565b610764610e2e565b83156107aa57845460ff60401b19168555604051600181527fc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d29060200160405180910390a15b5050505050505050565b6000336107c2818585610e36565b60019150505b92915050565b6000336107dc858285610e48565b6107e7858585610eaf565b60019150505b9392505050565b6107fc610f0e565b6001600160a01b0381166108495760405162461bcd60e51b815260206004820152600f60248201526e496e76616c6964206164647265737360881b60448201526064015b60405180910390fd5b6001600160a01b03811660009081526002602052604090205460ff166108b15760405162461bcd60e51b815260206004820152601760248201527f41646472657373206973206e6f742061206d696e7465720000000000000000006044820152606401610840565b6001600160a01b0381166000908152600260205260408120805460ff191690555b6003548110156109cd57816001600160a01b0316600382815481106108f9576108f9611a10565b6000918252602090912001546001600160a01b0316036109c5576003805461092390600190611a3c565b8154811061093357610933611a10565b600091825260209091200154600380546001600160a01b03909216918390811061095f5761095f611a10565b9060005260206000200160006101000a8154816001600160a01b0302191690836001600160a01b03160217905550600380548061099e5761099e611a4f565b600082815260209020810160001990810180546001600160a01b03191690550190556109cd565b6001016108d2565b50604080516001600160a01b0383168152600060208201527f583b0aa0e528532caf4b907c11d7a8158a122fe2a6fb80cd9b09776ebea8d92d910160405180910390a150565b6001600160a01b038216610a3a576040516322ce111360e11b815260040160405180910390fd5b610a42610c06565b6001600160a01b0316336001600160a01b031614158015610a7357503360009081526002602052604090205460ff16155b15610a935760405163a4f3966560e01b8152336004820152602401610840565b610a9d8282610f40565b60405181815233906001600160a01b038416907f969cd201f68f120baff2bf3c59bc3b534434e08b69a71a14ab85cb79cd3b63e49060200160405180910390a35050565b610ae9610f76565b610af28261101b565b610afc8282611023565b5050565b6000610b0a6110e0565b50600080516020611bd483398151915290565b610b25610f0e565b610b3a816a084595161401484a000000610f40565b6040516a084595161401484a000000815233906001600160a01b038316907f969cd201f68f120baff2bf3c59bc3b534434e08b69a71a14ab85cb79cd3b63e49060200160405180910390a350565b6060610b92610f0e565b6003805480602002602001604051908101604052809291908181526020018280548015610be857602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610bca575b5050505050905090565b610bfa610f0e565b610c046000611129565b565b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c199300546001600160a01b031690565b7f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace048054606091600080516020611bb483398151915291610604906119d6565b610c7b610f0e565b610afc828261119a565b6000336107c2818585610eaf565b610c9b610f0e565b6001600160a01b03919091166000908152600160205260409020805460ff1916911515919091179055565b610cce610f0e565b6001600160a01b0382166000818152600260209081526040808320805460ff19168615159081179091556003805460018101825594527fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b90930180546001600160a01b031916851790558051938452908301919091527f583b0aa0e528532caf4b907c11d7a8158a122fe2a6fb80cd9b09776ebea8d92d910160405180910390a15050565b6001600160a01b0391821660009081527f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace016020908152604080832093909416825291909152205490565b610dc5610f0e565b6001600160a01b038116610def57604051631e4fbdf760e01b815260006004820152602401610840565b610df881611129565b50565b610e036111d0565b610afc8282611219565b610e156111d0565b610df88161126a565b610e266111d0565b610c04611272565b610c046111d0565b610e4383838360016112a0565b505050565b6000610e548484610d73565b9050600019811015610ea95781811015610e9a57604051637dc7a0d960e11b81526001600160a01b03841660048201526024810182905260448101839052606401610840565b610ea9848484840360006112a0565b50505050565b6001600160a01b038316610ed957604051634b637e8f60e11b815260006004820152602401610840565b6001600160a01b038216610f035760405163ec442f0560e01b815260006004820152602401610840565b610e43838383611388565b33610f17610c06565b6001600160a01b031614610c045760405163118cdaa760e01b8152336004820152602401610840565b6001600160a01b038216610f6a5760405163ec442f0560e01b815260006004820152602401610840565b610afc60008383611388565b306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161480610ffd57507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610ff1600080516020611bd4833981519152546001600160a01b031690565b6001600160a01b031614155b15610c045760405163703e46dd60e11b815260040160405180910390fd5b610df8610f0e565b816001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa92505050801561107d575060408051601f3d908101601f1916820190925261107a91810190611a65565b60015b6110a557604051634c9c8ce360e01b81526001600160a01b0383166004820152602401610840565b600080516020611bd483398151915281146110d657604051632a87526960e21b815260048101829052602401610840565b610e4383836114c6565b306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614610c045760405163703e46dd60e11b815260040160405180910390fd5b7f9016d09d72d40fdae2fd8ceac6b6234c7706214fd39c1cd1e609a0528c19930080546001600160a01b031981166001600160a01b03848116918217845560405192169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3505050565b6001600160a01b0382166111c457604051634b637e8f60e11b815260006004820152602401610840565b610afc82600083611388565b7ff0c57e16840df040f15088dc2f81fe391c3923bec73e23a9662efc9c229c6a0054600160401b900460ff16610c0457604051631afcd79f60e31b815260040160405180910390fd5b6112216111d0565b600080516020611bb48339815191527f52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace0361125b8482611ac5565b5060048101610ea98382611ac5565b610dc56111d0565b61127a6111d0565b60017f9b779b17422d0df92223018b32b4d1fa46e071723d6817e2486d003becc55f0055565b600080516020611bb48339815191526001600160a01b0385166112d95760405163e602df0560e01b815260006004820152602401610840565b6001600160a01b03841661130357604051634a1406b160e11b815260006004820152602401610840565b6001600160a01b0380861660009081526001830160209081526040808320938816835292905220839055811561138157836001600160a01b0316856001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258560405161137891815260200190565b60405180910390a35b5050505050565b600080516020611bb48339815191526001600160a01b0384166113c457818160020160008282546113b99190611b84565b909155506114369050565b6001600160a01b038416600090815260208290526040902054828110156114175760405163391434e360e21b81526001600160a01b03861660048201526024810182905260448101849052606401610840565b6001600160a01b03851660009081526020839052604090209083900390555b6001600160a01b038316611454576002810180548390039055611473565b6001600160a01b03831660009081526020829052604090208054830190555b826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516114b891815260200190565b60405180910390a350505050565b6114cf8261151c565b6040516001600160a01b038316907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a280511561151457610e438282611581565b610afc6115f7565b806001600160a01b03163b60000361155257604051634c9c8ce360e01b81526001600160a01b0382166004820152602401610840565b600080516020611bd483398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b6060600080846001600160a01b03168460405161159e9190611b97565b600060405180830381855af49150503d80600081146115d9576040519150601f19603f3d011682016040523d82523d6000602084013e6115de565b606091505b50915091506115ee858383611616565b95945050505050565b3415610c045760405163b398979f60e01b815260040160405180910390fd5b60608261162b5761162682611672565b6107ed565b815115801561164257506001600160a01b0384163b155b1561166b57604051639996b31560e01b81526001600160a01b0385166004820152602401610840565b50806107ed565b8051156116825780518082602001fd5b60405163d6bda27560e01b815260040160405180910390fd5b60005b838110156116b657818101518382015260200161169e565b50506000910152565b60208152600082518060208401526116de81604085016020870161169b565b601f01601f19169190910160400192915050565b634e487b7160e01b600052604160045260246000fd5b60008067ffffffffffffffff841115611723576117236116f2565b50604051601f19601f85018116603f0116810181811067ffffffffffffffff82111715611752576117526116f2565b60405283815290508082840185101561176a57600080fd5b83836020830137600060208583010152509392505050565b600082601f83011261179357600080fd5b6107ed83833560208501611708565b80356001600160a01b03811681146117b957600080fd5b919050565b6000806000606084860312156117d357600080fd5b833567ffffffffffffffff8111156117ea57600080fd5b6117f686828701611782565b935050602084013567ffffffffffffffff81111561181357600080fd5b61181f86828701611782565b92505061182e604085016117a2565b90509250925092565b6000806040838503121561184a57600080fd5b611853836117a2565b946020939093013593505050565b60008060006060848603121561187657600080fd5b61187f846117a2565b925061188d602085016117a2565b929592945050506040919091013590565b6000602082840312156118b057600080fd5b6107ed826117a2565b600080604083850312156118cc57600080fd5b6118d5836117a2565b9150602083013567ffffffffffffffff8111156118f157600080fd5b8301601f8101851361190257600080fd5b61191185823560208401611708565b9150509250929050565b602080825282518282018190526000918401906040840190835b8181101561195c5783516001600160a01b0316835260209384019390920191600101611935565b509095945050505050565b6000806040838503121561197a57600080fd5b611983836117a2565b91506020830135801515811461199857600080fd5b809150509250929050565b600080604083850312156119b657600080fd5b6119bf836117a2565b91506119cd602084016117a2565b90509250929050565b600181811c908216806119ea57607f821691505b602082108103611a0a57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b818103818111156107c8576107c8611a26565b634e487b7160e01b600052603160045260246000fd5b600060208284031215611a7757600080fd5b5051919050565b601f821115610e4357806000526020600020601f840160051c81016020851015611aa55750805b601f840160051c820191505b818110156113815760008155600101611ab1565b815167ffffffffffffffff811115611adf57611adf6116f2565b611af381611aed84546119d6565b84611a7e565b6020601f821160018114611b275760008315611b0f5750848201515b600019600385901b1c1916600184901b178455611381565b600084815260208120601f198516915b82811015611b575787850151825560209485019460019092019101611b37565b5084821015611b755786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b808201808211156107c8576107c8611a26565b60008251611ba981846020870161169b565b919091019291505056fe52c63247e1f47db19d5ce0460030c497f067ca4cebf71ba98eeadabe20bace00360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbca26469706673582212207fad8b3c541c71db964a0f18e4d429df605dcb7cae2e8f40f212f698ade967bb64736f6c634300081c0033";

type YieldTokenV2ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: YieldTokenV2ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class YieldTokenV2__factory extends ContractFactory {
  constructor(...args: YieldTokenV2ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      YieldTokenV2 & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): YieldTokenV2__factory {
    return super.connect(runner) as YieldTokenV2__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): YieldTokenV2Interface {
    return new Interface(_abi) as YieldTokenV2Interface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): YieldTokenV2 {
    return new Contract(address, _abi, runner) as unknown as YieldTokenV2;
  }
}
