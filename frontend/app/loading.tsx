import React from "react";

const Loading = () => {
	return (
		<div className="h-screen z-20 text-white flex items-center justify-center w-full absolute inset-0 bg-slate-950">
			<div className="size-20 rounded-full animate-[spin_0.8s_linear_infinite;] border-b-transparent border-[7px] border-white"></div>
		</div>
	);
};

export default Loading;
