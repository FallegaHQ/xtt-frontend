enum TransactionType{
    Other          = 'other',
    Groceries      = 'groceries',
    Housing        = 'housing',
    Utilities      = 'utilities',
    Transportation = 'transportation',
    Entertainment  = 'entertainment',
    Healthcare     = 'healthcare',
    Gifts          = 'gifts',
    Debt           = 'debt',
    Subscriptions  = 'subscriptions'
}

export interface TransactionTypeColors{
    bg: string,
    text: string,
    border: string

}

export const TransactionTypeColors: Record<TransactionType, TransactionTypeColors> = {
    [TransactionType.Other]         : {
        bg    : 'bg-gray-500',
        text  : 'text-gray-500',
        border: 'border-gray-500',
    },
    [TransactionType.Groceries]     : {
        bg    : 'bg-emerald-500',
        text  : 'text-emerald-500',
        border: 'border-emerald-500',
    },
    [TransactionType.Housing]       : {
        bg    : 'bg-green-600',
        text  : 'text-green-600',
        border: 'border-green-600',
    },
    [TransactionType.Utilities]     : {
        bg    : 'bg-amber-500',
        text  : 'text-amber-500',
        border: 'border-amber-500',
    },
    [TransactionType.Transportation]: {
        bg    : 'bg-yellow-400',
        text  : 'text-yellow-400',
        border: 'border-yellow-400',
    },
    [TransactionType.Entertainment] : {
        bg    : 'bg-pink-500',
        text  : 'text-pink-500',
        border: 'border-pink-500',
    },
    [TransactionType.Healthcare]    : {
        bg    : 'bg-orange-500',
        text  : 'text-orange-500',
        border: 'border-orange-500',
    },
    [TransactionType.Gifts]         : {
        bg    : 'bg-purple-500',
        text  : 'text-purple-500',
        border: 'border-purple-500',
    },
    [TransactionType.Debt]          : {
        bg    : 'bg-red-600',
        text  : 'text-red-600',
        border: 'border-red-600',
    },
    [TransactionType.Subscriptions] : {
        bg    : 'bg-blue-600',
        text  : 'text-blue-600',
        border: 'border-blue-600',
    },
};

export const getTransactionTypeColor = (type: TransactionType): TransactionTypeColors => {
    return TransactionTypeColors[type];
};
export default TransactionType;
