import { SmartContract, MapStorage, Address, Fixed, constant, LinkedSmartContract } from '@neo-one/smart-contract';
import { Token } from './Token';

export class Escrow extends SmartContract {
    public readonly name = 'Escrow';
    public readonly symbol = 'ESC';
    private readonly token = LinkedSmartContract.for<Token>();
    private readonly balances = MapStorage.for<[Address, Address], Fixed<8>>();

    @constant 
    public balanceOf(from: Address, to: Address): Fixed<8> {
        const balance = this.balances.get([from, to]);

        return balance === undefined ? 0 : balance;
    }

    public send(from: Address, to: Address, amount: Fixed<8>): boolean {
        if (amount < 0) {
            throw new Error(`Amount was less than 0! ${amount}`);
        }

        if (!Address.isCaller(from)) {
            return false;
        }

        const fromToBalance = this.balanceOf(from, to);

        const transferResult = this.token.transfer(from, this.address, amount);
        if (transferResult) {
            this.balances.set([from, to], fromToBalance + amount);

            return true;
        }

        return false;
    }

    public claim(from: Address, to: Address, amount: Fixed<8>): boolean {
        if (amount < 0) {
            throw new Error(`Amount was less than 0! ${amount}`);
        }

        if (!Address.isCaller(to)) {
            return false;
        }

        const fromToBalance = this.balanceOf(from, to);
        if (fromToBalance < amount) {
            return false;
        }
        const transferResult = this.token.transfer(this.address, to, amount);
        if (transferResult) {
            this.balances.set([from, to], fromToBalance - amount);

            return true;
        }

        return false;
    }

    public refund(from: Address, to: Address, amount: Fixed<8>): boolean {
        if (amount < 0) {
            throw new Error(`Amount was less than 0! ${amount}`);
        }

        if (!Address.isCaller(from)) {
            return false;
        }

        const fromToBalance = this.balanceOf(from, to);
        if (fromToBalance < amount) {
            return false;
        }
        const transferResult = this.token.transfer(this.address, from, amount);
        if (transferResult) {
            this.balances.set([from, to], fromToBalance - amount);

            return true;
        }

        return false;
    }
};