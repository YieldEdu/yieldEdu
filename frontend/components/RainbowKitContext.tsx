"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {
	RainbowKitProvider as RainbowProvider,
	darkTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { config } from "../lib/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
		},
	},
});

const RainbowKitProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={client}>
				<RainbowProvider
					initialChain={656476}
					coolMode={true}
					theme={darkTheme()}
				>
					{children}
				</RainbowProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
};

export default RainbowKitProvider;
