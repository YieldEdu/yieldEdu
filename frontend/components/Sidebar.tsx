"use client";

import {
	BarChart2,
	Book,
	CreditCard,
	Crown,
	LineChart,
	Lock,
	Settings,
	Trophy,
	Users,
	Wallet,
	PanelLeft,
} from "lucide-react";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import YieldEDUIcon from "@/public/icon.png";
import { GlobalContext } from "@/context/globalContext";
import { cn } from "@/lib/utils";

const Sidebar = () => {
	const [activeTab, setActiveTab] = useState("dashboard");
	const { setSidebarOpen, sidebarOpen } = useContext(GlobalContext);
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				// 1024px is the 'lg' breakpoint in Tailwind
				setSidebarOpen(true);
			} else {
				setSidebarOpen(false);
			}
		};

		// Initial check
		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [setSidebarOpen]);

	return (
		<>
			<div className="relative flex h-screen">
				{/* Sidebar - Desktop */}
				<aside
					className={cn(
						"fixed inset-y-0 left-0 z-50 bg-white dark:bg-slate-900/90 border-r border-slate-200 dark:border-slate-800/60 transform transition-all duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:flex backdrop-blur-md",
						{
							"w-24": !sidebarOpen,
							"w-3/4 sm:w-1/2 md:w-1/3 lg:w-full": sidebarOpen,
						},
						{
							"translate-x-0": sidebarOpen,
							"-translate-x-full": !sidebarOpen,
						}
					)}
				>
					<div className=" flex flex-col justify-center h-full w-full">
						<div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
							<div className="flex items-center justify-between gap-3 w-full">
								<Image
									src={YieldEDUIcon}
									alt="YieldStake Logo"
									className="size-14 aspect-square"
								/>
								{sidebarOpen && (
									<div>
										<h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-yellow-500">
											YieldStake
										</h1>
										<p className="text-xs text-slate-500 dark:text-slate-400">
											Learn & Earn Protocol
										</p>
									</div>
								)}

								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger
											onClick={() => setSidebarOpen(!sidebarOpen)}
											className={cn(
												"text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300",
												{
													"hidden lg:flex fixed -right-6": !sidebarOpen,
												}
											)}
										>
											<PanelLeft className="w-5 h-5" />
										</TooltipTrigger>
										<TooltipContent>
											<p>Toggle sidebar</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
						</div>

						<div className="flex-1 overflow-y-auto py-4 px-3">
							<div className="mb-6">
								{sidebarOpen && (
									<p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 px-3">
										Main
									</p>
								)}
								<nav className="space-y-1">
									<TooltipProvider>
										<SidebarLink
											icon={<LineChart className="w-5 h-5" />}
											label="Dashboard"
											active={activeTab === "dashboard"}
											onClick={() => setActiveTab("dashboard")}
										/>

										<SidebarLink
											icon={<Book className="w-5 h-5" />}
											label="Learn"
											active={activeTab === "learn"}
											onClick={() => setActiveTab("learn")}
										/>

										<SidebarLink
											icon={<Lock className="w-5 h-5" />}
											label="Stake"
											active={activeTab === "stake"}
											onClick={() => setActiveTab("stake")}
										/>

										<SidebarLink
											icon={<Trophy className="w-5 h-5" />}
											label="Rewards"
											active={activeTab === "rewards"}
											onClick={() => setActiveTab("rewards")}
										/>
									</TooltipProvider>
								</nav>
							</div>

							<hr className="border-slate-200 dark:border-slate-800 my-4" />

							{sidebarOpen && (
								<p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 px-3">
									Analytics
								</p>
							)}
							<div className="mb-6">
								<nav className="space-y-1">
									<TooltipProvider>
										<SidebarLink
											icon={<BarChart2 className="w-5 h-5" />}
											label="Protocol Stats"
											active={activeTab === "stats"}
											onClick={() => setActiveTab("stats")}
										/>

										<SidebarLink
											icon={<Users className="w-5 h-5" />}
											label="Community"
											active={activeTab === "community"}
											onClick={() => setActiveTab("community")}
										/>
									</TooltipProvider>
								</nav>
							</div>

							<hr className="border-slate-200 dark:border-slate-800 my-4" />
							{sidebarOpen && (
								<p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 px-3">
									Account
								</p>
							)}
							<div className="mb-6">
								<nav className="space-y-1">
									<TooltipProvider>
										<SidebarLink
											icon={<Wallet className="w-5 h-5" />}
											label="Portfolio"
											active={activeTab === "portfolio"}
											onClick={() => setActiveTab("portfolio")}
										/>

										<SidebarLink
											icon={<CreditCard className="w-5 h-5" />}
											label="Transactions"
											active={activeTab === "transactions"}
											onClick={() => setActiveTab("transactions")}
										/>

										<SidebarLink
											icon={<Settings className="w-5 h-5" />}
											label="Settings"
											active={activeTab === "settings"}
											onClick={() => setActiveTab("settings")}
										/>
									</TooltipProvider>
								</nav>
							</div>
						</div>
						<div className="p-4 border-t border-slate-200 dark:border-slate-800/60">
							<div
								className={cn("flex items-center gap-2", {
									"gap-0 justify-center": !sidebarOpen,
								})}
							>
								<div className="w-8 h-8 rounded-full bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center">
									<Crown className="w-4 h-4 text-lime-600 dark:text-lime-400" />
								</div>
								{sidebarOpen && (
									<div>
										<p className="text-sm font-medium text-slate-900 dark:text-white">
											Level 2
										</p>
										<p className="text-xs text-slate-500 dark:text-slate-400">
											Scholar
										</p>
									</div>
								)}
							</div>
							{/* <button className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
									<ChevronLeft className="w-5 h-5" />
								</button> */}
						</div>
					</div>
				</aside>
			</div>
		</>
	);
};

export default Sidebar;

function SidebarLink({
	icon,
	label,
	active,
	onClick,
}: {
	onClick: () => void;
	active: boolean;
	label: string;
	icon: React.JSX.Element;
}) {
	const { sidebarOpen } = useContext(GlobalContext);

	return (
		<Tooltip>
			<TooltipTrigger
				onClick={onClick}
				className={cn(
					"flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-colors",
					{
						"bg-lime-100 dark:bg-lime-500/10 text-lime-700 dark:text-lime-400":
							active,
						"text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60":
							!active,
						"gap-0 justify-center w-fit mx-auto": !sidebarOpen,
					}
				)}
			>
				<span
					className={cn({
						"text-lime-600 dark:text-lime-400": active,
						"text-slate-500 dark:text-slate-400": !active,
					})}
				>
					{icon}
				</span>

				{sidebarOpen ? (
					<span className="font-medium">{label}</span>
				) : (
					<TooltipContent>
						<span className="font-medium">{label}</span>
					</TooltipContent>
				)}
			</TooltipTrigger>
		</Tooltip>
	);
}
