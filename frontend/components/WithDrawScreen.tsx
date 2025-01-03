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

const WithDrawScreen = ({
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

	const { writeContract: withDraw, isPending: isPendingWithDraw } =
		useWriteContract();

	const handleWithdraw = async () => {
		try {
			withDraw(
				{ ...getYieldPoolConfig("withdraw", [positionId]) },
				{
					onSuccess() {
						toast({
							title: "Transaction Successful",
							description: "Withdrawal was a success",
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
							return;
						}
						if (error.message.includes("Still locked")) {
							toast({
								variant: "destructive",
								title: "Transaction Failed: Tokens still locked",
							});
							return;
						}
						toast({
							variant: "destructive",
							title: "Transaction Failed: something was wrong or still locked",
						});
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
				<DialogTitle>Withdraw</DialogTitle>
				<DialogDescription className="space-y-4 pt-3">
					<p>This process mostly takes a few minutes.</p>
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
					{expectedYield && amount
						? `${Number(amount + expectedYield).toFixed(8)} FYT`
						: "N/A"}
				</p>
			</div>
			<Button
				disabled={isPendingWithDraw}
				onClick={handleWithdraw}
				type="button"
				variant={"default"}
				className="bg-green-600 w-full disabled:bg-green-700 enabled:hover:bg-green-500 active:bg-green-600"
			>
				<>
					{isPendingWithDraw && (
						<div className="size-6 rounded-full animate-[spin_0.5s_linear_infinite] border-b-transparent border-[3px] border-white" />
					)}
					{isPendingWithDraw ? "Please wait..." : "Withdraw"}
				</>
			</Button>
		</DialogContent>
	);
};

export default WithDrawScreen;
