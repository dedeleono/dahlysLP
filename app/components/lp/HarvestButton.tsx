import useLPStore from "../../hooks/useLPStore";
import {useState} from "react";

export default function HarvestButton() {
    const stakeRedeem = useLPStore((state => state.stakeRedeem));
    const walletStakedShell = useLPStore((state => state.tideStats?.walletStakedShell));

    const [isPending, setIsPending] = useState(false);

    return (
      <button
        className={`btn rounded-md btn-block btn-md relative overflow-hidden bg-gray-500 border-none hover:scale-105 shadow ${isPending ? 'loading' : ''}  ${walletStakedShell ? 'hover:text-[#d5c291]' : ''}`}
        disabled={!walletStakedShell}
        onClick={async () => {
          setIsPending(true);
          await stakeRedeem();
          setIsPending(false);
        }}
      >
        Harvest
      </button>
    );
}
