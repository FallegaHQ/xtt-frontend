import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import axiosInstance from '../Client/AxiosInstance';
import User from '../DTOs/User/User.ts';

interface LoginResponse{
    status: string,
    authorization: { token: string },
    user: User
}

export interface AuthContextType{
    isAuthenticated: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (email: string, password: string) => Promise<void>;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [user, setUser]       = useState<null | User>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem('user');

        if(user){
            setUser(JSON.parse(user));
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = async(email: string, password: string) => {
        try{
            const res: { data: LoginResponse } = await axiosInstance.post('/auth/login', {
                email,
                password,
            });
            const resUser                      = res.data.user;
            localStorage.setItem('token', res.data.authorization.token);
            localStorage.setItem('token', res.data.authorization.token);
            setUser(resUser);
            localStorage.setItem('user', JSON.stringify(resUser));
            setIsAuthenticated(true);
        }
        catch(error){
            console.error('Login failed', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
    };

    // Register function
    const register                   = async(email: string, password: string) => {
        await axiosInstance.post('/auth/register', {
            email,
            password,
        });
    };
    const authValue: AuthContextType = useMemo(() => ({
        isAuthenticated,
        user,
        login,
        register,
        logout,
        loading,
    }), [
                                                   isAuthenticated,
                                                   user,
                                                   login,
                                                   logout,
                                                   loading,
                                               ]);

    return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within AuthProvider');
    }

    return context;
};
