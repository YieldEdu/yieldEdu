import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import {
	Area,
	AreaChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const Performance = () => {
	const chartData = [
		{ date: "Jan 1", apy: 8.2 },
		{ date: "Jan 2", apy: 8.5 },
		{ date: "Jan 3", apy: 8.3 },
		{ date: "Jan 4", apy: 8.8 },
		{ date: "Jan 5", apy: 9.1 },
		{ date: "Jan 6", apy: 9.3 },
		{ date: "Jan 7", apy: 10.0 },
	];

	return (
		<Card className="col-span-2 bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 backdrop-blur-sm shadow-sm">
			<CardHeader>
				<div className="flex flex-wrap gap-2 justify-between items-start">
					<div>
						<CardTitle className="text-slate-900 dark:text-white">
							Performance
						</CardTitle>
						<CardDescription className="text-slate-500 dark:text-slate-400">
							Your staking performance and rewards
						</CardDescription>
					</div>
					<Tabs defaultValue="apy">
						<TabsList>
							<TabsTrigger
								value="apy"
								className="data-[state=active]:bg-lime-500 data-[state=active]:text-white dark:data-[state=active]:text-slate-900"
							>
								APY
							</TabsTrigger>
							<TabsTrigger
								value="rewards"
								className="data-[state=active]:bg-lime-500 data-[state=active]:text-white dark:data-[state=active]:text-slate-900"
							>
								Rewards
							</TabsTrigger>
							<TabsTrigger
								value="tvl"
								className="data-[state=active]:bg-lime-500 data-[state=active]:text-white dark:data-[state=active]:text-slate-900"
							>
								TVL
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>
			</CardHeader>
			<CardContent>
				<div className="h-[300px] mt-4 ">
					<ResponsiveContainer
						width="100%"
						height="100%"
						initialDimension={{ height: 100, width: 100 }}
					>
						<AreaChart data={chartData}>
							<defs>
								<linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
									<stop offset="0%" stopColor="#84cc16" stopOpacity={0.3} />
									<stop offset="100%" stopColor="#84cc16" stopOpacity={0} />
								</linearGradient>
							</defs>
							<XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
							<YAxis
								stroke="#94a3b8"
								fontSize={12}
								tickFormatter={(value) => `${value}%`}
							/>
							<Tooltip
								contentStyle={{
									backgroundColor: "#ffffff",
									border: "1px solid #e2e8f0",
									borderRadius: "0.5rem",
									color: "#1e293b",
								}}
								labelStyle={{ color: "#64748b" }}
							/>
							<Area
								type="monotone"
								dataKey="apy"
								stroke="#84cc16"
								fill="url(#areaGradient)"
								strokeWidth={2}
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
};

export default Performance;
