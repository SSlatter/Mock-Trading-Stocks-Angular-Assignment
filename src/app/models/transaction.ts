export class Transaction {
    amount: number;
    cost: number;
    date: string;
    side: string;
    symbol: string;
    tickPrice: number;

    constructor (data: any) {
        this.amount = data.number;
        this.cost = data.cost;
        this.date = data.date;
        this.side = data.side.toUpperCase();
        this.symbol = data.symbol.toUpperCase();
        this.tickPrice = data.tickPrice;
    }
}
