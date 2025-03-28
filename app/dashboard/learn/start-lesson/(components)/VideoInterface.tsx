"use client";
import React, { useState, useEffect } from "react";
import UserVideo from "./UserVideo";
import CallControls from "./CallControls";
import AIVideo from "./AiVideo";

const VideoInterface: React.FC = () => {
	const [isConnected, setIsConnected] = useState(false);

	useEffect(() => {
		// Simulate connection delay
		const timer = setTimeout(() => {
			setIsConnected(true);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	if (!isConnected) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="glass-morphism p-8 rounded-2xl text-center animate-pulse-soft">
					<h2 className="text-xl font-medium mb-4">
						Connecting to your meeting...
					</h2>
					<div className="flex justify-center space-x-2">
						<div
							className="w-3 h-3 rounded-full bg-primary animate-bounce"
							style={{ animationDelay: "0ms" }}
						></div>
						<div
							className="w-3 h-3 rounded-full bg-primary animate-bounce"
							style={{ animationDelay: "150ms" }}
						></div>
						<div
							className="w-3 h-3 rounded-full bg-primary animate-bounce"
							style={{ animationDelay: "300ms" }}
						></div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 relative main-container">
			<div className="max-w-6xl mx-auto animate-fade-in">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<AIVideo className="animate-scale-in" />
					<UserVideo
						className="animate-scale-in"
						style={{ animationDelay: "150ms" }}
					/>
				</div>

				<div className="mt-8 text-center glass-morphism p-6 rounded-2xl">
					<h2 className="text-xl font-medium mb-2">AI Assistant Meeting</h2>
					<p className="text-gray-500">
						Connected and ready to help with your questions
					</p>
				</div>

				<CallControls />
			</div>
		</div>
	);
};

export default VideoInterface;
