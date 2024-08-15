import {FC} from "react";
import Modal from "../shared/Modal";

interface SlippageConfirmModalProps {
    isOpen: boolean,
    handleClose?: () => void,
    handleConfirm?: () => void,
    slippageAmount: number,
  isPending: boolean,
}

const SlippageConfirmModal: FC<SlippageConfirmModalProps>  = ({isOpen,handleClose, handleConfirm,slippageAmount, isPending}) => {
    return (
        <Modal isOpen={isOpen} handleClose={handleClose}>
            <div className="flex justify-around mt-6">
                <h4
                    className="text-center font-damion text-3xl tracking-wider font-bold py-6"
                >
                    Slippage Warning
                </h4>
            </div>
            <p
                className="text-sm py-4 text-justify"
            >
                The amount you're trying to swap will change the price of
                the pool by over 1%. You'll only receive{" "}
                {((1 - slippageAmount) * 100).toFixed(2)}% of what was
                shown for a trade that large. Make sure you are
                comfortable swapping for the amount provided by your
                wallets approve pop up otherwise do not proceed.
            </p>
            <div className="pt-4 pb-4">
                <button
                    className={`btn rounded-lg btn-block btn-lg  relative overflow-hidden shadow bg-[#4e7d80] border-none hover:scale-105 hover:text-[#d5c291] hover:bg-black ${isPending ? 'loading' : ''}`}
                    onClick={handleConfirm}
                >
                    
                    confirm swap
                </button>
            </div>
        </Modal>
    );

}

export default SlippageConfirmModal;
