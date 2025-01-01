"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldCheck, Timer, Percent, Vault, Coins } from "lucide-react";
import Analytics from "@/components/Analytics";
import DepositForm from "@/components/DepositForm";
import { ActivePositionTable } from "@/components/ActivePositionTable";
import Link from "next/link";
import Image from "next/image";
import X from "@/public/x.svg";
import ConnectButton from "@/components/ui/ConnectButton";
import { useBalance, useReadContract } from "wagmi";
import { useAppKitAccount } from "@reown/appkit/react";
import { cn, getYieldPoolConfig, YieldTokenAddress } from "@/lib/utils";
import CountDownTimer from "@/components/CountDown";
import { formatEther } from "viem";
import { useState, useEffect } from "react";
import FaucetButton from "@/components/ui/FaucetButton";
import WithdrawModal from "@/components/WithdrawModal";

export interface IActivePosition {
	id: string;
	address: string;
	amount: number;
	lockDuration: number;
	startTime: number;
	timeLeft: number;
	expectedYield: number;
}

interface ITransformed {
	0: string[];
	1: { id: string; amount: string; lockDuration: string; startTime: string }[];
}

const FixedYieldDashboard = () => {
	const { isConnected, address } = useAppKitAccount();
	const [showModal, setShowModal] = useState(false);
	const [showWithdrawModal, setShowWithDrawModal] = useState(false);

	// const account = useAccount();
	// const { data: position } = useReadContract({
	// 	...getYieldPoolConfig("getPosition", [address]),
	// 	account: address as unknown as `0x${string}`,
	// }) as unknown as UseQueryReturnType & Position;

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

	const calculateYield = (amount: string, duration: number) => {
		const YIELD_RATE = 10;
		const YEAR = 365 * 24 * 60 * 60; // 365 days in seconds

		if (!amount || !duration) return "0";

		const amountBigInt = BigInt(amount);
		//tis is how I calculate yield in my contract
		const yieldAmount =
			(amountBigInt * BigInt(duration) * BigInt(YIELD_RATE)) /
			(BigInt(YEAR) * BigInt(100));

		return formatEther(yieldAmount);
	};

	// Base APY from YieldPool's YIELD_RATE
	const BASE_APY = 10;

	const [positions, setPositions] = useState<IActivePosition[]>([
		{
			id: "",
			address: "",
			amount: 0,
			lockDuration: 0,
			startTime: 0,
			timeLeft: 0,
			expectedYield: 0,
		},
	]);

	const { data: activePositionsData }: { data: ITransformed | undefined } =
		useReadContract({
			...getYieldPoolConfig("getActivePositions", []),
		});

	// Update positions state when active positions data changes
	useEffect(() => {
		const stakers =
			activePositionsData &&
			activePositionsData[0]?.map((address, index) => {
				const positionData = (activePositionsData as ITransformed)[1][index];
				const startTimeInSeconds = Number(positionData.startTime);
				const lockDurationInSeconds = Number(positionData.lockDuration);

				return {
					id: positionData.id,
					address,
					amount: Number(formatEther(BigInt(positionData.amount))),
					lockDuration: lockDurationInSeconds, // Store raw seconds
					startTime: startTimeInSeconds,
					timeLeft: Math.ceil(lockDurationInSeconds / (24 * 60 * 60)), // Convert to days for display
					expectedYield: parseFloat(
						calculateYield(
							positionData.amount,
							lockDurationInSeconds // seconds for yield calculation
						)
					),
				};
			});

		if (stakers) {
			setPositions(stakers);
		}
	}, [activePositionsData]);

	const latestPosition = positions.filter(
		(position) => position.address === address
	);

	//get latest position
	const userPosition = latestPosition.reduce((latest, current) => {
		return current.startTime > latest.startTime ? current : latest;
	}, latestPosition[0]);

	return (
		<>
			<main className="min-h-screen flex flex-col">
				<div className=" text-white p-4 md:p-8">
					<div className="max-w-7xl mx-auto space-y-6">
						<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
							<div>
								<h1 className="text-3xl font-bold">YieldStake Protocol</h1>
								<p className="text-gray-400">
									Earn guaranteed yields on your FYT tokens
								</p>
							</div>
							<div className="flex gap-4">
								<FaucetButton userAddress={address} />
								<ConnectButton />
							</div>
						</div>

						<div className="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-4 gap-4">
							<Card className="bg-[#1A1B1F] border-none text-white">
								<CardContent className="p-6">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-sm text-slate-400">TVL</p>
											<p className="text-4xl font-bold">{formattedTVL} FYT</p>
										</div>
										<ShieldCheck className="size-10 text-green-500" />{" "}
									</div>
								</CardContent>
							</Card>
							<Card className="bg-[#1A1B1F] border-none text-white">
								<CardContent className="p-6">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-sm text-slate-400">Base APY</p>
											<p className="text-3xl md:text-4xl font-bold">
												{BASE_APY}%
											</p>
										</div>
										<Percent className="size-10 text-green-500" />
									</div>
								</CardContent>
							</Card>
							<Card
								className={cn("bg-[#1A1B1F] border-none text-white", {
									"bg-zinc-800": Number(results?.data?.formatted),
								})}
							>
								<CardContent className="p-6">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-sm text-slate-400">
												Native Token Balance (FYT/EDU)
											</p>
											<p className="text-3xl md:text-4xl font-bold">
												{results?.data?.formatted
													? parseFloat(results.data.formatted).toFixed(3)
													: "0.000"}
											</p>
										</div>
										<Coins className="size-10 text-green-500" />
									</div>
								</CardContent>
							</Card>
							<Card className="bg-[#1A1B1F] border-none text-white">
								<CardContent className="p-6">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-sm text-slate-400">Total Stakers</p>
											<p className="text-3xl md:text-4xl font-bold">
												{totalStakers ? Number(totalStakers).toString() : "0"}
											</p>
										</div>
										<Vault className="size-10 text-green-500" />
									</div>
								</CardContent>
							</Card>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
							<DepositForm showModal={showModal} setShowModal={setShowModal} />
							<Card className="md:col-span-2 bg-[#1A1B1F] border-none text-white">
								<Tabs className="flex flex-col h-full" defaultValue="overview">
									<CardHeader>
										<div className="flex justify-between items-center">
											<CardTitle>Position overview</CardTitle>
											<TabsList>
												<TabsTrigger value="overview">Overview</TabsTrigger>
												<TabsTrigger value="analytics">Analytics</TabsTrigger>
											</TabsList>
										</div>
									</CardHeader>
									<CardContent>
										<TabsContent value="overview">
											<div className="space-y-6 h-full">
												<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
													<div className="bg-zinc-800 p-4 rounded-lg">
														<p className="text-sm text-slate-400">Deposited</p>
														<p className="text-xl font-bold">
															{userPosition?.amount
																? `${userPosition.amount} FYT`
																: "N/A"}
														</p>
													</div>
													<div className="bg-zinc-800 p-4 rounded-lg">
														<p className="text-sm  text-slate-400">
															Current Yield
														</p>
														<p className="text-xl font-bold">
															{userPosition?.expectedYield
																? `${Number(userPosition.expectedYield).toFixed(
																		8
																  )} FYT`
																: "N/A"}
														</p>
													</div>
													<div className="bg-zinc-800 p-4 rounded-lg">
														<p className="text-sm text-slate-400">Time Left</p>
														<p className="text-xl font-bold">
															{userPosition?.lockDuration
																? `${Math.floor(
																		Number(userPosition.lockDuration) /
																			(60 * 60 * 24)
																  )} ${
																		Number(userPosition.lockDuration) /
																			(60 * 60 * 24) >
																		1
																			? "days"
																			: "day"
																  }`
																: "N/A"}
														</p>
													</div>
												</div>

												<Alert className="bg-zinc-800 border-none">
													<AlertDescription className="flex items-center text-white gap-3">
														<Timer className="w-5 h-5" />
														{!isConnected ? (
															"Connect your wallet and make a deposit to see this info"
														) : userPosition?.address &&
														  Number(userPosition?.amount) !== 0 ? (
															<>
																Your position will be available for withdrawal
																in{" "}
																<CountDownTimer
																	className="text-[#0E76FD]"
																	isConnected={isConnected}
																	lockDuration={Number(
																		userPosition?.lockDuration
																	)}
																	startTime={Number(userPosition?.startTime)}
																/>
															</>
														) : (
															"Stake to see this info"
														)}
													</AlertDescription>
												</Alert>
											</div>
										</TabsContent>
										<Analytics />
									</CardContent>
								</Tabs>
							</Card>
						</div>
						<ActivePositionTable
							setShowWithDrawModal={setShowWithDrawModal}
							positions={positions}
							currentUserAddress={address}
						/>
						<WithdrawModal
							positions={positions}
							setShowWithDrawModal={setShowWithDrawModal}
							showWithdrawModal={showWithdrawModal}
						/>
					</div>
				</div>
			</main>

			<footer className="flex  p-4 md:p-8 justify-between items-center text-white py-4">
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
			</footer>
		</>
	);
};

export default FixedYieldDashboard;
