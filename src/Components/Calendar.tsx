import React from 'react';
import TransactionCard from './TransactionCard.tsx';
import Transaction from '../DTOs/Transaction/Transaction';
import { DateRangeFilter } from '../DTOs/Transaction/Filter/TransactionsFilter';
import { format } from 'date-fns';

interface CalendarProps{
    events?: Transaction[];
    initialDate?: Date;
    onRequestEvents?: (range: DateRangeFilter) => Promise<Transaction[]>;
}

interface CalendarState{
    firstRender: boolean;
    currentDate: Date;
    selectedDate: Date | null;
    displayedEvents: Transaction[];
    isLoading: boolean;
}

class Calendar extends React.Component<CalendarProps, CalendarState>{
    static defaultProps = {
        events     : [],
        initialDate: new Date(),
    };

    weekDays = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
    ];

    constructor(props: CalendarProps){
        super(props);

        this.state = {
            firstRender    : true,
            currentDate    : props.initialDate!,
            selectedDate   : new Date(),
            displayedEvents: props.events!,
            isLoading      : false,
        };
    }

    componentDidMount(){
        if(this.state.firstRender){
            const newDate = new Date(this.state.currentDate);
            // eslint-disable-next-line promise/catch-or-return
            this.fetchEventsForMonth(newDate)
                .then(() => {
                    this.setState({
                                      currentDate: newDate,
                                      firstRender: false,
                                  });

                    return;
                });
        }
    }

    fetchEventsForMonth = async(date: Date): Promise<void> => {
        const { onRequestEvents } = this.props;
        if(onRequestEvents){
            this.setState({ isLoading: true });
            try{
                const fetchedEvents = await onRequestEvents(this.getDateRangeFilter(date));
                this.setState({ displayedEvents: fetchedEvents });
            }
            catch(error){
                console.error('Failed to fetch events:', error);
                this.setState({ displayedEvents: [] });
            }
            finally{
                this.setState({ isLoading: false });
            }
        }
        else{
            this.setState({ displayedEvents: this.props.events! });
        }
    };

    prevMonth = () => {
        const newDate = new Date(this.state.currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        this.setState({ selectedDate: null });
        this.fetchEventsForMonth(newDate)
            .then(() => this.setState({ currentDate: newDate }))
            .catch((e) => {
                console.log(e);
            });
    };

    nextMonth = () => {
        const newDate = new Date(this.state.currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        this.setState({ selectedDate: null });
        this.fetchEventsForMonth(newDate)
            .then(() => this.setState({ currentDate: newDate }))
            .catch((e) => {
                console.log(e);
            });
    };

    getDateRangeFilter = (monthDate: Date): DateRangeFilter => {
        const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
        const lastDay  = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);

        const startingDayIndex = firstDay.getDay();
        const totalDays        = lastDay.getDate();

        const prevMonthLastDay  = new Date(monthDate.getFullYear(), monthDate.getMonth(), 0).getDate();
        const firstDayLastMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() - 1, prevMonthLastDay - startingDayIndex + 1);

        const totalCells       = Math.ceil((startingDayIndex + totalDays) / 7) * 7;
        const lastIndex        = totalCells - (startingDayIndex + totalDays);
        const nextMonthLastDay = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, lastIndex);

        return {
            start: format(firstDayLastMonth, 'yyyy-MM-dd'),
            end  : format(nextMonthLastDay, 'yyyy-MM-dd'),
        } as DateRangeFilter;
    };

    generateCalendarDays = () => {
        const { currentDate } = this.state;
        const firstDay        = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay         = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        const startingDayIndex = firstDay.getDay();
        const totalDays        = lastDay.getDate();

        const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        const prevMonthDays    = Array.from({ length: startingDayIndex }, (_, i) => ({
            day           : prevMonthLastDay - startingDayIndex + i + 1,
            isCurrentMonth: false,
            date          : new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, prevMonthLastDay - startingDayIndex + i + 1),
        }));

        const currentMonthDays = Array.from({ length: totalDays }, (_, i) => ({
            day           : i + 1,
            isCurrentMonth: true,
            date          : new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1),
        }));
        const totalCells       = Math.ceil((startingDayIndex + totalDays) / 7) * 7;
        const nextMonthDays    = Array.from({ length: totalCells - (prevMonthDays.length + currentMonthDays.length) }, (_, i) => ({
            day           : i + 1,
            isCurrentMonth: false,
            date          : new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i + 1),
        }));

        return [
            ...prevMonthDays,
            ...currentMonthDays,
            ...nextMonthDays,
        ];
    };

    getSelectedDateEvents = () => {
        return this.state.displayedEvents.filter(event => new Date(event.date).toDateString() === this.state.selectedDate?.toDateString());
    };

    handleDateClick = (date: Date) => {
        this.setState({ selectedDate: date });
    };

    renderCalendarCell = (dayInfo: { day: number; isCurrentMonth: boolean; date: Date }) => {
        const isToday        = new Date().toDateString() === dayInfo.date.toDateString();
        const isSelected     = this.state.selectedDate?.toDateString() === dayInfo.date.toDateString();
        const dayEvents      = this.state.displayedEvents.filter(event => new Date(event.date).toDateString() === dayInfo.date.toDateString());
        const dayEventsCount = dayEvents.length - 3;

        return (<div
            key={dayInfo.date.toISOString()}
            onClick={() => this.handleDateClick(dayInfo.date)}
            className={`flex xl:aspect-square max-xl:min-h-[60px] p-3.5 relative 
          ${isSelected ? 'bg-indigo-50' : dayInfo.isCurrentMonth ? 'bg-white' : 'bg-gray-50'}
          border-r border-b border-indigo-200 
          transition-all duration-300 hover:bg-indigo-50 cursor-pointer`}
        >
        <span className={`text-xs font-semibold 
          ${isToday ? 'text-white bg-indigo-600 w-6 h-6 flex items-center justify-center rounded-full' :
            isSelected ? 'text-indigo-600' : dayInfo.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}`}>
          {dayInfo.day}
        </span>
            <div
                className={'flex left-0 absolute bottom-2 w-full justify-center items-center h-3 leading-3 text-[0.75rem]'}>
                {dayEvents && (dayEvents.map((_i, k) => {
                    return (k < 3) ? (<div key={k} className="w-1 h-1 mx-0.5 rounded-full bg-indigo-600"/>) : '';
                }))}
                {(dayEventsCount > 0) && ' +' + dayEventsCount}
            </div>
        </div>);
    };

    render(){
        const { currentDate } = this.state;
        const currentMonth    = currentDate.toLocaleString('default', { month: 'long' });
        const currentYear     = currentDate.getFullYear();

        return (<div className="w-full relative z-10 backdrop-blur-3xl">
            <div className="w-full mx-auto">
                <div className="grid grid-cols-12 gap-8 max-w-4xl mx-auto xl:max-w-full">
                    <div className="col-span-12 xl:col-span-5">
                        <h2 className="text-xl leading-8 font-semibold text-gray-900 mb-5 text-center">
                            {this.state.selectedDate ? this.state.selectedDate.toLocaleDateString('default', {
                                month: 'long',
                                day  : 'numeric',
                                year : 'numeric',
                            }) : 'Please, select a date.'}
                        </h2>

                        {this.state.selectedDate && <ol className="relative border-s border-gray-700">
                            {this.getSelectedDateEvents().length > 0 ? (this.getSelectedDateEvents()
                                                                            .map(function(event: Transaction){
                                                                                return <TransactionCard
                                                                                    key={event.id} {...event} />;
                                                                            })) : (<li className="mb-10 ms-4">
                                <div
                                    className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                <h3 className="text-lg font-semibold text-gray-900">No transactions in the selected
                                    date</h3>
                            </li>)}
                        </ol>}
                    </div>

                    <div
                        className="col-span-12 xl:col-span-7 px-2.5 max-xl:row-start-1">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-5">
                            <div className="flex items-center gap-4">
                                <h5 className="text-xl leading-8 font-semibold text-gray-900">{currentMonth} {currentYear}</h5>
                            </div>
                            <div className="flex items-center rounded-md p-1 bg-indigo-50 gap-px">
                                <button
                                    onClick={this.prevMonth}
                                    disabled={this.state.isLoading}
                                    className={`text-indigo-600 p-1 rounded transition-all duration-300 hover:text-white hover:bg-indigo-600 ${this.state.isLoading ?
                                                                                                                                               'opacity-50 cursor-not-allowed' :
                                                                                                                                               ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         viewBox="0 0 16 16" fill="none">
                                        <path d="M10.0002 11.9999L6 7.99971L10.0025 3.99719"
                                              stroke="currentcolor" strokeWidth="1.3" strokeLinecap="round"
                                              strokeLinejoin="round"></path>
                                    </svg>
                                </button>
                                <button
                                    onClick={this.nextMonth}
                                    disabled={this.state.isLoading}
                                    className={`text-indigo-600 p-1 rounded transition-all duration-300 hover:text-white hover:bg-indigo-600 ${this.state.isLoading ?
                                                                                                                                               'opacity-50 cursor-not-allowed' :
                                                                                                                                               ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         viewBox="0 0 16 16" fill="none">
                                        <path d="M6.00236 3.99707L10.0025 7.99723L6 11.9998"
                                              stroke="currentcolor" strokeWidth="1.3" strokeLinecap="round"
                                              strokeLinejoin="round"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="border border-indigo-200  relative">
                            {this.state.isLoading && (<div
                                className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded-xl">
                                <div className="flex flex-col items-center">
                                    <div
                                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
                                    <span className="mt-2 text-indigo-600 font-medium">Loading calendar events...</span>
                                </div>
                            </div>)}
                            <div className="grid grid-cols-7 border-b border-indigo-200">
                                {this.weekDays.map((day, index) => (<div key={day}
                                                                         className={`py-3.5 ${index !== 6 ? 'border-r' : ''} ${index === 0 ? 'rounded-tl-xl' : ''} ${index === 6 ?
                                                                                                                                                                     'rounded-tr-xl' :
                                                                                                                                                                     ''} border-indigo-200 bg-indigo-50 flex items-center justify-center text-sm font-medium text-indigo-600`}>
                                    {day}
                                </div>))}
                            </div>
                            <div className="grid grid-cols-7">
                                {this.generateCalendarDays()
                                     .map((dayInfo) => this.renderCalendarCell(dayInfo))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default Calendar;
