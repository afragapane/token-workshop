/* @hash db9348cc1f55dcd7a3bc0f68ba274ee5 */
// tslint:disable
/* eslint-disable */
import { EscrowSmartContract } from './Escrow/types';
import { TokenSmartContract } from './Token/types';

export interface Contracts {
  readonly escrow: EscrowSmartContract;
  readonly token: TokenSmartContract;
}
