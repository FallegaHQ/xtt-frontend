import React from 'react';
import {
    Params,
    useParams,
} from 'react-router-dom';

function withUseParams<P extends { params: Params }>(WrappedComponent: React.ComponentType<P>){
    return function WithParamsWrapper(props: Omit<P, 'params'>){
        const params = useParams();

        return <WrappedComponent {...(props as P)} params={params}/>;
    };
}

export default withUseParams;
