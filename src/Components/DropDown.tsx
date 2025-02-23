import React from 'react';
import withClickOutside from '../HOC/withClickOutside.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faIdCard,
    faListAlt,
    faTimesCircle,
    faUser,
} from '@fortawesome/free-regular-svg-icons';

type DropDownState = {
    showMenu: boolean;
};

interface DropDownProps{
    username?: number | string,
    logout?: () => void
}

class DropDown extends React.Component<DropDownProps, DropDownState>{

    constructor(props: DropDownProps){
        super(props);
        this.state = {
            showMenu: false,
        };
    }

    toggleDropdown = () => {
        this.setState((prevState) => ({ showMenu: !prevState.showMenu }));
    };

    handleClickOutside = () => {
        this.setState({ showMenu: false });
    };

    render(){

        return (<div className="p-2">
            <div className="relative font-[sans-serif] w-max mx-auto">
                <button type="button"
                        className="px-4 py-2 flex items-center rounded-full text-[#333] text-sm border border-gray-300 outline-none hover:bg-gray-50"
                        onClick={this.toggleDropdown}>
                    <FontAwesomeIcon icon={faUser} className={'mr-2'}/>
                    {this.props.username}
                </button>

                <ul
                    className={`absolute shadow-lg bg-white py-2 z-[1000] min-w-full w-max rounded-lg max-h-96 overflow-auto ${this.state.showMenu ? 'block' : 'hidden'}`}>
                    <li className="py-2.5 px-5 flex items-center hover:bg-gray-50 text-[#333] text-sm cursor-pointer">
                        <FontAwesomeIcon icon={faIdCard} className={'mr-2'}/>
                        View profile
                    </li>
                    <li className="py-2.5 px-5 flex items-center hover:bg-gray-50 text-[#333] text-sm cursor-pointer">
                        <FontAwesomeIcon icon={faListAlt} className={'mr-2'}/>
                        Dashboard
                    </li>
                    <li className="py-2.5 px-5 flex items-center hover:bg-gray-50 text-[#333] text-sm cursor-pointer"
                        onClick={this.props.logout}>
                        <FontAwesomeIcon icon={faTimesCircle} className={'mr-2'} color={'#f00'}/>
                        Logout
                    </li>
                </ul>
            </div>
        </div>);

    }
}

export default withClickOutside(DropDown);
