import {FC} from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import {getNumber} from "../../utils/format";
import WithDrawButton from "./WithdrawButton";
import useLPStore from "../../hooks/useLPStore";
import TidePool from "./TidePool";
import CountUpValue from "../shared/CountUpValue";

/**
 * Component that contains the global menu
 */
const LiquidPool: FC  = () => {
    const wallet = useAnchorWallet();
    const psdnStats = useLPStore((state => state.psdnStats));
    const accountStats = useLPStore((state => state.accountStats));
    const psdnRatio = useLPStore((state => state.psdnRatio));
    const tideStats = useLPStore((state => state.tideStats));

    let totalIssuedShell = null;
    let totalPooledTrtn = null;
    let totalPooledUsdc = null;
    let totalLiquidity = null;
    let yourLiquidity = null;
    if(wallet?.publicKey && !!psdnStats?.trtnAmount) {
        const totalTrtn = (psdnStats.trtnAmount as any / 1e6);
        const totalUsdc = (psdnStats.usdcAmount as any / 1e6);
        totalLiquidity = totalTrtn * psdnRatio  + totalUsdc;
        totalPooledTrtn = getNumber(psdnStats.trtnAmount, 6);
        totalPooledUsdc = getNumber(psdnStats.usdcAmount, 6);
        totalIssuedShell = getNumber(psdnStats.shellAmount, 6);
        const accountShell = accountStats?.shellBalance || 0;
        const walletStakedShell = tideStats?.walletStakedShell|| 0;
        // totalLiquidity * (unstakedShell+stakedShell) / issuedShell
        yourLiquidity = (totalLiquidity * (accountShell + walletStakedShell)) / totalIssuedShell;
    }
    // TODO "your liquidity"
    // TODO "your pool tokens" should also contain staked shell
    return (
        <div className="rounded-lg border-4 shadow-xl border-black bg-gray-800/60 backdrop-blur-md">
            <div className="rounded-md bg-[#1b4261]/70  p-5 xl:p-8 border-b-4 border-black rounded-b-none">
                <div className="card gap-6 flex flex-row pb-2 items-center md:justify-around">
                    <div className="-space-x-3 flex-shrink-0 justify-center  flex flex-row">
                        <div className=" z-10">
                            <div className="md:w-28 w-24">
                                <img src="/images/trtn.png" className="scale-125 pt-2" alt="Imagine" />
                            </div>
                        </div>
                        <div className="">
                            <div className="md:w-28 w-24 items-center justify-center">
                                <img src="/images/usdc.png" className="scale-[0.6] ml-[-3rem]" alt="Usdc" />
                            </div>
                        </div>
                    </div>
                    <h2 className="font-Poppins text-2xl md:text-3xl ml-[-2rem] md:pr-[3rem]" >
                        Dreams<br className="visible md:hidden" />
                        <span > Liquidity Pool</span>
                    </h2>
                </div>
                <div className="flex flex-row gap-[0.55rem] md:gap-5 md:pt-0 md:justify-center pt-2">
                    <div>
                        <div className="text-xs md:text-left text-center md:text-base opacity-50">Total liquidity</div>
                        <div className="text-base md:text-2xl py-1">
                            {totalLiquidity ? <CountUpValue value={totalLiquidity} prefix="$" showCents={false} />: '-'}
                        </div>
                    </div>
                    <div>
                        <div className="text-xs md:text-left text-center md:text-base opacity-50">Pooled $USDC</div>
                        <div className="text-base md:text-2xl py-1">
                            {totalPooledUsdc ? <CountUpValue value={totalPooledUsdc} prefix="$" showCents={false} />: '-'}
                        </div>
                    </div>
                    <div>
                        <div className="text-xs md:text-left text-center md:text-base opacity-50">Pooled $IMGN</div>
                        <div className="text-base md:text-2xl py-1">
                            {totalPooledTrtn ? <CountUpValue value={totalPooledTrtn} showCents={false} />: '-'}
                        </div>
                    </div>
                    <div>
                        <div className="text-xs md:text-left text-center md:text-base opacity-50">$IMGN price</div>
                        <div className="text-base md:text-2xl py-1">
                            {psdnRatio ? <CountUpValue value={psdnRatio} decimals={3}  prefix="$" />: '-'}
                        </div>
                    </div>
                    <div>
                        <div className="text-xs md:text-left text-center md:text-base opacity-50">Issued $DREAMS</div>
                        <div className="text-base md:text-2xl py-1 text-center md:text-left">
                            {totalIssuedShell ? <CountUpValue value={totalIssuedShell} showCents={false} />: '-'}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-3 p-5 md:p-8 md:pb-1">
                <div className="flex flex-row flex-wrap items-center  gap-4 md:gap-12">
                    <div className="flex-grow">
                        <div className="text-xs md:text-base opacity-50 font-Poppins tracking-wide">Your liquidity</div>
                        <div className="text-base md:text-2xl">{yourLiquidity ? <CountUpValue value={yourLiquidity} prefix="$" showCents={true} /> : '-'}</div>
                    </div>
                    <div className="">
                        <WithDrawButton />
                    </div>
                </div>
            </div>
            <div className="p-5 xl:p-8">
                <TidePool />
            </div>
        </div>
    );
}


export default LiquidPool;
