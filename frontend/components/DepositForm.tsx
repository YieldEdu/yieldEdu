"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const DepositForm = () => {
	const [amount, setAmount] = useState("");
	const [duration, setDuration] = useState("30");
	const [loading, setLoading] = useState(false);

	return (
		<Card className="md:col-span-1 w-full bg-[#1A1B1F] text-white border-none">
			<Tabs className="flex flex-col h-full" defaultValue="deposit">
				<CardHeader>
					<TabsList className="w-fit ml-auto">
						<TabsTrigger value="deposit">Deposit & Earn</TabsTrigger>
						<TabsTrigger value="stake">Stake EDU</TabsTrigger>
					</TabsList>
				</CardHeader>
				<CardContent>
					<TabsContent value="deposit" className="space-y-5">
						<div>
							<label className="text-sm text-gray-500">Amount</label>
							<div className="flex items-center gap-2">
								<Input
									className="border-white/20 focus:border-white"
									type="number"
									placeholder="Enter EDU amount"
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
								/>
								<Button className="flex w-fit bg-[#0E76FD] hover:bg-[#0E76FD80] active:bg-[#0E76FD] text-white border-none items-center gap-2">
									Max
								</Button>
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
							/>
						</div>
						<div className="pt-4">
							<Button
								className="flex w-full bg-[#0E76FD] hover:bg-[#0E76FD80] active:bg-[#0E76FD] text-white border-none items-center gap-2"
								onClick={() => setLoading(true)}
							>
								{loading ? "Processing..." : "Deposit EDU"}
							</Button>
						</div>
					</TabsContent>
					<TabsContent value="stake" className="space-y-5">
						<div>
							<label className="text-sm text-gray-500">Amount to stake</label>
							<div className="flex items-center gap-2">
								<Input
									className="border-white/20 focus:border-white"
									type="number"
									placeholder="Enter stake amount"
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
								/>
								<Button className="flex w-fit bg-[#0E76FD] hover:bg-[#0E76FD80] active:bg-[#0E76FD] text-white border-none items-center gap-2">
									Max
								</Button>
							</div>
						</div>

						<div className="pt-4">
							<Button
								className="flex w-full bg-[#0E76FD] hover:bg-[#0E76FD80] active:bg-[#0E76FD] text-white border-none items-center gap-2"
								onClick={() => setLoading(true)}
							>
								{loading ? "Processing..." : "Deposit EDU"}
							</Button>
						</div>
					</TabsContent>
				</CardContent>
			</Tabs>
		</Card>
	);
};

export default DepositForm;
