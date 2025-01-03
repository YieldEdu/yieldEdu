"use client";

import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";

const CountDownTimer = ({
	startTime,
	lockDuration,
	isConnected,
	className,
	setShowWithDrawModal,
	positionId,
}: {
	startTime: number;
	lockDuration: number;
	isConnected: boolean;
	className?: ClassValue;
	positionId: string;
	setShowWithDrawModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [timeLeft, setTimeLeft] = useState<number>(() => {
		const currentTime = Math.floor(Date.now() / 1000);
		const startTimeInSeconds = Math.floor(startTime);
		const unlockTime = startTimeInSeconds + lockDuration;
		return Math.max(unlockTime - currentTime, 0);
	});
	const searchParams = useSearchParams();

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
			setTimeLeft(remainingTime);
		};

		calculateTimeLeft();
		const interval = setInterval(calculateTimeLeft, 1000);

		return () => clearInterval(interval);
	}, [startTime, lockDuration, timeLeft]);

	const formatNumber = (n: number): string => n.toString().padStart(2, "0");

	const handleWithdrawClick = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("positionId", positionId);
		window.history.pushState({}, "", `?${params.toString()}`);
		setShowWithDrawModal(true);
	};

	const formatTimeLeft = () => {
		if (timeLeft <= 0) {
			return (
				<Button
					onClick={handleWithdrawClick}
					type="button"
					variant={"default"}
					className="hover:bg-[#0E76FD] w-full"
				>
					Withdraw
				</Button>
			);
		}

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
		<p
			className={cn(
				"font-normal text-md text-center text-green-600",
				className
			)}
		>
			{!isConnected ? "Connect your wallet!" : formatTimeLeft()}
		</p>
	);
};

export default CountDownTimer;
