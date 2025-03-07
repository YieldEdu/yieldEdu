import React, { ReactNode } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { LineChart, Sparkles, Trophy } from "lucide-react";
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
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
					<StatsCard
						title="Total Staked"
						value="1,234.56 EDU"
						change="+12.3%"
						icon={<LineChart className="w-4 h-4" />}
					/>
					<StatsCard
						title="Current APY"
						value="12.5%"
						change="+2.5%"
						icon={<Sparkles className="w-4 h-4" />}
					/>
					<StatsCard
						title="Rewards Earned"
						value="45.67 EDU"
						change="+3.4%"
						icon={<Trophy className="w-4 h-4" />}
					/>
				</div>
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

function StatsCard({
	title,
	value,
	change,
	icon,
}: {
	title: string;
	value: string;
	icon: ReactNode;
	change: string;
}) {
	const isPositive = change.startsWith("+");
	return (
		<div className="bg-slate-100 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700/50">
			<div className="flex justify-between items-start mb-2">
				<span className="text-slate-500 dark:text-slate-400 text-sm">
					{title}
				</span>
				<div className="p-2 bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/50">
					{icon}
				</div>
			</div>
			<div className="flex items-baseline gap-2">
				<span className="text-xl font-semibold text-slate-900 dark:text-white">
					{value}
				</span>
				<span
					className={`text-sm ${
						isPositive
							? "text-lime-600 dark:text-lime-400"
							: "text-red-500 dark:text-red-400"
					}`}
				>
					{change}
				</span>
			</div>
		</div>
	);
}
