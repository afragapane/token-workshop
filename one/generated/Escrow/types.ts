/* @hash 237570822245ff0c970ebb1303d3f24f */
// tslint:disable
/* eslint-disable */
import {
  Client,
  GetOptions,
  InvocationTransaction,
  InvokeReceipt,
  SmartContract,
  TransactionOptions,
  TransactionResult,
} from '@neo-one/client';

export type EscrowEvent = never;

export interface EscrowSmartContract<TClient extends Client = Client> extends SmartContract<TClient, EscrowEvent> {
  readonly deploy: {
    (options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, EscrowEvent>, InvocationTransaction>
    >;
    readonly confirmed: {
      (options?: TransactionOptions & GetOptions): Promise<
        InvokeReceipt<boolean, EscrowEvent> & { readonly transaction: InvocationTransaction }
      >;
    };
  };
}
