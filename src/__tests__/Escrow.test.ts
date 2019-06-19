/**
* @jest-environment node
*/
import { withContracts } from '../../one/generated/test';
import BigNumber from 'bignumber.js';
import { Hash256 } from '@neo-one/client';
jest.setTimeout(30000);

describe('Token', () => {
    test('exists', async () => {
        await withContracts(async ({escrow}) => {
            expect(escrow).toBeDefined();
        })
    })

    test('properties exist', async () => {
        await withContracts(async ({escrow}) => {
            const [name, symbol] = await Promise.all([
                escrow.name(),
                escrow.symbol(),
            ]);

            expect(name).toEqual('Escrow');
            expect(symbol).toEqual('ESC');
        })
    })
})