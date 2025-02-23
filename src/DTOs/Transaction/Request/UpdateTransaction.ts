import TransactionType from '../TransactionType.ts';

interface UpdateTransaction{
    type?: TransactionType;
    amount?: number;
    description?: string;
}

export default UpdateTransaction;
