/* @hash 6081cfd3cfadc91c8093cefca6481777 */
// tslint:disable
/* eslint-disable */
import { Client, SmartContractDefinition } from '@neo-one/client';
import { sourceMaps } from '../sourceMaps';
import { tokenABI } from './abi';
import { TokenSmartContract } from './types';

const definition: SmartContractDefinition = {
  networks: {
    local: {
      address: 'AVny2v9FULM7hkbLsZRzki4Tp7A73QcvaS',
    },
  },
  abi: tokenABI,
  sourceMaps,
};

export const createTokenSmartContract = <TClient extends Client>(client: TClient): TokenSmartContract<TClient> =>
  client.smartContract<TokenSmartContract<TClient>>(definition);
