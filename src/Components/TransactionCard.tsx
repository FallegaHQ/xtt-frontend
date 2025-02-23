import React from 'react';
import Transaction from '../DTOs/Transaction/Transaction.ts';
import { upperFirst } from 'lodash';
import {
    format,
    parse,
} from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faTags } from '@fortawesome/free-solid-svg-icons';

type TransactionCardProps = Transaction;

class TransactionCard extends React.Component<TransactionCardProps>{
    render(){
        const {
                  type,
                  description,
                  amount,
                  colors,
                  date,
              }    = this.props;
        const time = format(parse(date, 'yyyy-MM-dd HH:mm:ss', new Date()), 'HH:mm');

        return (<li className="mb-10 ms-4">
            <div className={`absolute w-3 h-3 rounded-full mt-2 -start-1.5 border ${colors?.border} ${colors?.bg}`}></div>
            <h3 className={`text-lg font-semibold ${colors?.text}`}>{upperFirst(type)}</h3>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400">
                <FontAwesomeIcon icon={faClock} className={'mr-2'}/> {time}
            </time>
            <p className="text-base font-normal text-gray-500 dark:text-gray-600 mt-2">{description}</p>
            <p className="text-lg block text-right leading-8 font-semibold text-black my-3"><FontAwesomeIcon icon={faTags}/> {amount} TND</p>
        </li>);
    }
}

export default TransactionCard;
