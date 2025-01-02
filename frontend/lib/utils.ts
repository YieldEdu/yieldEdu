/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import yieldPoolConfig from "../../artifacts/contracts/yieldPool.sol/YieldPool.json";
import yieldTokenConfig from "../../artifacts/contracts/YieldToken.sol/YieldToken.json";
import { Abi } from "viem";
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// export const YieldTokenAddress =
// 	"0x18803150E6bce50B8A53aC33Dd2dE27a47e1e331" as unknown as undefined; //to resolve ts error on page/tsx
// export const YieldPoolAddress =
// 	"0xdE6EbF35A075BD95Ac98CFeb31dD47EE1E1849E8" as unknown as undefined;

//localHost

export const YieldTokenAddress =
	"0xc6e7DF5E7b4f2A278906862b61205850344D4e7d" as unknown as undefined; //to resolve ts error on page/tsx
export const YieldPoolAddress =
	"0x59b670e9fA9D0A427751Af201D676719a970857b" as unknown as undefined;

export const getYieldPoolConfig = (functionName: string, args?: any[]) => {
	return {
		abi: yieldPoolConfig.abi as Abi,
		address: YieldPoolAddress!,
		functionName: functionName,
		...(args && { args }),
	};
};
export const getYieldTokenConfig = (functionName: string, args?: any[]) => {
	return {
		abi: yieldTokenConfig.abi as Abi,
		address: YieldTokenAddress,
		functionName: functionName,
		...(args && { args }),
	};
};
