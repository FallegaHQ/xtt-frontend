import DatedModel from '../DatedModel.ts';
import User from '../User/User.ts';
import TransactionType, { TransactionTypeColors } from './TransactionType.ts';

interface Transaction extends DatedModel{
    user?: User | null;
    type: TransactionType;
    amount: number;
    description: string;
    date: string;
    colors?: TransactionTypeColors;
}

export default Transaction;
