/* @hash 18239bd5a6c6cd59f5773a84f4095339 */
// tslint:disable
/* eslint-disable */
import { TestOptions, withContracts as withContractsBase, WithContractsOptions } from '@neo-one/smart-contract-test';
import * as path from 'path';
import { Contracts } from './types';

export const withContracts = async (
  test: (contracts: Contracts & TestOptions) => Promise<void>,
  options?: WithContractsOptions,
): Promise<void> =>
  withContractsBase<Contracts>(
    [
      { name: 'Escrow', filePath: path.resolve(__dirname, '../contracts/Escrow.ts') },
      { name: 'Token', filePath: path.resolve(__dirname, '../contracts/Token.ts') },
    ],
    test,
    options,
  );
