"use client";

import React, { useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import YieldEDUIcon from "@/public/icon2.png";
import { Crown, Menu } from "lucide-react";
import {
	ThemeMode,
	useAppKit,
	useAppKitAccount,
	useAppKitTheme,
} from "@reown/appkit/react";
import { useTheme } from "next-themes";
import { GlobalContext } from "@/context/globalContext";
import AppKitButton from "./AppKitButton";
import Feedback from "./Feedback";
import { handleUserUpdate } from "@/utils/supabase/helpers";

import FaucetButton from "@/components/ui/FaucetButton";

const DashboardHeader = () => {
	const { open } = useAppKit();
	const { theme } = useTheme();
	const { setThemeMode } = useAppKitTheme();
	const { isConnected, address } = useAppKitAccount();

	const { setSidebarOpen, sidebarOpen } = useContext(GlobalContext);

	useEffect(() => {
		setThemeMode(theme as ThemeMode);
	}, [theme, setThemeMode]);

	useEffect(() => {
		const updateUser = async () => {
			if (isConnected && address) {
				// Update the user in the database
				await handleUserUpdate(isConnected, address);
			} else {
				console.error("Wallet connection failed or address is unavailable.");
			}
		};

		updateUser();
	}, [address, isConnected]);

	return (
		<>
			{/* Overlay */}
			{sidebarOpen && (
				<div
					className="fixed lg:hidden inset-0 bg-blue-500/20 backdrop-blur-sm z-30"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<header className="border-b px-5 z-20 h-[70px] md:h-[89px] border-slate-200 dark:border-slate-800/60 fixed w-full top-0 backdrop-blur-md bg-white/80 dark:bg-slate-900/80">
				<div className="flex justify-between items-center h-full">
					<div className="flex items-center justify-between gap-4">
						<Button
							variant="ghost"
							className="text-gray-300 lg:hidden hover:text-white bg-lime-600 dark:bg-lime-800 hover:bg-lime-700 transition-colors"
							onClick={() => setSidebarOpen(true)}
						>
							{!sidebarOpen && <Menu className="size-10 text-white" />}
						</Button>

						<div className="hidden lg:hidden sm:flex items-center gap-3">
							<Image
								src={YieldEDUIcon}
								alt="YieldEdu Logo"
								className="size-14 aspect-square"
								priority
							/>
							<div>
								<h1 className="text-2xl  font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-yellow-500">
									YieldEDU
								</h1>
								<p className="text-sm text-slate-500 dark:text-slate-400">
									Learn, Stake and Earn
								</p>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-4">
						<FaucetButton userAddress={address} />
						<Feedback className="hidden md:flex">
							<Button
								className="hover:bg-transparent border-none bg-transparent text-slate-600 font-semibold dark:text-white hover:text-lime-500 dark:hover:text-lime-500"
								variant="outline"
							>
								Feedback
							</Button>
						</Feedback>
						<Button
							variant="ghost"
							className="hidden md:flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-lime-500 hover:bg-lime-500/10"
						>
							<Crown className="w-4 h-4" />
							<span>Level 2</span>
						</Button>
						{!isConnected ? (
							<Button
								type="button"
								onClick={() => open({ view: "Connect" })}
								className="bg-gradient-to-r from-lime-500 to-yellow-500 text-slate-900 font-semibold hover:opacity-90"
							>
								Connect Wallet
							</Button>
						) : (
							<AppKitButton />
						)}
					</div>
				</div>
			</header>
		</>
	);
};

export default DashboardHeader;
