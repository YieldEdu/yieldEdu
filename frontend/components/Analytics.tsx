"use client";

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { TabsContent } from "./ui/tabs";

const Analytics = () => {
	// Mock data for chart
	const yieldData = [
		{ name: "Week 1", apy: 10 },
		{ name: "Week 2", apy: 10.2 },
		{ name: "Week 3", apy: 10.5 },
		{ name: "Week 4", apy: 10.8 },
	];
	return (
		<TabsContent value="analytics">
			<div className="h-44">
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
	);
};

export default Analytics;
