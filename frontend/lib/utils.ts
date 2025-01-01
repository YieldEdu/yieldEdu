/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import stakingRewardConfig from "../../artifacts/contracts/StakingRewards.sol/StakingRewards.json";
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
// const StakingRewardsAddress =
// 	"0x821EFbB5feFeb55Bb7f5fD257343095dCcE7aC91" as unknown as undefined;

//localHost

export const YieldTokenAddress =
	"0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9" as unknown as undefined; //to resolve ts error on page/tsx
export const YieldPoolAddress =
	"0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9" as unknown as undefined;
const StakingRewardsAddress =
	"0x5FC8d32690cc91D4c39d9d3abcBD16989F875707" as unknown as undefined;

export const getStakingRewardsConfig = (functionName: string, args?: any[]) => {
	return {
		abi: stakingRewardConfig.abi as Abi,
		address: StakingRewardsAddress,
		functionName: functionName,
		...(args && { args }),
	};
};

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
