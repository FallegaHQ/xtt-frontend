import React from 'react';
import { Params } from 'react-router-dom';
import withUseParams from '../HOC/withUseParams';

interface ExpenseDetailsProps{
    params: Params;
}

class TransactionDetails extends React.Component<ExpenseDetailsProps>{
    render(){
        const { params } = this.props;

        return (<h2>Viewing Expense ID: {params.reportId}</h2>);
    }
}

export default withUseParams(TransactionDetails);
