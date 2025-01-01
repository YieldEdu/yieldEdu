import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import WagmiContextProvider from "@/components/WagmiContextProvider";
import { headers } from "next/headers"; // added
import { Toaster } from "@/components/ui/toaster";

const spaceMono = Space_Mono({
	variable: "--font-space-mono",
	subsets: ["latin"],
	weight: "400",
});

export const metadata: Metadata = {
	title: "YieldStake - Web3 Protocol",
	description:
		"A decentralized fixed-yield protocol that earns users guaranteed yields on their EDU tokens.",
	icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const headersObj = await headers();
	const cookies = headersObj.get("cookie");

	return (
		<html lang="en">
			<body className={`${spaceMono.variable} antialiased`}>
				<WagmiContextProvider cookies={cookies}>
					{children}
				</WagmiContextProvider>
				<Toaster />
			</body>
		</html>
	);
}
