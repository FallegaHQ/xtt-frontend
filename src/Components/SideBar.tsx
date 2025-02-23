import React, { JSX } from 'react';
import withClickOutside from '../HOC/withClickOutside.tsx';
import {
    faChevronRight,
    faClose,
    faGauge,
    faListNumeric,
} from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from '../Models/SideMenu.ts';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import Logo from './Logo.tsx';

interface SideBarState{
    showMenu: boolean;
    submenuStates: Record<string, boolean>;
}

interface SideBarProps{
}

class SideBar extends React.Component<SideBarProps, SideBarState>{

    private items: MenuItem[] = [
        {
            id  : 'dashboard',
            name: 'Dashboard',
            path: '/dashboard',
            icon: faGauge,
        },
        {
            id  : 'transactions',
            name: 'Transactions',
            path: '/transactions',
            icon: faListNumeric,
        },
        {
            id   : 'manage',
            type : 'submenu',
            name : 'Management',
            icon : faUser,
            items: [
                {
                    id  : 'account',
                    name: 'Account',
                    path: '/account',
                },
                {
                    id  : 'settings',
                    name: 'Settings',
                    path: '/settings',
                },
            ],
        },
    ];

    constructor(props: SideBarProps){
        super(props);

        const initialStates: Record<string, boolean> = {};
        this.initializeSubmenuStates(this.items, initialStates);

        this.state = {
            submenuStates: initialStates,
            showMenu     : false,
        };
    }

    toggleDropdown = () => {
        this.setState((prevState) => ({ showMenu: !prevState.showMenu }));
    };

    handleClickOutside = () => {
        this.setState({ showMenu: false });
    };

    render(){
        const showMenu = this.state.showMenu;

        return (<>
            <nav id="sidebar" className="lg:min-w-[250px] w-max max-lg:min-w-0">
                <div id="sidebar-collapse-menu"
                     className="bg-white shadow-lg h-screen fixed top-0 left-0 overflow-auto z-[1000] lg:min-w-[250px] lg:w-max max-lg:w-0 max-lg:invisible transition-all duration-500"
                     style={showMenu ? {
                         width     : 250,
                         visibility: 'visible',
                         opacity   : 1,
                     } : {}}>
                    <div
                        className="flex items-center gap-2 pt-6 pb-2 px-4 sticky top-0 bg-white min-h-[64px] z-[1001]">
                        <a href="/" className={'justify-self-center self-center'}>
                            <Logo className="w-[140px]" animate={true}/>
                        </a>
                        <button id="close-sidebar" className="lg:hidden ml-auto" onClick={this.toggleDropdown}>
                            <FontAwesomeIcon icon={faClose}/>
                        </button>
                    </div>

                    <div className="py-4 px-4">
                        <ul className="space-y-2">
                            {this.items.map(this.renderMenuItem)}
                        </ul>
                    </div>
                </div>
            </nav>

            <button id="open-sidebar" className="lg:hidden ml-4 mt-12 fixed top-0 left-0 bg-white z-[999] "
                    onClick={this.toggleDropdown}>
                <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clipRule="evenodd"></path>
                </svg>
            </button>
        </>);

    }

    private initializeSubmenuStates(items: MenuItem[], states: Record<string, boolean>): void{
        items.forEach(item => {
            if(item.type === 'submenu'){
                states[item.id] = item.defaultExpanded ?? false;
            }
        });
    }

    private toggleSubmenu = (id: string): void => {
        this.setState(prevState => ({
            submenuStates: {
                ...prevState.submenuStates,
                [id]: !prevState.submenuStates[id],
            },
        }));
    };

    private renderMenuItem = (item: MenuItem): JSX.Element | null => {
        if(item.type === 'separator'){
            return <hr key={item.id} className="my-2 border-gray-200"/>;
        }

        if(!item.type || item.type === 'link'){
            return (<li key={item.id}>
                <NavLink
                    to={item.path}
                    className="text-gray-800 text-sm flex items-center cursor-pointer hover:bg-gray-100 rounded-md px-3 py-2.5 transition-all duration-300"
                >
                    {item.icon && (<FontAwesomeIcon
                        icon={item.icon}
                        className="w-[18px] h-[18px] mr-3"
                    />)}
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                            {item.name}
                        </span>
                </NavLink>
            </li>);
        }

        if(item.type === 'submenu'){
            const isExpanded = this.state.submenuStates[item.id];

            return (<li key={item.id}>
                <button
                    onClick={() => this.toggleSubmenu(item.id)}
                    className="text-gray-800 text-sm flex items-center cursor-pointer hover:bg-gray-100 rounded-md px-3 py-2.5 transition-all duration-300 w-full"
                >
                    {item.icon && (<FontAwesomeIcon
                        icon={item.icon}
                        className="w-[18px] h-[18px] mr-3"
                    />)}
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                            {item.name}
                        </span>
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className={`w-3 fill-current ml-auto transition-all duration-500 ${isExpanded ? 'rotate-90' : ''}`}
                    />
                </button>
                <ul className={`sub menu overflow-hidden transition-[max-height] duration-500 ease-in-out ml-8 ${isExpanded ? 'max-h-[500px]' : 'max-h-0'}`}>
                    {item.items.map((subItem) => (<li key={subItem.id}>
                        <NavLink
                            to={subItem.path}
                            className="text-gray-800 text-sm block cursor-pointer hover:bg-gray-100 rounded-md px-3 py-2 transition-all duration-300"
                        >
                            <span>{subItem.name}</span>
                        </NavLink>
                    </li>))}
                </ul>
            </li>);
        }

        return null;
    };
}

export default withClickOutside(SideBar);
