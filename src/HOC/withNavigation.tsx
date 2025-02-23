import React from 'react';
import {
    NavigateFunction,
    useNavigate,
} from 'react-router-dom';

function withNavigation<P extends { navigate: NavigateFunction }>(WrappedComponent: React.ComponentType<P>){
    return function WithParamsWrapper(props: Omit<P, 'navigate'>){
        const navigate = useNavigate();

        return <WrappedComponent {...(props as P)} navigate={navigate}/>;
    };
}

export default withNavigation;
