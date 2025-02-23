import TransactionType from '../TransactionType.ts';

interface CreateTransaction{
    type: TransactionType;
    amount: number;
    description?: string;
}

export default CreateTransaction;
