"use client";

import { toast } from "@/hooks/use-toast";
import { getYieldPoolConfig } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { useWriteContract } from "wagmi";
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

const UnstakeScreen = ({
	amount,
	expectedYield,
	positionId,
	setShowWithDrawModal,
}: {
	amount?: number;
	expectedYield?: number;
	positionId: string | null;
	setShowWithDrawModal: Dispatch<SetStateAction<boolean>>;
}) => {
	const queryClient = useQueryClient();

	let penalty;
	let amountToReturn;
	if (amount) {
		penalty = amount / 10; // 10% penalty
		amountToReturn = amount - penalty;
	}

	const { writeContract: Unstake, isPending: unstakePending } =
		useWriteContract();

	const handleUnstake = async () => {
		try {
			Unstake(
				{ ...getYieldPoolConfig("unstake", [positionId]) },
				{
					onSuccess() {
						toast({
							title: "Transaction Successful",
							description: "Unstake was a success",
						});
						queryClient.invalidateQueries();
						setShowWithDrawModal(false);
						window.history.pushState({}, "", `/`);
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
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.log(error);
		}
	};
	return (
		<DialogContent className="m-2">
			<DialogHeader>
				<DialogTitle>Unstake</DialogTitle>
				<DialogDescription className="space-y-4 pt-3 text-red-400">
					Continuing this process will result in a 10% penalty on your staked
					amount, reducing your expected yields.
				</DialogDescription>
			</DialogHeader>
			<div className="flex items-center gap-3 w-full">
				<div className="bg-zinc-900 p-4 rounded-lg w-full">
					<p className="text-sm text-slate-400">Deposited</p>
					<p className="text-xl font-bold">
						{amount ? `${amount} FYT` : "N/A"}
					</p>
				</div>
				<div className="bg-zinc-900 p-4 rounded-lg w-full">
					<p className="text-sm  text-slate-400">Current Yield</p>
					<p className="text-xl font-bold">
						{expectedYield ? `${Number(expectedYield).toFixed(8)} FYT` : "N/A"}
					</p>
				</div>
			</div>
			<div className="bg-zinc-800 p-4 rounded-lg">
				<p className="text-sm  text-slate-400">Expected Earn</p>
				<p className="text-xl font-bold">
					{amountToReturn ? `${Number(amountToReturn).toFixed(4)} FYT` : "N/A"}
				</p>
			</div>
			<Button
				disabled={unstakePending}
				onClick={handleUnstake}
				type="button"
				variant={"default"}
				className="bg-green-600 w-full disabled:bg-green-700 enabled:hover:bg-green-500 active:bg-green-600"
			>
				<>
					{unstakePending && (
						<div className="size-6 rounded-full animate-[spin_0.5s_linear_infinite] border-b-transparent border-[3px] border-white" />
					)}
					{unstakePending ? "Please wait..." : "Unstake"}
				</>
			</Button>
		</DialogContent>
	);
};

export default UnstakeScreen;
