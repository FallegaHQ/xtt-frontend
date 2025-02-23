import React, {
    useContext,
    useState,
} from 'react';
import {
    AuthContext,
    AuthContextType,
} from '../Context/AuthContext';
import {
    Navigate,
    useNavigate,
} from 'react-router-dom';

const Login = () => {
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const auth                    = useContext(AuthContext);
    const navigate                = useNavigate();

    if(!auth){
        return null;
    }

    const handleLogin = async(e: React.FormEvent) => {
        e.preventDefault();
        await auth.login(email, password);
        navigate('/dashboard');
    };

    return (<AuthContext.Consumer>
        {(auth: AuthContextType | undefined) => {
            if(auth?.isAuthenticated){
                return <Navigate to="/dashboard" replace/>;
            }
            return (<div className="flex justify-center items-center w-96">
                <form onSubmit={handleLogin} className="bg-white w-full p-6 rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Login</h2>
                    <input
                        type="email"
                        className="w-full p-2 border rounded mb-3"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="w-full p-2 border rounded mb-3"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
                </form>
            </div>);
        }}
    </AuthContext.Consumer>);
};

export default Login;
