import {
    Navigate,
    Outlet,
} from 'react-router-dom';
import {
    AuthContext,
    AuthContextType,
} from '../Context/AuthContext';
import TopBar from '../Components/TopBar';
import React from 'react';
import SideBar from '../Components/SideBar.tsx';

interface PrivateLayoutProps{
}

class PrivateLayout extends React.Component<PrivateLayoutProps>{
    declare context: AuthContextType;

    render(){

        return (<AuthContext.Consumer>
            {(auth: AuthContextType | undefined) => {
                if(!auth?.isAuthenticated){
                    return <Navigate to="/login" replace/>;
                }

                return (<div className="relative bg-[#f7f6f9] h-full min-h-screen w-full font-[sans-serif]">
                    <div className="flex items-start min-h-full">
                        <SideBar/>

                        <section className="main-content w-full px-6">
                            <TopBar/>
                            <div className="mt-6 px-2">
                                <div className="flex items-start gap-6 flex-wrap w-full min-w-full">
                                    <div className={'px-4 font-[sans-serif] w-full'}>
                                        <Outlet/>
                                    </div>
                                </div>
                            </div>
                        </section>


                    </div>
                </div>);
            }}
        </AuthContext.Consumer>);
    }
}

export default PrivateLayout;
