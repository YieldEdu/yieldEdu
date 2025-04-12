import Performance from "@/components/Performance";
import StakingCard from "@/components/StakingCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { yieldEduMetadata } from "@/utils/metadata";
import {
	Book,
	GraduationCap,
	Wallet,
	LineChart,
	Sparkles,
	Trophy,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	...yieldEduMetadata,
	title: "YieldEdu - Stake tokens",
	description:
		"Stake your EDU tokens to earn rewards, track your staking stats, and boost your APY by completing lessons.",
};

const Page = () => {
	return (
		<div className="container space-y-6 mx-auto">
			<div className="flex justify-between flex-wrap gap-2 items-center mb-6">
				<div>
					<h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
						Stake Your EDU
					</h1>
					<p className="text-slate-500 dark:text-slate-400">
						Earn rewards by staking your EDU tokens
					</p>
				</div>
				<div className="flex items-center gap-3">
					<Badge className="bg-lime-100 dark:bg-lime-400/20 text-lime-600 dark:text-lime-400 border-lime-200 dark:border-lime-400/30 px-3 py-1">
						<Wallet className="w-4 h-4 mr-1" />
						Balance: 5,432 EDU
					</Badge>
				</div>
			</div>

			<div className="flex flex-col lg:flex-row gap-6">
				<StakingCard className="col-span-2 flex-1">
					<div className="bg-slate-100 dark:bg-slate-900/50 rounded-xl p-4">
						<div className="flex justify-between mb-2">
							<span className="text-slate-700 dark:text-slate-300 font-medium">
								Estimated Rewards
							</span>
							<span className="text-yellow-600 dark:text-yellow-400 font-medium">
								+168.75 EDU
							</span>
						</div>
						<p className="text-xs text-slate-500 dark:text-slate-400">
							Based on current APY and selected lock period
						</p>
					</div>
				</StakingCard>

				<div>
					<Card className="bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 backdrop-blur-sm shadow-sm">
						<CardHeader>
							<CardTitle className="text-slate-900 dark:text-white">
								Staking Stats
							</CardTitle>
							<CardDescription className="text-slate-500 dark:text-slate-400">
								Your current staking metrics
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="bg-slate-100 dark:bg-slate-900/50 rounded-xl p-4">
								<div className="flex justify-between items-center mb-3">
									<span className="text-slate-500 dark:text-slate-400 text-sm">
										Total Staked
									</span>
									<Badge className="bg-lime-100 dark:bg-lime-400/20 text-lime-600 dark:text-lime-400 border-lime-200 dark:border-lime-400/30">
										4 Positions
									</Badge>
								</div>
								<div className="text-2xl flex justify-between font-bold text-slate-900 dark:text-white">
									3,500 EDU
									<LineChart />
								</div>
							</div>

							<div className="bg-slate-100 dark:bg-slate-900/50 rounded-xl p-4">
								<div className="text-slate-500 dark:text-slate-400 text-sm mb-3">
									Total Rewards Earned
								</div>
								<div className="text-2xl flex justify-between font-bold text-yellow-600 dark:text-yellow-400">
									+245.32 EDU
									<Trophy />
								</div>
							</div>

							<div className="bg-slate-100 dark:bg-slate-900/50 rounded-xl p-4">
								<div className="text-slate-500 dark:text-slate-400 text-sm mb-3">
									Average APY
								</div>
								<div className="text-2xl flex justify-between font-bold text-lime-600 dark:text-lime-400">
									11.8%
									<Sparkles />
								</div>
							</div>

							<div className="bg-gradient-to-r from-lime-100 to-yellow-100 dark:from-lime-500/20 dark:to-yellow-500/20 rounded-xl p-4 border border-lime-200 dark:border-lime-500/30">
								<div className="flex items-center gap-2 mb-2">
									<GraduationCap className="w-5 h-5 text-lime-600 dark:text-lime-400" />
									<span className="text-slate-700 dark:text-slate-200 font-medium">
										Learning Boost
									</span>
								</div>
								<p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
									Complete more lessons to increase your APY
								</p>
								<Link href={"/dashboard/learn"}>
									<Button
										variant="outline"
										className="w-full border-lime-300 dark:border-lime-500/50 text-lime-700 dark:text-lime-400 hover:bg-lime-50 dark:hover:bg-lime-500/10"
									>
										<Book className="w-4 h-4 mr-2" />
										Go to Learning Center
									</Button>
								</Link>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
			<Performance />
		</div>
	);
};

export default Page;
