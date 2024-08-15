import useLPStore from "../../hooks/useLPStore";
import {useState} from "react";

export default function UnstakeButton() {
    const stakeWithdraw = useLPStore((state => state.stakeWithdraw));
    const walletStakedShell = useLPStore((state => state.tideStats?.walletStakedShell));

    const [isPending, setIsPending] = useState(false);

    return (
      <button
        className={`btn rounded-md btn-sm relative shadow hover:border hover:border-white hover:scale-105 hover:bg-transparent ${isPending ? 'loading' : ''}  ${walletStakedShell ? 'bg-black/30' : ''}`}
        disabled={!walletStakedShell}
        onClick={async () => {
          setIsPending(true);
          await stakeWithdraw();
          setIsPending(false);
        }}
      >
        Unstake
      </button>
    );
}
