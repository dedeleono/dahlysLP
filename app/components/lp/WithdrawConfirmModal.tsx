import {FC} from "react";
import Modal from "../shared/Modal";

interface WithdrawConfirmModalProps {
    isOpen: boolean,
    isPending: boolean,
    handleClose?: () => void,
    handleConfirm?: () => void,
}

/**
 * Component that contains the global menu
 */
const WithdrawConfirmModal: FC<WithdrawConfirmModalProps>  = ({isOpen,handleClose, handleConfirm, isPending}) => {
    return (
        <Modal isOpen={isOpen} handleClose={handleClose}>
            <div className="flex justify-around">
                <h4
                    className="text-center font-damion text-2xl font-bold mt-4 py-6"
                >
                    WITHDRAW LIQUIDITY
                </h4>
            </div>
            <p
                className="text-sm py-2 text-justify"
            >
                Clicking "confirm withdraw" below will burn all your dream tokens
                and give you back the amount of IMAGINE and USDC you own
                in the pool. This includes your share of the 1% trading
                fee charged on all swaps since you deposited.
            </p>
            <div className="py-4">
                <button
                    className={`btn font-Poppins rounded-lg btn-block btn-lg bg-[#4e7d80] border-none hover:scale-105 hover:text-[#d5c291] relative overflow-hidden shadow ${isPending ? 'loading' : ''}`}
                    onClick={handleConfirm}
                >
                    
                    confirm withdraw
                </button>
            </div>
        </Modal>
    );

}

export default WithdrawConfirmModal;
