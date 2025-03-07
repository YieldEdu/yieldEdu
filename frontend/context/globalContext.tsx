"use client";

import React, { createContext, useState } from "react";

interface globalcontextInterface {
	sidebarOpen: boolean;
	setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = createContext<globalcontextInterface>({
	sidebarOpen: false,
	setSidebarOpen: () => {},
});

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

	return (
		<GlobalContext value={{ sidebarOpen, setSidebarOpen }}>
			{children}
		</GlobalContext>
	);
};

export default GlobalContextProvider;
