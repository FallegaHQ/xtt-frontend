import React from 'react';
import withNavigation from '../../HOC/withNavigation.tsx';
import { NavigateFunction } from 'react-router-dom';

interface NotFoundProps{
    navigate:  NavigateFunction;
}

class NotFound extends React.Component<NotFoundProps>{
    constructor(props: NotFoundProps){
        super(props);
    }


    render(){
        const { navigate } = this.props;
        return (<div className="flex flex-col items-center w-full h-screen">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-lg text-gray-600 mb-6">
                Not found, <button className={'pointer-events-auto'} onClick={() => navigate('/')}>piss off!</button>
            </p>

        </div>);
    }

}

export default withNavigation(NotFound);
