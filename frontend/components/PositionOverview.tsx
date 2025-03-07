"use state";
import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppKitAccount } from "@reown/appkit/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import CountDownTimer from "@/components/CountDownTimer";
import { useReadContract } from "wagmi";
import Analytics from "@/components/Analytics";
import { formatEther } from "viem";
import { getYieldPoolConfig } from "@/lib/utils";
import { Button } from "./ui/button";

export interface ActivePosition {
	//string because of BigInt Values
	id: string;
	positionAddress?: string;
	amount: number;
	lockDuration: number;
	startTime: number;
	timeLeft: number;
	expectedYield: number;
	status: "Active" | "Locked";
	transactionHash?: string;
}

const PositionOverview = ({
	positions,
	setPositions,
}: {
	positions: [] | ActivePosition[];
	setPositions: Dispatch<SetStateAction<[] | ActivePosition[]>>;
}) => {
	const { isConnected, address } = useAppKitAccount();
	const [, setShowWithDrawModal] = useState(false);
	const [currentPositionIndex, setCurrentPositionIndex] = useState(0);

	// Filter user positions first
	const userPositions = positions.filter(
		(position) =>
			position.positionAddress?.toLowerCase() === address?.toLowerCase()
	);

	// Update userPosition to use currentPositionIndex
	const userPosition = userPositions[currentPositionIndex];

	const handlePrevPosition = () => {
		setCurrentPositionIndex((prev) =>
			prev > 0 ? prev - 1 : userPositions.length - 1
		);
	};

	const handleNextPosition = () => {
		setCurrentPositionIndex((prev) =>
			prev < userPositions.length - 1 ? prev + 1 : 0
		);
	};

	const calculateYield = (amount: number, duration: number) => {
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

	const { data: activePositionsData }: { data: ActivePosition[] | undefined } =
		useReadContract({
			...getYieldPoolConfig("getActivePositions", []),
		});

	useEffect(() => {
		if (activePositionsData) {
			const stakers = activePositionsData.map(
				(positionData: ActivePosition): ActivePosition => {
					const startTimeInSeconds = Number(positionData.startTime);
					const lockDurationInSeconds = Number(positionData.lockDuration);

					// Convert BigInt values to numbers before calculation
					const currentTime = Math.floor(Date.now() / 1000);
					const timeLeft = Math.max(
						startTimeInSeconds + lockDurationInSeconds - currentTime,
						0
					);

					return {
						id: positionData.id,
						positionAddress: positionData.positionAddress,
						amount: Number(formatEther(BigInt(positionData?.amount))),
						lockDuration: lockDurationInSeconds,
						startTime: startTimeInSeconds,
						timeLeft: Math.ceil(timeLeft / (24 * 60 * 60)), // Convert to days for display
						expectedYield: parseFloat(
							calculateYield(
								positionData.amount,
								lockDurationInSeconds // seconds for yield calculation
							)
						),
						status: timeLeft > 0 ? "Locked" : "Active",
					};
				}
			);

			if (stakers) {
				setPositions(stakers);
			}
		}
	}, [activePositionsData, address, setPositions]);

	return (
		<Card className="bg-white md:col-span-2 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 backdrop-blur-sm shadow-sm">
			<Tabs className="flex flex-col h-full" defaultValue="overview">
				<CardHeader>
					<div className="flex gap-2 flex-wrap justify-between items-center">
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
								<div className="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500">
									<p className="text-md text-slate-400">Deposited</p>
									<p className="text-xl font-bold">
										{userPosition?.amount
											? `${userPosition.amount} FYT`
											: "N/A"}
									</p>
								</div>
								<div className="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500">
									<p className="text-md  text-slate-400">Current Yield</p>
									<p className="text-xl font-bold">
										{userPosition?.expectedYield
											? `${Number(userPosition.expectedYield).toFixed(8)} FYT`
											: "N/A"}
									</p>
								</div>
								<div className="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500">
									<p className="text-md text-slate-400">Time Left</p>
									<p className="text-xl font-bold">
										{userPosition?.lockDuration
											? `${Math.floor(
													Number(userPosition.lockDuration) / (60 * 60 * 24)
											  )} ${
													Number(userPosition.lockDuration) / (60 * 60 * 24) > 1
														? "days"
														: "day"
											  }`
											: "N/A"}
									</p>
								</div>
							</div>

							{userPositions.length > 1 && (
								<div className="flex justify-between items-center gap-4 mt-4">
									<Button
										onClick={handlePrevPosition}
										type="button"
										className={cn(
											"flex px-3 text-md disabled:bg-gray-400  bg-lime-700 enabled:hover:bg-lime-600 enabled:active:bg-lime-600/90 text-white border-none w-fit rounded-md"
										)}
									>
										Previous Position
									</Button>
									<span className="text-green-400">
										Position {currentPositionIndex + 1} of{" "}
										{userPositions.length}
									</span>
									<Button
										onClick={handleNextPosition}
										type="button"
										className={cn(
											"flex px-3 text-md disabled:bg-gray-400  bg-lime-700 enabled:hover:bg-lime-600 enabled:active:bg-lime-600/90 text-white border-none w-fit rounded-md"
										)}
									>
										Next Position
									</Button>
								</div>
							)}

							<Alert className="bg-lime-500/20 border border-lime-500/20">
								<AlertDescription>
									{!isConnected ? (
										"Connect your wallet and make a deposit to see this info"
									) : userPositions.length > 0 ? (
										<>
											<CountDownTimer
												positionId={userPosition.id}
												setShowWithDrawModal={setShowWithDrawModal}
												className="text-[#0E76FD]"
												isConnected={isConnected}
												lockDuration={Number(userPosition?.lockDuration)}
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
					<TabsContent value="analytics">
						<Analytics positions={positions} />
					</TabsContent>
				</CardContent>
			</Tabs>
		</Card>
	);
};

export default PositionOverview;
