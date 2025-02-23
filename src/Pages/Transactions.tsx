import React from 'react';
import TransactionsService from '../Services/TransactionsService.ts';
import Calendar from '../Components/Calendar.tsx';
import {
    AuthContext,
    AuthContextType,
} from '../Context/AuthContext.tsx';
import Page, {
    PageProps,
    PageState,
} from '../Components/Page.tsx';
import Transaction from '../DTOs/Transaction/Transaction.ts';
import { getTransactionTypeColor } from '../DTOs/Transaction/TransactionType.ts';
import { DateRangeFilter } from '../DTOs/Transaction/Filter/TransactionsFilter.ts';

interface ExpensesProps extends PageProps{
}

interface ExpensesState extends PageState{
    transactions: Transaction[];
}

class Transactions extends Page<ExpensesProps, ExpensesState>{
    static contextType = AuthContext;
    protected static requiresAuth: boolean = true;
    declare context: AuthContextType;
    private transactionsService: TransactionsService | null;

    constructor(props: ExpensesProps){
        super(props);

        this.transactionsService = TransactionsService.getInstance();
    }

    protected get pageTitle(): string{
        return 'Transactions';
    }

    getTransactions = async(range: DateRangeFilter): Promise<Transaction[]> => {
        return new Promise<Transaction[]>((resolve, reject) => {
            this.transactionsService?.getTransactionsByDateRange(range)
                .then((transactions: Transaction[]) => {
                    if(!transactions){
                        throw new Error('No transactions found'); // This will be caught in a .catch()
                    }

                    return transactions.map((transaction) => ({
                        ...transaction,
                        colors: getTransactionTypeColor(transaction.type),
                    }));
                })
                .then(resolve)
                .catch(reject); // Ensures errors are handled
        });
    };

    protected renderContent(_auth?: AuthContextType): React.ReactNode{
        return (<>
            <Calendar onRequestEvents={this.getTransactions}/>
        </>);
    }
}

export default Transactions;
