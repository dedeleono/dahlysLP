import { useState, useRef } from "react";
import useLPStore from "../../hooks/useLPStore";
import WithdrawConfirmModal from "./WithdrawConfirmModal";

export default function WithDrawButton() {
    // TODO disable when shell is staked or chain calls to unstake + withdraw
    const removeLiquidity = useLPStore((state => state.removeLiquidity));
    const shellBalance = useLPStore((state => state.accountStats?.shellBalance));

    const [infoState, setInfoState] = useState(false);
    const [isPending, setIsPending] = useState(false);

    return (
        <>
            <button
                className={`btn rounded-md btn-sm relative shadow hover:border hover:border-white hover:scale-105 hover:bg-transparent ${isPending ? 'loading' : ''} ${shellBalance ? 'bg-black/30' : ''}`}
                disabled={!shellBalance}
                onClick={() => {
                    setInfoState(true)
                }}
            >
                withdraw
            </button>
            <WithdrawConfirmModal
                isOpen={infoState}
                isPending={isPending}
                handleConfirm={async () => {
                  setIsPending(true);
                  await removeLiquidity();
                  setIsPending(false);
                }}
                handleClose={() => setInfoState(false)}
            />
        </>
    );
}
