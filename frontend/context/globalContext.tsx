"use client";

import React, { createContext, useState } from "react";

interface GlobalContextInterface {
	sidebarOpen: boolean;
	setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = createContext<GlobalContextInterface>({
	sidebarOpen: false,
	setSidebarOpen: () => {},
});

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

	return (
		<GlobalContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalContextProvider;
