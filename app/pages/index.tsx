import Head from "next/head";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";

const ChartTrtnUsdcDynamic = dynamic(
  () => import("../components/lp/ChartTrtnUsdc"),
  { ssr: false }
);

import WavesBg from "../public/images/wave.svg";

import { useEffect, useRef, useState } from "react";
import Navigation from "../components/lp/Navigation";
import LiquidPool from "../components/lp/LiquidPool";
import Exchange from "../components/lp/Exchange";
import Deposit from "../components/lp/Deposit";
import ConnectDialog from "../components/shared/ConnectDialog";
import useLPStore from "../hooks/useLPStore";
import Stake from "../components/lp/Stake";
import TokenPanel from "../components/shared/TokenPanel";
import { useDocumentVisibility } from "../hooks/useDocumentVisibility";
import useShillCityCaptitalStore from "../hooks/useShillCityCaptitalStore";
import Bg from "../public/images/corner.png";

enum Tabs {
  Exchange = "Exchange",
  Deposit = "Deposit",
  Stake = "Stake",
}
let refreshStatsTimer: any;

export default function Home() {
  const wallet = useAnchorWallet();
  const tideState = useLPStore((state) => state.tideState);
  const psdnState = useLPStore((state) => state.psdnState);
  const [activeTab, setActiveTab] = useState(Tabs.Deposit);
  const setupTide = useLPStore((state) => state.setupTide);
  const setupPoseidon = useLPStore((state) => state.setupPoseidon);
  const getTideStats = useLPStore((state) => state.getTideStats);
  const getSccStats = useShillCityCaptitalStore((state) => state.getSccStats);
  const getPsdnStats = useLPStore((state) => state.getPsdnStats);
  const getAccountStats = useLPStore((state) => state.getAccountStats);

  const documentIsHidden = useDocumentVisibility();

  useEffect(() => {
    if (wallet?.publicKey) {
      setupPoseidon(wallet);
      setupTide(wallet);
      getSccStats(wallet);
    }
  }, [wallet]);

  useEffect(() => {
    // documentIsHidden = true if user is in another tab
    if (documentIsHidden) {
      if (refreshStatsTimer) {
        clearInterval(refreshStatsTimer);
        refreshStatsTimer = null;
      }
    } else {
      if (psdnState?.poseidon && tideState?.tide) {
        getPsdnStats();
        getAccountStats();
        getTideStats();
        if (!refreshStatsTimer) {
          refreshStatsTimer = setInterval(() => {
            getPsdnStats();
            getAccountStats();
            getTideStats();
          }, 10000);
        }
      }
    }
    return function cleanup() {
      clearInterval(refreshStatsTimer);
    };
  }, [psdnState, tideState, documentIsHidden]);

  return (
    <div className="overflow-hidden flex w-screen items-center">
      <Head>
        <title>Dreams Liquidity Pool</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main
        className="overflow-y-scroll w-full justify-center bg-no-repeat bg-cover aspect-video min-h-screen relative bg-body md:bg-transparent"
        style={{ backgroundImage: `url('${Bg.src}')`}}
      >

<div
          style={{ backgroundImage: `url(${WavesBg.src})` }}
          className="bg-bottom bg-no-repeat bg-cover backdrop-blur-sm pt-16 md:pt-20"
        >
          <div className="px-4 pt-8 pb-14 md:pb-20 container mx-auto max-w-screen-xl text-neutral-content bg-center">
            <div className="flex flex-col lg:flex-row pb-10 md:pt-6 lg:items-center place-content-center">
              <div className="flex items-center basis-10/12 flex-col lg:flex-row">
                <div className="flex md:place-content-center pb-6 lg:pb-0">
                  <div className="items-center">
                    <img
                      src="/shell.jpeg"
                      className="w-32 md:w-40 lg:mr-6 rounded-full border-4 border-black shadow-xl"
                    />
                  </div>
                </div>
                <div className="flex w-full lg:w-auto flex-grow md:pt-0">
                  <div className="font-damion text-2xl md:text-7xl mx-auto flex-auto text-secondary-content">
                    <div
                      className="lg:max-w-sm text-center text-2xl md:text-4xl tracking-wider lg:text-left"
                      style={{ textShadow: "0 0 4px #000" }}
                    >
                      Deposit your dreams <br />
                      and EARN $IMGN
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 lg:pt-0 lg:flex text-center lg:text-left ">
                <div className="lg:pl-0 lg:pt-0">
                  <ul className="steps steps-vertical">
                    <li className="step step-accent !text-left">
                      <div className="pb-3">
                        <strong>Deposit $IMGN + $USDC</strong>
                        <br />
                        Receive $DREAMS and start earning 1% of transaction fees.
                      </div>
                    </li>
                    <li className="step step-accent !text-left">
                      <div>
                        <strong>Stake your $DREAMS in the Tide Pool</strong>
                        <br />
                        Start earning your portion of the daily 1750 $IMGN
                        emission.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>



        <div className="px-4 mt-10 container mx-auto max-w-screen-xl text-neutral-content bg-center">
          <ConnectDialog />
          <div className="flex gap-4 xl:gap-8 flex-col-reverse lg:flex-row">
          <div className="md:flex-1 mb-6">
              <LiquidPool />
            </div>
            <div className="flex flex-col lg:w-[380px] mb-6">
              <div className="tabs divide-x divide-black divide-opacity-10  bg-black bg-opacity-10 rounded-lg font-Poppins text-3xl rounded-b-none w-full grid grid-cols-3 backdrop-blur-sm">
                {Object.entries(Tabs).map(([key, value]) => (
                  <div
                    key={key}
                    onClick={() => setActiveTab(value)}
                    className={`tab relative tab-lg ${
                      activeTab == value
                        ? "border-r-transparent border-b-black"
                        : "border-b-4 border-gray-400/60"
                    }`}
                  >
                    <div
                      className={`${
                        activeTab == value
                          ? "absolute -top-3 pt-5 left-0 right-0 bottom-0 text-white bg-[#eb8148]  border-4 border-black border-b-0 rounded-md rounded-b-none"
                          : "pt-1 text-gray-100/90"
                      }`}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
              <div
                className={`bg-[#eb8148]/60 backdrop-blur-md  rounded-lg rounded-t-none p-5 xl:p-8 border-4 border-black border-t-0 ${
                  activeTab == Tabs.Deposit ? "" : "hidden"
                }`}
              >
                <Deposit />
              </div>
              <div
                className={`bg-[#eb8148]/60 rounded-lg backdrop-blur-md rounded-t-none p-5 xl:p-8 border-4 border-black border-t-0 ${
                  activeTab == Tabs.Exchange ? "" : "hidden"
                }`}
              >
                <Exchange />
              </div>
              <div
                className={`bg-[#eb8148]/60 rounded-lg backdrop-blur-md rounded-t-none p-5 xl:p-8 border-4 border-black border-t-0 ${
                  activeTab == Tabs.Stake ? "" : "hidden"
                }`}
              >
                <Stake />
              </div>
              <TokenPanel />
            </div>

          </div>
{/* {          <div>
            <div className="card bg-[#143047]/80 rounded-lg border-4 border-black backdrop-blur-md">
              <div className="card-body">
                <h2
                  className="mb-2 font-damion text-3xl tracking-wide"
                  style={{ textShadow: "0 0 1px #000" }}
                >
                  IMGN Price + Circulating Supply
                </h2>
                <ChartTrtnUsdcDynamic />
              </div>
            </div>
          </div>} */}
          <footer className="h-[180px] lg:h-[300px] hidden md:block relative">
            {/* <img
            src="/images/squid.png"
            className="w-[200px] lg:w-[400px]  absolute -bottom-5 lg:-bottom-10"
          />
          <img
            src="/images/solplayboy.png"
            className="w-[120px] lg:w-[300px] absolute top-16 lg:top-10 left-1/2"
          /> */}
          
          </footer>
          <ToastContainer position="top-center" theme="dark" />
        </div>
        <div className="my-8 bg-neutral/80 backdrop-blur-sm rounded-md w-fit mx-auto px-6 py-4 border-4 border-black"><img src="/images/powered.svg" className="h-16 mx-auto  invert"></img></div>
      </main>
    </div>
  );
}
