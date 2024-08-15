import {FC} from "react";
import Modal from "../shared/Modal";

interface DepositConfirmModalProps {
    isOpen: boolean,
    handleClose?: () => void,
    handleConfirm?: () => void,
    isPending: boolean,
}

/**
 * Component that contains the global menu
 */
const DepositConfirmModal: FC<DepositConfirmModalProps>  = ({isOpen,handleClose, handleConfirm, isPending}) => {
    return (
        <Modal isOpen={isOpen} handleClose={handleClose}>
            <div className="flex justify-around mt-6">
                <h4
                    className="text-center font-damion text-2xl font-bold py-6"
                >
                    ADD LIQUIDITY
                </h4>
            </div>
            <p
                className="text-sm py-2 text-justify"
            >
                By depositing USDC and Imagine liquidity with Dreaming
                LP, you acknowledge that you understand the risks
                associated with providing liquidity and impermanent
                loss. For more detail, please see{" "}
                <a
                    className="inline underline"
                    target="_blank"
                    href={
                        "https://medium.com/coinmonks/understanding-impermanent-loss-9ac6795e5baa"
                    }
                >
                    Medium Article
                </a>{" "}
                and{" "}
                <a
                    className="inline underline"
                    target="_blank"
                    href={
                        "https://academy.binance.com/en/articles/impermanent-loss-explained"
                    }
                >
                    Binance Academy
                </a>
            </p>
            <p
                className="text-sm py-2 text-justify"
            >
                Once you have deposited funds, you will begin earning a
                portion of the 1% fee charged on every swap performed in
                the pool. Your share of the fee is proportional to your
                share of the pool liquidity. So if you deposited $100
                USDC and 100 $IMGN, and the pool had $1000 USDC and 1000
                $IMGN in total, you would receive 10% of the fee, or
                0.1% of every single swap executed in the pool. These
                fees simply accrue in your pool and will be collected
                automatically when you withdraw your funds, you do not
                need to claim them separately.
            </p>
            <div className="pt-4 pb-4">
                <button
                    className={`btn rounded-lg btn-block btn-lg font-Poppins relative overflow-hidden shadow bg-[#4e7d80] border-none hover:scale-105 hover:text-[#d5c291] ${isPending ? 'loading' : ''}`}
                    onClick={handleConfirm}
                >
                    confirm deposit
                </button>
            </div>
        </Modal>
    );

}

export default DepositConfirmModal;
