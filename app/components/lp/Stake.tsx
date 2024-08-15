import {useState, useRef} from "react";
import useLPStore from "../../hooks/useLPStore";

export default function Stake() {
    const accountStats = useLPStore((state => state.accountStats));
    const stakeDeposit = useLPStore((state => state.stakeDeposit));

    const [shellAmount, setShellAmount] = useState(1.0);
    const [isPending, setIsPending] = useState(false);

    return (
        <div>
            <div>
                <h2 className="tracking-wide text-3xl my-1 font-damion" style={{textShadow: '0 0 3px #484747'}}>Stake $DREAMS</h2>
                <p className="text-base w-full text-justify py-1">
                    Stake your $DREAMS in the Imagineers Farm and start harvesting $IMGN
                </p>
                <div className="text-right pb-1 text-sm opacity-50 mt-4">
                    <span>Balance: </span>
                    <span onClick={() => setShellAmount(accountStats.shellBalance)} className="cursor-pointer underline">
                        {accountStats.shellBalance}
                    </span>
                </div>
                <label className="flex flex-row items-center pb-5">
                    <img className="w-12 pr-2 scale-[2] pt-1" src="/images/shell.png" />
                    <div className="w-17 text-xl pr-2">
                        <strong>DREAMS</strong>
                    </div>
                    <input
                        type="number"
                        value={shellAmount}
                        onChange={(e) => {
                            const amount = parseFloat(e.target.value);
                            if (amount > 0) {
                                setShellAmount(amount);
                            } else {
                                setShellAmount(0.000001);
                            }
                        }}
                        className="input w-full rounded-md bg-opacity-50 spin-button-none"
                    />
                </label>
                <div className="mt-4 gap-2">
                    <button
                        className={`btn rounded-md btn-block btn-lg btn-accent relative overflow-hidden shadow bg-gray-800 border-none hover:text-[#d5c291] hover:scale-105 hover:bg-black ${isPending ? 'loading' : ''}`}
                        onClick={async () => {
                            setIsPending(true);
                            await stakeDeposit(shellAmount);
                            setIsPending(false);
                        }}
                    >
                        
                        stake
                    </button>
                </div>
            </div>
        </div>
    );
}
