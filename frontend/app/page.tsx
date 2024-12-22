"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { Wallet, ArrowUpRight, Lock, Timer, DollarSign } from "lucide-react";

const FixedYieldDashboard = () => {
	const [amount, setAmount] = useState("");
	const [duration, setDuration] = useState("30");
	const [loading, setLoading] = useState(false);

	// Mock data for chart
	const yieldData = [
		{ name: "Week 1", apy: 10 },
		{ name: "Week 2", apy: 10.2 },
		{ name: "Week 3", apy: 10.5 },
		{ name: "Week 4", apy: 10.8 },
	];

	// Mock user position data
	const userPosition = {
		deposited: "1000",
		yield: "25.5",
		timeLeft: "25 days",
	};

	return (
		<div className="min-h-screen bg-gray-50 p-4 md:p-8">
			<div className="max-w-7xl mx-auto space-y-6">
				{/* {/_ Header _/} */}
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
					<div>
						<h1 className="text-3xl font-bold">Fixed Yield Protocol</h1>
						<p className="text-gray-600">
							Earn guaranteed yields on your EDU tokens
						</p>
					</div>
					<Button variant="outline" className="flex items-center gap-2">
						<Wallet className="w-4 h-4" />
						Connect Wallet
					</Button>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Card>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-gray-600">TVL</p>
									<p className="text-2xl font-bold">$1.2M</p>
								</div>
								<ArrowUpRight className="w-8 h-8 text-green-500" />
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-gray-600">Base APY</p>
									<p className="text-2xl font-bold">10%</p>
								</div>
								<DollarSign className="w-8 h-8 text-blue-500" />
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-gray-600">Total Stakers</p>
									<p className="text-2xl font-bold">1,234</p>
								</div>
								<Lock className="w-8 h-8 text-purple-500" />
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Main Content */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* Left Panel - Deposit Form */}
					<Card className="md:col-span-1">
						<CardHeader>
							<CardTitle>Deposit EDU</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<label className="text-sm text-gray-600">Amount</label>
								<Input
									type="number"
									placeholder="Enter EDU amount"
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
								/>
							</div>
							<div>
								<label className="text-sm text-gray-600">
									Lock Duration (Days)
								</label>
								<Input
									type="number"
									placeholder="Enter duration"
									value={duration}
									onChange={(e) => setDuration(e.target.value)}
								/>
							</div>
							<div className="pt-4">
								<Button className="w-full" onClick={() => setLoading(true)}>
									{loading ? "Processing..." : "Deposit EDU"}
								</Button>
							</div>
						</CardContent>
					</Card>

					{/* Right Panel - Position & Stats */}
					<Card className="md:col-span-2">
						<Tabs defaultValue="position">
							<CardHeader>
								<div className="flex justify-between items-center">
									<CardTitle>Your Position</CardTitle>
									<TabsList>
										<TabsTrigger value="position">Position</TabsTrigger>
										<TabsTrigger value="analytics">Analytics</TabsTrigger>
									</TabsList>
								</div>
							</CardHeader>
							<CardContent>
								<TabsContent value="position">
									<div className="space-y-6">
										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											<div className="bg-gray-50 p-4 rounded-lg">
												<p className="text-sm text-gray-600">Deposited</p>
												<p className="text-xl font-bold">
													{userPosition.deposited} EDU
												</p>
											</div>
											<div className="bg-gray-50 p-4 rounded-lg">
												<p className="text-sm text-gray-600">Current Yield</p>
												<p className="text-xl font-bold">
													{userPosition.yield} EDU
												</p>
											</div>
											<div className="bg-gray-50 p-4 rounded-lg">
												<p className="text-sm text-gray-600">Time Left</p>
												<p className="text-xl font-bold">
													{userPosition.timeLeft}
												</p>
											</div>
										</div>
										<Alert>
											<Timer className="w-4 h-4" />
											<AlertDescription>
												Your position will be available for withdrawal in{" "}
												{userPosition.timeLeft}
											</AlertDescription>
										</Alert>
									</div>
								</TabsContent>
								<TabsContent value="analytics">
									<div className="h-64">
										<ResponsiveContainer width="100%" height="100%">
											<LineChart data={yieldData}>
												<CartesianGrid strokeDasharray="3 3" />
												<XAxis dataKey="name" />
												<YAxis />
												<Tooltip />
												<Line
													type="monotone"
													dataKey="apy"
													stroke="#8884d8"
													strokeWidth={2}
												/>
											</LineChart>
										</ResponsiveContainer>
									</div>
								</TabsContent>
							</CardContent>
						</Tabs>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default FixedYieldDashboard;
