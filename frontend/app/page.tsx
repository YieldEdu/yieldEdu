import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldCheck, Timer, Percent, Vault } from "lucide-react";
import Analytics from "@/components/Analytics";
import DepositForm from "@/components/DepositForm";
import { ActivePositionTable } from "@/components/ActivePositionTable";
import Link from "next/link";
import Image from "next/image";
import X from "@/public/x.svg";
import ConnectButton from "@/components/ui/ConnectButton";
const FixedYieldDashboard = () => {
	const userPosition = {
		deposited: "1000",
		yield: "25.5",
		timeLeft: "25 days",
	};

	return (
		<>
			<main className="min-h-screen flex flex-col">
				<div className=" text-white p-4 md:p-8">
					<div className="max-w-7xl mx-auto space-y-6">
						<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
							<div>
								<h1 className="text-3xl font-bold">YieldStake Protocol</h1>
								<p className="text-gray-400">
									Earn guaranteed yields on your EDU tokens
								</p>
							</div>
							<ConnectButton />
						</div>

						<div className="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-4 gap-4">
							<Card className="bg-[#1A1B1F] border-none text-white">
								<CardContent className="p-6">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-sm text-slate-400">TVL</p>
											<p className="text-4xl font-bold">$1.2M</p>
										</div>
										<ShieldCheck className="size-10 text-green-500" />{" "}
									</div>
								</CardContent>
							</Card>
							<Card className="bg-[#1A1B1F] border-none text-white">
								<CardContent className="p-6">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-sm text-slate-400">Base APY</p>
											<p className="text-3xl md:text-4xl font-bold">10%</p>
										</div>
										<Percent className="size-10 text-green-500" />
									</div>
								</CardContent>
							</Card>
							<Card className="bg-[#1A1B1F] border-none text-white">
								<CardContent className="p-6">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-sm text-slate-400">Total Stakers</p>
											<p className="text-3xl md:text-4xl font-bold">1,234</p>
										</div>
										<Vault className="size-10 text-green-500" />
									</div>
								</CardContent>
							</Card>
							<Card className="bg-[#1A1B1F] border-none text-white">
								<CardContent className="p-6">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-sm text-slate-400">Your Balance</p>
											<p className="text-3xl md:text-4xl font-bold">0.5</p>
										</div>
										<Vault className="size-10 text-green-500" />
									</div>
								</CardContent>
							</Card>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
							<DepositForm />
							<Card className="md:col-span-2 bg-[#1A1B1F] border-none text-white">
								<Tabs
									className="flex flex-col h-full justify-around"
									defaultValue="overview"
								>
									<CardHeader>
										<div className="flex justify-between items-center">
											<CardTitle>Position overview</CardTitle>
											<TabsList>
												<TabsTrigger value="overview">Overview</TabsTrigger>
												<TabsTrigger value="analytics">Analytics</TabsTrigger>
											</TabsList>
										</div>
									</CardHeader>
									<CardContent>
										<TabsContent value="overview">
											<div className="space-y-6 h-full">
												<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
													<div className="bg-zinc-800 p-4 rounded-lg">
														<p className="text-sm text-slate-400">Deposited</p>
														<p className="text-xl font-bold">
															{userPosition.deposited} EDU
														</p>
													</div>
													<div className="bg-zinc-800 p-4 rounded-lg">
														<p className="text-sm  text-slate-400">
															Current Yield
														</p>
														<p className="text-xl font-bold">
															{userPosition.yield} EDU
														</p>
													</div>
													<div className="bg-zinc-800 p-4 rounded-lg">
														<p className="text-sm text-slate-400">Time Left</p>
														<p className="text-xl font-bold">
															{userPosition.timeLeft}
														</p>
													</div>
												</div>
												<Alert className="bg-zinc-800  border-none">
													<AlertDescription className="flex items-center text-white gap-3">
														<Timer className="w-5 h-5" />
														Your position will be available for withdrawal in{" "}
														<span className="text-[#0E76FD]">
															{userPosition.timeLeft}
														</span>
													</AlertDescription>
												</Alert>
											</div>
										</TabsContent>
										<Analytics />
									</CardContent>
								</Tabs>
							</Card>
						</div>
						<ActivePositionTable />
					</div>
				</div>
			</main>

			<footer className="flex  p-4 md:p-8 justify-between items-center text-white py-4">
				<a
					className="hover:underline"
					href="kamasahdickson.vercel.app"
					rel="noopener noreferrer"
					target="_blank"
				>
					Made with ❤️ by Kamasah Dickson
				</a>
				<ul>
					<li>
						<Link
							rel="noopener noreferrer"
							target="_blank"
							href="https://x.com/bruh_codes"
						>
							<Image src={X} alt="bruh_codes" />
						</Link>
					</li>
				</ul>
			</footer>
		</>
	);
};

export default FixedYieldDashboard;
