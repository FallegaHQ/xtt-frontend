import TransactionType from '../TransactionType';

export interface DateRangeFilter{
    start?: string;
    end?: string;
}

interface TransactionsFilter{
    date?: DateRangeFilter | string;
    description?: string;
    type?: TransactionType;
}

export default TransactionsFilter;
