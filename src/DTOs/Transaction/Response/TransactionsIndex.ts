import Transaction from '../Transaction.ts';

interface TransactionsIndex{
    count: number;
    transactions: Transaction[];
}

export default TransactionsIndex;
