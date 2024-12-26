"use client";

import { wagmiAdapter, projectId, eduTestnet, edu } from "@/lib/wagmi";
import { createAppKit } from "@reown/appkit/react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

if (!projectId) {
	throw new Error("Project ID is not defined");
}

const client = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
		},
	},
});

const metadata = {
	name: "YieldStake",
	description:
		"A decentralized fixed-yield protocol that earns users guaranteed yields on their EDU tokens.",
	url: "https://edu-chain-hackathon.vercel.app/", // origin must match your domain & subdomain
	icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// the modal
createAppKit({
	adapters: [wagmiAdapter],
	projectId,
	networks: [eduTestnet, edu],
	defaultNetwork: eduTestnet,
	metadata,
	features: {
		analytics: true, // Optional - defaults to Cloud configuration
		socials: false,
	},
	themeMode: "dark",
	allWallets: "SHOW",
	themeVariables: {
		"--w3m-accent": "#0E76FD",
	},
});

const WagmiContextProvider = ({
	children,
	cookies,
}: {
	children: React.ReactNode;
	cookies: string | null;
}) => {
	const initialState = cookieToInitialState(
		wagmiAdapter.wagmiConfig as Config,
		cookies
	);
	return (
		<WagmiProvider
			config={wagmiAdapter.wagmiConfig as Config}
			initialState={initialState}
		>
			<QueryClientProvider client={client}>{children}</QueryClientProvider>
		</WagmiProvider>
	);
};

export default WagmiContextProvider;
