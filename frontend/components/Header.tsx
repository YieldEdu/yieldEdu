"use client";

import React, { useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import YieldEDUIcon from "@/public/icon.png";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Crown, Menu } from "lucide-react";
import {
	ThemeMode,
	useAppKit,
	useAppKitAccount,
	useAppKitTheme,
} from "@reown/appkit/react";
import { useTheme } from "next-themes";
import { GlobalContext } from "@/context/globalContext";

const Header = () => {
	const { open } = useAppKit();
	const { theme } = useTheme();
	const { setThemeMode } = useAppKitTheme();
	const { isConnected } = useAppKitAccount();

	const { setSidebarOpen, sidebarOpen } = useContext(GlobalContext);

	useEffect(() => {
		setThemeMode(theme as ThemeMode);
	}, [theme, setThemeMode]);

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

			<header className="border-b z-20 h-[89px] border-slate-200 dark:border-slate-800/60 fixed w-full top-0 backdrop-blur-md bg-white/80 dark:bg-slate-900/80">
				<div className="container lg:max-w-8xl mx-auto h-full px-5 md:px-0">
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
									alt="YieldStake Logo"
									className="size-14 aspect-square"
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
							<ThemeSwitcher />
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
								// {/* @ts-expect-error msg */}
								// {/* @ts-ignore */}
								<appkit-button id="wagmi-button" />
							)}
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
