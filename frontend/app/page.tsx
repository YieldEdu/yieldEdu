"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Percent, Vault, Coins } from "lucide-react";
// import DepositForm from "@/components/DepositForm";

import { useBalance, useReadContract } from "wagmi";
import { useAppKitAccount } from "@reown/appkit/react";
import { getYieldPoolConfig, YieldTokenAddress } from "@/lib/utils";
import { formatEther } from "viem";
import { useState } from "react";
// import FaucetButton from "@/components/ui/FaucetButton";
import WithdrawModal from "@/components/WithdrawModal";
import AchievementBanner from "@/components/AchievementBanner";
import StakingCard from "@/components/StakingCard";
import PositionOverview, {
	ActivePosition,
} from "@/components/PositionOverview";
import Performance from "@/components/Performance";
import ActivePositions from "@/components/ActivePositions";

const FixedYieldDashboard = () => {
	const { address } = useAppKitAccount();
	const [positions, setPositions] = useState<ActivePosition[] | []>([]);

	const [modalType, setModalType] = useState<"withdraw" | "unstake">("unstake");
	const [showWithdrawModal, setShowWithDrawModal] = useState(false);
	// const [showModal, setShowModal] = useState(false);
	const results = useBalance({
		address: address as unknown as `0x${string}`,
		token: YieldTokenAddress,
	});

	const { data: tvl } = useReadContract({
		...getYieldPoolConfig("getTotalValueLocked", []),
	});

	const formattedTVL = tvl ? formatEther(BigInt(tvl.toString())) : "0.00";

	const { data: totalStakers } = useReadContract({
		...getYieldPoolConfig("getTotalStakers", []),
	});

	// Base APY from YieldPool's YIELD_RATE
	const BASE_APY = 10;

	return (
		<>
			{/* Animated background - only visible in dark mode */}
			{/* <div className="fixed inset-0 overflow-hidden pointer-events-none dark:block hidden">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#1a365d80,#0A0B1E)]"></div>
				<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-20"></div>
				<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-20"></div>
			</div> */}

			{/* Light mode background */}
			{/* <div className="fixed inset-0 overflow-hidden pointer-events-none dark:hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100"></div>
				<div className="absolute top-0 left-0 w-full h-full bg-[url('/image/webp')] opacity-5"></div>
			</div> */}

			{/* <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
							
							<div className="flex gap-4">
								<FaucetButton userAddress={address} />
							</div>
						</div> */}
			{/* className="" */}
			<main className="w-full flex flex-col flex-[10]">
				<div className="text-white py-5 px-5 h-screen overflow-y-auto">
					<div className="container md:max-w-8xl mx-auto space-y-6 mt-24">
						<AchievementBanner />
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
							<Card className="relative overflow-hidden dark:bg-gradient-to-r from-slate-800/50 to-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
								<div className="absolute inset-0 bg-gradient-to-r from-lime-400/10 to-yellow-400/10 dark:opacity-10"></div>
								<CardContent className="p-6">
									<div className="flex items-center justify-between">
										<div className="p-3 bg-lime-500/20 rounded-xl">
											<ShieldCheck className="size-8 text-lime-400" />{" "}
										</div>
										<div>
											<p className="text-md text-slate-400">TVL</p>
											<p className="text-4xl font-bold text-lime-400">
												{parseFloat(formattedTVL).toFixed(2)} FYT
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
							<Card className="relative overflow-hidden dark:bg-gradient-to-r from-slate-800/50 to-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
								<div className="absolute inset-0 bg-gradient-to-r from-lime-400/10 to-yellow-400/10 dark:opacity-10"></div>
								<CardContent className="p-6">
									<div className="flex items-center justify-between">
										<div className="p-3 bg-lime-500/20 rounded-xl">
											<Percent className="size-8 text-lime-400" />
										</div>
										<div>
											<p className="text-md text-slate-400">Base APY</p>
											<p className="text-4xl font-bold text-lime-400">
												{BASE_APY}%
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
							<Card className="relative overflow-hidden dark:bg-gradient-to-r from-slate-800/50 to-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
								<div className="absolute inset-0 bg-gradient-to-r from-lime-400/10 to-yellow-400/10 dark:opacity-10"></div>

								<CardContent className="p-6">
									<div className="flex items-center justify-between">
										<div className="p-3 bg-lime-500/20 rounded-xl">
											<Vault className="size-8 text-lime-400" />
										</div>

										<div>
											<p className="text-md text-slate-400">Total Stakers</p>
											<p className="text-4xl font-bold text-lime-400">
												{totalStakers ? Number(totalStakers).toString() : "0"}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
							<Card className="relative overflow-hidden dark:bg-gradient-to-r from-slate-800/50 to-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
								<div className="absolute inset-0 bg-gradient-to-r from-lime-400/10 to-yellow-400/10 dark:opacity-10"></div>
								<CardContent className="p-6">
									<div className="flex items-center justify-between">
										<div className="p-3 bg-lime-500/20 rounded-xl">
											<Coins className="size-8 text-lime-400" />
										</div>
										<div>
											<p className="text-md text-slate-400">
												Token Balance (YDU)
											</p>
											<p className="text-4xl font-bold text-lime-400">
												{results?.data?.formatted
													? parseFloat(results.data.formatted).toFixed(2)
													: "0.00"}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
						<Performance />

						<div className="grid grid-cols-1 lg:grid-cols-3 space-y-6 lg:space-y-0 lg:gap-6 h-auto">
							<StakingCard />
							<PositionOverview
								setPositions={setPositions}
								positions={positions}
							/>
						</div>
						<ActivePositions
							setModalType={setModalType}
							setShowWithDrawModal={setShowWithDrawModal}
							positions={positions}
						/>

						<WithdrawModal
							modalType={modalType}
							setModalType={setModalType}
							positions={positions}
							setShowWithDrawModal={setShowWithDrawModal}
							showWithdrawModal={showWithdrawModal}
						/>
					</div>
				</div>
			</main>
			{/* <DepositForm
				setShowModal={setShowModal}
				showModal={showModal}
				balance={results?.data?.formatted}
			/> */}

			{/* <footer className="flex  p-4 md:p-8 justify-between items-center text-white py-4">
				<a
					className="hover:underline"
					href="kamasahdickson.vercel.app"
					rel="noopener noreferrer"
					target="_blank"
				>
					Made with ❤️ by Kamasah Dickson
				</a>
				<ul>
					<li>
						<Link
							rel="noopener noreferrer"
							target="_blank"
							href="https://x.com/bruh_codes"
						>
							<Image src={X} alt="bruh_codes" />
						</Link>
					</li>
				</ul>
			</footer> */}
		</>
	);
};

export default FixedYieldDashboard;
