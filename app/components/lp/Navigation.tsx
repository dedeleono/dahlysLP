import { FC } from "react";
import WalletMultiButtonStyled from "../shared/WalletMultiButtonStyled";

const navigationItems = [
  {
    id: "dream-emporium",
    title: "Dahlys",
    href: "",
  },
];
interface NavigationProps {
  activeId: string;
}
/**
 * Component that contains the global menu
 */
const Navigation = () => {
  return (
    <div
      className="bg-transparent w-full md:pl-4 absolute flex z-100 inset-0 bottom-auto h-20 md:justify-end mx-auto md:mx-0 justify-around"
      style={{ zIndex: 998 }}
    >

      <div className="lg:basis-1/4 md:justify-end justify-center items-center md:place-content-end pr-4 md:mr-[8rem] flex">
        <a
          href="https://discord.com/invite/AA66Ayk5Dz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/discord.svg" className="w-[1.75rem] md:w-8 m-2 invert lg:px-1" />
        </a>
        <a
          href="https://twitter.com/DahlysArt"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/twitter.svg" className="w-[1.75rem] md:w-8 m-2 invert lg:px-1" />
        </a>
        <a
          href="https://magiceden.io/marketplace/dhly"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/me.svg" className="w-[1.75rem] md:w-8 m-2 invert lg:px-1" />
        </a>
        <WalletMultiButtonStyled className="!h-8 !w-auto !p-4 !rounded-md md:!rounded-full md:ml-2 md:!btn-md !max-w-[180px] !bg-black hover:!bg-gray-800 !font-[Damion] !text-[1rem] md:!text-[1.15rem] !tracking-wider !text-[#d8c593] ml-10" />
      </div>
    </div>
  );
};

export default Navigation;
