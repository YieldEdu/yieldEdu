"use client";
import { Dialog } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { ActivePosition } from "@/app/page";
import { useSearchParams } from "next/navigation";

import WithDrawScreen from "./WithDrawScreen";
import UnstakeScreen from "./UnstakeScreen";

const WithdrawModal = ({
	showWithdrawModal,
	setShowWithDrawModal,
	positions,
	setModalType,
	modalType,
}: {
	showWithdrawModal: boolean;
	setShowWithDrawModal: Dispatch<SetStateAction<boolean>>;
	positions: ActivePosition[];
	setModalType: Dispatch<SetStateAction<"withdraw" | "unstake">>;
	modalType: "withdraw" | "unstake";
}) => {
	const searchParams = useSearchParams();
	const positionId = searchParams.get("positionId");
	const position = positions.find((p) => Number(p.id) === Number(positionId));

	return (
		<Dialog
			modal={true}
			open={showWithdrawModal}
			onOpenChange={(state) => (
				window.history.pushState({}, "", `/`),
				setShowWithDrawModal(state),
				setModalType("withdraw")
			)}
		>
			{modalType === "withdraw" ? (
				<WithDrawScreen
					amount={position?.amount}
					expectedYield={position?.expectedYield}
					positionId={positionId}
					setShowWithDrawModal={setShowWithDrawModal}
				/>
			) : (
				<UnstakeScreen
					amount={position?.amount}
					setShowWithDrawModal={setShowWithDrawModal}
					expectedYield={position?.expectedYield}
					positionId={positionId}
				/>
			)}
		</Dialog>
	);
};

export default WithdrawModal;
