"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { ActivePosition } from "@/app/page";
import { useAppKitAccount } from "@reown/appkit/react";

interface AnalyticsProps {
	positions: ActivePosition[];
}

const chartConfig = {
	amount: {
		label: "Amount Staked",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

const Analytics = ({ positions }: AnalyticsProps) => {
	const [activeChart] = React.useState<keyof typeof chartConfig>("amount");
	const { address } = useAppKitAccount();

	const chartData = positions.map((position) => ({
		date: new Date(Number(position.startTime) * 1000).toISOString(),
		amount: position.amount,
		isUser: position.positionAddress?.toLowerCase() === address?.toLowerCase(),
		fill: position.positionAddress === address ? "#22c55e" : "#0E76FD",
	}));

	if (!positions || positions.length === 0) {
		return (
			<Card className="bg-zinc-800 border-none">
				<CardContent className="px-2 sm:p-6 flex items-center justify-center h-[200px]">
					<p className="text-slate-400">No data available</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="bg-zinc-800 border-none">
			<CardContent className="px-2 sm:p-6">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[200px] w-full"
				>
					<BarChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const date = new Date(value);
								return date.toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
								});
							}}
						/>
						<ChartTooltip
							content={
								<ChartTooltipContent
									className="w-[150px] bg-zinc-900 border-zinc-800 text-white"
									nameKey="amount"
									labelFormatter={(value) => {
										const date = new Date(value).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
											year: "numeric",
										});
										const dataPoint = chartData.find((d) => d.date === value);
										return `${date}${dataPoint?.isUser ? " (You)" : ""}`;
									}}
								/>
							}
						/>
						<Bar dataKey={activeChart} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default Analytics;
