import {
    AuthContext,
    AuthContextType,
} from '../Context/AuthContext';
import { Link } from 'react-router-dom';

import React from 'react';

interface HomeProps{
}

class Home extends React.Component<HomeProps>{
    static contextType = AuthContext;
    declare context: AuthContextType;

    constructor(props: HomeProps){
        super(props);
    }

    render(){

        return (<div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
            <p className="text-lg text-gray-600 mb-6">
                {this.context.user ? `Hello, ${this.context.user.email}!` : 'Please log in or register to continue.'}
            </p>

            <div className="flex space-x-4">
                {this.context.user ? (<>
                    <Link to={'/dashboard'} className="px-4 py-2 bg-blue-500 text-white rounded">
                        Go to Dashboard
                    </Link>
                    <button onClick={this.context.logout} className="px-4 py-2 bg-red-500 text-white rounded">
                        Logout
                    </button>
                </>) : (<>
                    <Link to={'/login'} className="px-4 py-2 bg-green-500 text-white rounded">
                        Login
                    </Link>
                    <Link to={'/register'} className="px-4 py-2 bg-blue-500 text-white rounded">
                        Register
                    </Link>
                </>)}
            </div>
        </div>);
    }

}

export default Home;
