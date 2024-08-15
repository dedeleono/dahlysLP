import * as anchor from "@project-serum/anchor";
import {PublicKey} from "@solana/web3.js";

export function getShellToken(): PublicKey {
    // mainnet: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
    // devnet: FT5uQVjDVMrYh5jXfinLSns15SHjvdPVnyjC7Hitv54j
    return new anchor.web3.PublicKey(
      "3vV1J2ZyxhGpWhNxQoCN9o6kKqTSmvwavnagbbtfn9GC"
    );
}

export function getTrtnToken(): PublicKey {
    return new anchor.web3.PublicKey(
      "Aj7p7pCarQFvtSVv5gvRGbJ5yddpAajqpHgJmZWboTnD"
    );
}

export function getUsdcToken(): PublicKey {
    // mainnet: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
    // devnet: DM5nx4kDo7E2moAkie97C32FSaZUCx9rTx1rwwRfm9VM
    return new PublicKey(
      "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
    );
}
