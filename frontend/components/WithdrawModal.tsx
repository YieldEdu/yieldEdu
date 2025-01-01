"use client";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { IActivePosition } from "@/app/page";
import { useSearchParams } from "next/navigation";
import { useSimulateContract, useWriteContract } from "wagmi";

import { getYieldPoolConfig } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const WithdrawModal = ({
	showWithdrawModal,
	setShowWithDrawModal,
	positions,
}: {
	showWithdrawModal: boolean;
	setShowWithDrawModal: Dispatch<SetStateAction<boolean>>;
	positions: IActivePosition[];
}) => {
	const searchParams = useSearchParams();
	const positionId = searchParams.get("positionId");
	const position = positions.find((p) => Number(p.id) === Number(positionId));

	const { writeContract: withDraw, isPending: isPendingWithDraw } =
		useWriteContract();

	const { data: approveSimulator, failureReason } = useSimulateContract({
		...getYieldPoolConfig("withdraw", [positionId]),
	});
	const handleWithdraw = async () => {
		try {
			if (failureReason?.message?.includes("Still locked")) {
				toast({
					variant: "destructive",
					title: "Transaction Failed: Tokens still locked",
				});
				return;
			}
			if (approveSimulator?.request) {
				withDraw(approveSimulator.request, {
					onSuccess() {
						toast({
							title: "Transaction Successful",
							description: "Withdrawal was a success",
						});
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
				});
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.log(error);
		}
	};
	return (
		<Dialog
			modal={true}
			open={showWithdrawModal}
			onOpenChange={setShowWithDrawModal}
		>
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
							{position?.amount ? `${position.amount} FYT` : "N/A"}
						</p>
					</div>
					<div className="bg-zinc-900 p-4 rounded-lg w-full">
						<p className="text-sm  text-slate-400">Current Yield</p>
						<p className="text-xl font-bold">
							{position?.expectedYield
								? `${Number(position.expectedYield).toFixed(8)} FYT`
								: "N/A"}
						</p>
					</div>
				</div>
				<div className="bg-zinc-800 p-4 rounded-lg">
					<p className="text-sm  text-slate-400">Expected Earn</p>
					<p className="text-xl font-bold">
						{position?.expectedYield
							? `${Number(position?.amount + position.expectedYield).toFixed(
									8
							  )} FYT`
							: "N/A"}
					</p>
				</div>
				<Button
					disabled={
						isPendingWithDraw ||
						failureReason?.message?.includes("Still locked")
					}
					onClick={handleWithdraw}
					type="button"
					variant={"default"}
					className="bg-green-600 w-full disabled:bg-green-700 enabled:hover:bg-green-500 active:bg-green-600"
				>
					<>
						{isPendingWithDraw && (
							<div className="size-6 rounded-full animate-[spin_0.5s_linear_infinite] border-b-transparent border-[3px] border-white" />
						)}
						{isPendingWithDraw
							? "Please wait..."
							: failureReason?.message?.includes("Still locked")
							? "Still Locked"
							: "Withdraw"}
					</>
				</Button>
			</DialogContent>
		</Dialog>
	);
};

export default WithdrawModal;
