"use client";

import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
import { Timer } from "lucide-react";

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
				<div className="flex items-center  text-lime-600 gap-3">
					<Timer className="w-5 h-5" />
					<p className="text-lime-600 font-medium text-lg">
						Your position is available for withdrawal
					</p>
					<Button
						onClick={handleWithdrawClick}
						type="button"
						variant={"default"}
						className="w-fit bg-gradient-to-r from-lime-500 to-yellow-500 text-slate-800 font-semibold hover:opacity-90"
					>
						Withdraw
					</Button>
				</div>
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
		return `Your position will be available for withdrawal in ${seconds}s`;
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
