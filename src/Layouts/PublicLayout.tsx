import { Outlet } from 'react-router-dom';
import TopBar from '../Components/TopBar';
import React, { ReactNode } from 'react';

type PublicLayoutProps = {
    children?: ReactNode | null;
};

class PublicLayout extends React.Component<PublicLayoutProps>{
    render(){

        return (<div className="flex flex-col min-h-screen min-w-full justify-center">
            <TopBar/>
            <main className="flex flex-col flex-1 p-4 justify-center items-center">
                <Outlet/>
            </main>
        </div>);
    };
}

export default PublicLayout;
