import React from 'react';
import {
    AuthContext,
    AuthContextType,
} from '../Context/AuthContext.tsx';
import DropDown from './DropDown.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHouse,
    faMagnifyingGlass,
    faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import {
    faBell,
    faCircleUser,
    faClock,
    faListAlt,
    faSquarePlus,
} from '@fortawesome/free-regular-svg-icons';

interface MyProps{
}

interface MyState{
}

class TopBar extends React.Component<MyProps, MyState>{

    constructor(props: MyProps){
        super(props);
        this.state = {
            showUserMenu: false,
        };
    }

    render(){
        return (<header className="z-50 bg-[#f7f6f9] sticky top-0 pt-4">
            <div
                className="flex flex-wrap items-center px-6 py-2 bg-white shadow-md min-h-[56px] rounded-md w-full relative tracking-wide">
                <div className="flex items-center flex-wrap gap-x-8 gap-y-4 z-50 w-full">
                    <div className="flex items-center gap-4 py-1 outline-none border-none">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        <input type="text" placeholder="Search something..."
                               className="w-full text-sm bg-transparent rounded outline-none"/>
                    </div>
                    <div className="flex items-center gap-8 ml-auto">
                        <div className="flex items-center space-x-6">
                            <FontAwesomeIcon icon={faHouse}/>
                            <FontAwesomeIcon icon={faBell}/>
                            <FontAwesomeIcon icon={faSquarePlus}/>
                        </div>

                        <div className="dropdown-menu relative flex shrink-0 group">
                            <img src="https://readymadeui.com/team-1.webp" alt="profile-pic"
                                 className="w-9 h-9 rounded-full border-2 border-gray-300 cursor-pointer"/>

                            <div
                                className="dropdown-content hidden group-hover:block shadow-md p-2 bg-white rounded-md absolute top-9 right-0 w-56">
                                <div className="w-full">
                                    <a href="javascript:void(0)"
                                       className="text-sm text-gray-800 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 dropdown-item transition duration-300 ease-in-out">
                                        <FontAwesomeIcon className={'w-4 h-4 mr-3'} icon={faCircleUser}/>
                                        Account</a>
                                    <hr className="my-2 -mx-2"/>

                                    <a href="javascript:void(0)"
                                       className="text-sm text-gray-800 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 dropdown-item transition duration-300 ease-in-out">
                                        <FontAwesomeIcon className={'w-4 h-4 mr-3'} icon={faListAlt}/>
                                        Dashboard</a>
                                    <a href="javascript:void(0)"
                                       className="text-sm text-gray-800 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 dropdown-item transition duration-300 ease-in-out">
                                        <FontAwesomeIcon className={'w-4 h-4 mr-3'} icon={faSquarePlus}/>
                                        Posts</a>
                                    <a href="javascript:void(0)"
                                       className="text-sm text-gray-800 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 dropdown-item transition duration-300 ease-in-out">
                                        <FontAwesomeIcon className={'w-4 h-4 mr-3'} icon={faClock}/>
                                        Schedules</a>
                                    <a href="javascript:void(0)"
                                       className="text-sm text-gray-800 cursor-pointer flex items-center p-2 rounded-md hover:bg-gray-100 dropdown-item transition duration-300 ease-in-out">
                                        <FontAwesomeIcon className={'w-4 h-4 mr-3'} icon={faPowerOff}/>
                                        Logout</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>);
    }

    renders(){

        return (<AuthContext.Consumer>
            {(auth: AuthContextType | undefined) => (<header className="bg-gray-200 shadow-md p-4 flex justify-between items-center">
                <div className="text-xl font-bold">Expenses Tracker</div>
                <div>
                    {auth?.isAuthenticated && <DropDown username={auth?.user?.name ?? ''} logout={auth.logout}/>}
                    {!auth?.isAuthenticated && <button className="p-2 bg-red-200 rounded">Logged Out</button>}
                </div>
            </header>)}
        </AuthContext.Consumer>);
    }
}

export default TopBar;
