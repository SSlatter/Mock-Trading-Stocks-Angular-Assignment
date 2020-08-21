export class TransactionInfo {
    amount: number;
    side: string;
    symbol: string;

    constructor (data: any) {
        this.side = data.side.toUpperCase();
        this.symbol = data.symbol;
        this.amount = data.amount;
    }
}
