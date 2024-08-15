import {useState, useEffect, useRef} from "react";
import DepositConfirmModal from "./DepositConfirmModal";
import useLPStore from "../../hooks/useLPStore";

export default function Deposit() {
    const provideLiquidity = useLPStore((state => state.provideLiquidity));
    const psdnRatio = useLPStore((state => state.psdnRatio));
    const accountStats = useLPStore((state => state.accountStats));

    const [swapAmounts, setSwapAmounts] = useState({
        trtn: null,
        usdc: null,
        type: "trtn",
    });

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const calculateSwap = (_trtnAmount?: any, _usdcAmount?: any) => {
        // console.log("_trtnAmount", _trtnAmount);
        if (_trtnAmount !== null) {
            // console.log("triton swap");
            const usdcAmount = _trtnAmount * psdnRatio;
            setSwapAmounts({
                ...swapAmounts,
                trtn: _trtnAmount as any,
                usdc: usdcAmount as any,
            });
        } else if (_usdcAmount !== null) {
            // console.log("usdc swap");
            const trtnAmount = _usdcAmount / psdnRatio;
            setSwapAmounts({
                ...swapAmounts,
                trtn: trtnAmount as any,
                usdc: _usdcAmount as any,
            });
        } else {
            setSwapAmounts({
                ...swapAmounts,
                trtn: null,
                usdc: null,
            });
        }
    };


    useEffect(() => {
        if (psdnRatio > 0) {
            if (swapAmounts.type === "trtn") {
                calculateSwap(swapAmounts.trtn, null);
            } else if (swapAmounts.type === "usdc") {
                calculateSwap(null, swapAmounts.usdc);
            }
        }
    }, [psdnRatio]);

    return (
        <div>
            <DepositConfirmModal
                isOpen={showConfirmModal}
                isPending={isPending}
                handleConfirm={async () => {
                    if(swapAmounts.trtn && swapAmounts.usdc) {
                        setIsPending(true);
                        await provideLiquidity(swapAmounts.trtn, swapAmounts.usdc);
                        setIsPending(false);
                        setShowConfirmModal(false)
                    }
                }}
                handleClose={() => setShowConfirmModal(false)}
            />
            <div>
                <h2 className="font-damion tracking-wide text-4xl my-1" style={{textShadow: '0 0 3px #484747'}}>Deposit Liquidity</h2>
                <p className="text-base w-full text-justify py-1">
                    Deposit $IMGN + $USDC and receive $DREAMS to stake in the Imagineers Farm
                </p>
                <div className="text-right pb-1 text-sm opacity-90 mt-4">
                    <span>Balance: </span>
                    <span onClick={() => calculateSwap(accountStats.trtnBalance, null)} className="cursor-pointer underline">
                        {accountStats.trtnBalance}
                    </span>
                </div>
                <label className="flex flex-row items-center pb-5">
                    <div className="w-16 pr-2" />
                    <img className="w-12 scale-[1.95] pr-2 pt-1" src="/images/trtn.png" />
                    <div className="w-16 text-xl pr-2">
                        <strong>IMGN</strong>
                    </div>
                    <input
                        type="number"
                        placeholder="0"
                        value={swapAmounts.trtn || ''}
                        onChange={(e) => {
                            const amount = e.target.value ? parseFloat(e.target.value) : null;
                            calculateSwap(amount, null);
                        }}
                        className="input w-full max-w-full rounded-md bg-opacity-30 spin-button-none"
                    />
                </label>
                <div className="text-right pb-1 text-sm opacity-90">
                    <span>Balance: </span>
                    <span onClick={() => calculateSwap(null, accountStats.usdcBalance)} className="cursor-pointer underline">
                        {accountStats.usdcBalance}
                    </span>
                </div>
                <label className="flex flex-row items-center pb-5">
                    <div className="w-16 pr-2 text-4xl text-right leading-none -mt-1" >
                        +
                    </div>
                    <img className="w-12 pr-2" src="/images/usdc.png" />
                    <div className="w-16 text-xl pr-2">
                        <strong>USDC</strong>
                    </div>
                    <input
                        type="number"
                        placeholder="0"
                        value={swapAmounts.usdc || ''}
                        onChange={(e) => {
                            const amount = e.target.value ? parseFloat(e.target.value) : null;
                            calculateSwap(null, amount);
                        }}
                        className="input w-full rounded-md bg-opacity-30 spin-button-none"
                    />
                </label>
                <div className="mt-4 gap-2">
                    <button
                        className={`btn rounded-md btn-block btn-lg relative overflow-hidden shadow ${isPending ? 'loading' : ''}  ${!swapAmounts.trtn ? 'btn-disabled' : 'bg-gray-800 border-none hover:text-[#d5c291] hover:scale-105'}`}
                        onClick={() => setShowConfirmModal(true)}
                    >
                        deposit
                    </button>
                </div>
            </div>
        </div>
    );
}
