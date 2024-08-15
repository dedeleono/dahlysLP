import * as anchor from "@project-serum/anchor";
import {PublicKey} from "@solana/web3.js";

export function getSccAccount1(): PublicKey {
    return new anchor.web3.PublicKey(
      "DAHLywrQAfAg7ViyiC94dyXoYkqpfa5AfiH2geuZzoBW"
    );
}

export function getSccAccount2(): PublicKey {
    return new anchor.web3.PublicKey(
      "Gu7VPxS8GhcweU6vDVjbcBomAgHuRHrBYpJ5VQsQvea8"
    );
}

export function getSccAccount3(): PublicKey {
    return new anchor.web3.PublicKey(
      "7TxDAdJ3LdBd2mEHWrFrqFNmSs6JBiP6FXVNBKVduAx4"
    );
}

export function getSccAccounts(): PublicKey[] {
    return [getSccAccount1(), getSccAccount2(), getSccAccount3()];
}
