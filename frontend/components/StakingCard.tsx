"use client";

import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { GraduationCap, Lock } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
// import { getStransactions, storeTransaction } from "@/utils/supabase/helpers";

const StakingCard = () => {
	const [amount, setAmount] = useState("");
	const [lockDuration, setLockDuration] = useState("30");

	const handleStake = async () => {
		// const { data, error } = await storeTransaction({
		// 	transactionHash: "hello",
		// 	user_id: "dkfkdsjflksdjfsdf",
		// });
		// if (error) {
		// 	console.log(error);
		// }
		// if (data) {
		// 	console.log(data);
		// }
		//get transactions
		// const {data,error} = await getStransactions();
	};

	return (
		<Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 backdrop-blur-sm shadow-sm">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
					<GraduationCap className="w-5 h-5 text-lime-500" />
					Stake EDU
				</CardTitle>
				<CardDescription className="text-slate-500 dark:text-slate-400">
					Stake your EDU tokens to earn rewards
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div>
						<label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">
							Amount
						</label>
						<Input
							type="text"
							placeholder="Enter EDU amount"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							className="bg-slate-100 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
						/>
					</div>
					<div>
						<label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">
							Lock Duration
						</label>
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
							{["30", "60", "90"].map((days) => (
								<Button
									key={days}
									variant="outline"
									className={`border-slate-200 dark:border-slate-700 ${
										lockDuration === days
											? "bg-gradient-to-r from-lime-500 to-yellow-500 text-slate-900 border-transparent"
											: "bg-white dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
									}`}
									onClick={() => setLockDuration(days)}
								>
									{days} Days
								</Button>
							))}
							<Input
								type="text"
								placeholder="Custom"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								className="bg-slate-100 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
							/>
						</div>
					</div>
					<div className="bg-slate-100 dark:bg-slate-900/50 rounded-xl p-4 space-y-2">
						<div className="flex justify-between text-sm">
							<span className="text-slate-500 dark:text-slate-400">
								Base APY
							</span>
							<span className="text-slate-900 dark:text-slate-100">10.0%</span>
						</div>
						<div className="flex justify-between text-sm">
							<span className="text-slate-500 dark:text-slate-400">
								Bonus APY
							</span>
							<span className="text-lime-600 dark:text-lime-400">+2.5%</span>
						</div>
						<div className="border-t border-slate-200 dark:border-slate-700/50 pt-2 mt-2">
							<div className="flex justify-between font-medium">
								<span className="text-slate-700 dark:text-slate-300">
									Total APY
								</span>
								<span className="text-yellow-600 dark:text-yellow-400">
									12.5%
								</span>
							</div>
						</div>
					</div>
					<Button
						onClick={handleStake}
						className="w-full bg-gradient-to-r from-lime-500 to-yellow-500 text-slate-800 font-semibold hover:opacity-90"
					>
						<Lock className="w-4 h-4 mr-2" />
						Stake Now
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default StakingCard;
