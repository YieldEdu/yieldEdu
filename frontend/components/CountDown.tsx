"use client";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

const CountDownTimer = ({
	startTime,
	lockDuration,
	isConnected,
	className,
}: {
	startTime: number;
	lockDuration: number;
	isConnected: boolean;
	className?: ClassValue;
}) => {
	const [timeLeft, setTimeLeft] = useState(0);

	useEffect(() => {
		const calculateTimeLeft = () => {
			if (
				!startTime ||
				!lockDuration ||
				isNaN(startTime) ||
				isNaN(lockDuration)
			) {
				setTimeLeft(0);
				return;
			}

			const currentTime = Math.floor(Date.now() / 1000);
			const startTimeInSeconds = Math.floor(startTime);
			const unlockTime = startTimeInSeconds + lockDuration;
			const remainingTime = Math.max(unlockTime - currentTime, 0);

			// console.log("Detailed time calculation:", {
			// 	currentTime,
			// 	startTimeInSeconds,
			// 	lockDurationInSeconds: lockDuration,
			// 	unlockTime,
			// 	remainingTime,
			// 	humanReadable: {
			// 		currentTime: new Date(currentTime * 1000).toLocaleString(),
			// 		startTime: new Date(startTimeInSeconds * 1000).toLocaleString(),
			// 		unlockTime: new Date(unlockTime * 1000).toLocaleString(),
			// 		remainingHours: Math.floor(remainingTime / 3600),
			// 		remainingMinutes: Math.floor((remainingTime % 3600) / 60),
			// 		remainingSeconds: remainingTime % 60,
			// 	},
			// });

			setTimeLeft(remainingTime);
		};

		calculateTimeLeft();

		const interval = setInterval(calculateTimeLeft, 1000);
		return () => clearInterval(interval);
	}, [lockDuration, startTime]);

	const formatNumber = (n: number): string => n.toString().padStart(2, "0");

	const formatTimeLeft = () => {
		if (timeLeft <= 0)
			return (
				<Button
					type="button"
					variant={"default"}
					className="hover:bg-green-500 active:bg-green-500 bg-green-600 w-full"
				>
					Withdraw
				</Button>
			);

		const days = Math.floor(timeLeft / (24 * 60 * 60));
		const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
		const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
		const seconds = timeLeft % 60;

		if (days > 0) {
			return `${days}d ${formatNumber(hours)}h ${formatNumber(
				minutes
			)}m ${formatNumber(seconds)}s`;
		}
		if (hours > 0) {
			return `${hours}h ${formatNumber(minutes)}m ${formatNumber(seconds)}s`;
		}
		if (minutes > 0) {
			return `${minutes}m ${formatNumber(seconds)}s`;
		}
		return `${seconds}s`;
	};

	return (
		<div className={cn("font-semibold", className)}>
			{!isConnected ? "Connect your wallet!" : formatTimeLeft()}
		</div>
	);
};

export default CountDownTimer;
