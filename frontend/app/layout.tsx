import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WagmiContextProvider from "@/components/WagmiContextProvider";
import { headers } from "next/headers"; // added

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "YieldStake - Web3 protocol",
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
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<WagmiContextProvider cookies={cookies}>
					{children}
				</WagmiContextProvider>
			</body>
		</html>
	);
}
