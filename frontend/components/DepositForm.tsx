"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	cn,
	getYieldTokenConfig,
	YieldPoolAddress,
	getYieldPoolConfig,
	YieldTokenAddress,
} from "@/lib/utils";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import {
	useWriteContract,
	useSimulateContract,
	useReadContract,
	useBalance,
} from "wagmi";
import { toast } from "@/hooks/use-toast";
import { parseEther } from "viem";
import Modal from "./Modal";
import { useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import LearnSteps from "./LearnSteps";
const DepositForm = ({
	showModal,
	setShowModal,
	balance,
}: {
	showModal: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	balance: string | undefined;
}) => {
	const [amount, setAmount] = useState("");
	const [duration, setDuration] = useState("1");
	const { open } = useAppKit();
	const { isConnected, address } = useAppKitAccount();
	const durationInSeconds = Number(duration) * 24 * 60 * 60;
	const queryClient = useQueryClient();

	const { data: allowance, refetch: refetchAllowance } = useReadContract({
		...getYieldTokenConfig("allowance", [address, YieldPoolAddress]),
	});

	// address  balance
	const results = useBalance({
		address: address as unknown as `0x${string}`,
		token: YieldTokenAddress,
	});

	// Approve hook
	const { writeContract: approve, isPending: isApprovePending } =
		useWriteContract();

	// Simulate approve
	const {
		data: approveSimulator,
		isError: isApproveError,
		error: approveError,
	} = useSimulateContract({
		...getYieldTokenConfig("approve", [
			YieldPoolAddress,
			parseEther(amount || "0"),
		]),
	});

	const { writeContract: deposit, isPending: isDepositPending } =
		useWriteContract();

	useEffect(() => {
		if (isApproveError) {
			console.error("Approval simulation error:", approveError);
		}
	}, [isApproveError, approveError]);

	// Validate input
	const validateInput = () => {
		if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
			toast({
				variant: "destructive",
				title: "Invalid amount",
				description: "Please enter a valid amount greater than 0",
			});
			return false;
		}

		if (
			!durationInSeconds ||
			isNaN(Number(durationInSeconds)) ||
			Number(durationInSeconds) < 1
		) {
			toast({
				variant: "destructive",
				title: "Invalid duration",
				description: "Please enter a valid duration in days",
			});
			return false;
		}

		const hasBalance = results?.data?.formatted
			? Number(results?.data?.formatted) > 0
			: false;
		if (!hasBalance && isConnected) {
			setShowModal(true);
			return false;
		}

		return true;
	};

	// Handle deposit logic
	const handleDepositFYT = async () => {
		if (!isConnected) {
			open();
			return;
		}

		if (!validateInput()) {
			return;
		}

		if (Number(balance) < Number(amount)) {
			toast({
				variant: "destructive",
				title: "Transaction Rejected",
				description: "You don't have enough FYT tokens for the transaction",
			});
			return;
		}

		try {
			const amountInWei = parseEther(amount);

			// Check if we need approval
			if (!allowance || Number(allowance) < Number(amountInWei)) {
				if (approveSimulator?.request) {
					approve(approveSimulator.request, {
						onError(error) {
							console.log(error);
							toast({
								variant: "destructive",
								title: "Transaction Rejected",
								description: "You rejected the transaction",
							});
							return;
						},
						onSuccess: () => {
							toast({
								title: "Transaction Successful",
								description: "Transaction Approved",
							});
							// After approval succeeds, proceed with deposit
							// console.log("success open deposit");
							deposit(
								{
									...getYieldPoolConfig("deposit", [
										parseEther(amount),
										durationInSeconds,
									]),
								},
								{
									onSuccess() {
										toast({
											title: "Deposit Successful",
											description: "Transaction Successful",
										});
										queryClient.invalidateQueries();
										setAmount("");
									},
									onError(error) {
										console.log(error);
										if (error.message.includes("User rejected the request")) {
											toast({
												variant: "destructive",
												title: "Transaction Rejected",
												description: "You rejected the transaction",
											});
										}
									},
								}
							);
						},
					});
				}
				refetchAllowance();
			} else {
				// If already approved deposit
				deposit(
					{
						...getYieldPoolConfig("deposit", [
							parseEther(amount),
							durationInSeconds,
						]),
					},
					{
						onSuccess(data) {
							console.log(data);
							toast({
								title: "Deposit Successful",
								description: "Transaction Successful",
							});
							queryClient.invalidateQueries();
							setAmount("");
						},
						onError(error) {
							console.log(error);
							if (error.message.includes("User rejected the request")) {
								toast({
									variant: "destructive",
									title: "Transaction Rejected",
									description: "You rejected the transaction",
								});
							}
						},
					}
				);
			}
		} catch (error) {
			console.error("Transaction failed:", error);
			toast({
				variant: "destructive",
				title: "Transaction failed",
				description:
					error instanceof Error ? error.message : "Unknown error occurred",
			});
		}
	};

	const isTransactionInProgress = isApprovePending || isDepositPending;

	return (
		<>
			<Card className="md:col-span-1 w-full bg-[#1A1B1F] text-white border-none">
				<Tabs defaultValue="stake">
					<CardHeader>
						<TabsList className="w-fit ml-auto">
							<TabsTrigger value="stake">Stake and Earn</TabsTrigger>
							<TabsTrigger value="learn">Learn and Earn</TabsTrigger>
						</TabsList>
					</CardHeader>

					<CardContent className="space-y-5">
						<TabsContent value="stake" className="space-y-3">
							<div>
								<label className="text-sm text-gray-500">Amount</label>
								<div className="flex items-center gap-2">
									<Input
										className="border-white/20 focus:border-white"
										type="number"
										placeholder="Enter FYT amount"
										value={amount}
										onChange={(e) => setAmount(e.target.value)}
										disabled={isTransactionInProgress}
										min="0"
										step="0.000001"
									/>
								</div>
							</div>
							<div>
								<label className="text-sm text-gray-500">
									Lock Duration (Days)
								</label>
								<Input
									className="border-white/20 focus:border-white"
									type="number"
									placeholder="Enter duration"
									value={duration}
									onChange={(e) => setDuration(e.target.value)}
									disabled={isTransactionInProgress}
									min="1"
								/>
							</div>
							<div className="pt-4">
								<Button
									disabled={isTransactionInProgress}
									type="button"
									className={cn(
										"flex w-full disabled:bg-[#0E76FD80] bg-[#0E76FD] enabled:hover:bg-[#0E76FD80] active:bg-[#0E76FD] text-white border-none items-center gap-2"
									)}
									onClick={handleDepositFYT}
								>
									{isTransactionInProgress ? (
										<>
											<div className="size-6 rounded-full animate-[spin_0.5s_linear_infinite] border-b-transparent border-[3px] border-white" />
											{isApprovePending
												? "Waiting for Approval..."
												: isDepositPending
												? "Waiting For Deposit Approval..."
												: "Checking..."}
										</>
									) : (
										"Deposit EDU"
									)}
								</Button>
							</div>
						</TabsContent>
						<LearnSteps />
					</CardContent>
				</Tabs>
			</Card>
			<Modal setShowModal={setShowModal} showModal={showModal} />
		</>
	);
};

export default DepositForm;
