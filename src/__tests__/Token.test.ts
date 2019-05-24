/**
* @jest-environment node
*/
import { withContracts } from '../../one/generated/test';
import BigNumber from 'bignumber.js';
import { Hash256 } from '@neo-one/client';
jest.setTimeout(30000);

describe('Token', () => {
    test('exists', async () => {
        await withContracts(async ({token}) => {
            expect(token).toBeDefined();
        })
    })

    test('properties exist', async () => {
        await withContracts(async ({token}) => {
            const [name, symbol, decimals] = await Promise.all([
                token.name(),
                token.symbol(),
                token.decimals(),
            ])

            expect(name).toEqual('Eon');
            expect(symbol).toEqual('EON');
            expect(decimals.toNumber()).toEqual(8);
        })
    })

    test('first methods', async () => {
        await withContracts(async ({token, accountIDs}) => {
            const [totalSupply, balance] = await Promise.all([
                token.totalSupply(),
                token.balanceOf(accountIDs[0].address)
            ])

            expect(totalSupply.toNumber()).toEqual(0);
            expect(balance.toNumber()).toEqual(0);
        })
    })

    test('transfer + mintTokens', async () => {
        await withContracts(async ({token, accountIDs}) => {
            const account = accountIDs[2];
            const amount = new BigNumber(10);

            const mintTokensResult = await token.mintTokens({
                sendTo: [{
                    amount,
                    asset: Hash256.NEO
                }],
                from: account,
            })
            const mintTokensReceipt = await mintTokensResult.confirmed();
            if (mintTokensReceipt.result.state !== 'FAULT') {
                expect(mintTokensReceipt.result.value).toEqual(true);
            }
            
            const [totalSupply, balance] = await Promise.all([
                token.totalSupply(),
                token.balanceOf(account.address),
            ])

            expect(totalSupply.toNumber()).toEqual(10);
            expect(balance.toNumber()).toEqual(10);

            const toAccountID = accountIDs[0];
            const transferAmount = new BigNumber(3);

            const transferReceipt = await token.transfer.confirmed(account.address, toAccountID.address, transferAmount, {from: account});
            if (transferReceipt.result.state !== 'FAULT') {
                expect(transferReceipt.result.value).toEqual(true);
            }

            const [afterTotalSupply, afterBalance, afterToBalance] = await Promise.all([
                token.totalSupply(),
                token.balanceOf(account.address),
                token.balanceOf(toAccountID.address),
            ])

            expect(afterTotalSupply.toNumber()).toEqual(10);
            expect(afterBalance.toNumber()).toEqual(7);
            expect(afterToBalance.toNumber()).toEqual(3);
        })
    })
})