import {
    BrowserRouter as Router,
    useRoutes,
} from 'react-router-dom';
import React, {
    lazy,
    Suspense,
} from 'react';

const Home               = lazy(async() => import('./Pages/Home'));
const Login              = lazy(async() => import('./Pages/Login'));
const Dashboard          = lazy(async() => import('./Pages/Dashboard'));
const Account            = lazy(async() => import('./Pages/Account'));
const Settings           = lazy(async() => import('./Pages/Settings'));
const PublicLayout       = lazy(async() => import('./Layouts/PublicLayout'));
const PrivateLayout      = lazy(async() => import('./Layouts/PrivateLayout'));
const Transactions       = lazy(async() => import('./Pages/Transactions'));
const TransactionDetails = lazy(async() => import('./Pages/TransactionDetails'));
const NotFound           = lazy(async() => import('./Pages/Errors/404'));

const AppRoutes = () => {
    return useRoutes([
                         {
                             path    : '/',
                             element : <PublicLayout/>,
                             children: [
                                 {
                                     path   : '',
                                     element: <Home/>,
                                 },
                                 {
                                     path   : 'home',
                                     element: <Home/>,
                                 },
                                 {
                                     path   : 'login',
                                     element: <Login/>,
                                 },
                             ],
                         },
                         {
                             path    : '/',
                             element : <PrivateLayout/>,
                             children: [
                                 {
                                     path   : 'dashboard',
                                     element: <Dashboard/>,
                                 },
                                 {
                                     path   : 'account',
                                     element: <Account/>,
                                 },
                                 {
                                     path   : 'settings',
                                     element: <Settings/>,
                                 },
                                 {
                                     path    : 'transactions',
                                     children: [
                                         {
                                             path   : '',
                                             element: <Transactions/>,
                                         },
                                         {
                                             path   : ':expenseId',
                                             element: <TransactionDetails/>,
                                         },
                                     ],
                                 },
                             ],
                         },
                         {
                             path   : '/*',
                             element: <NotFound/>,
                         },
                     ]);
};

interface AppProps{
}

class App extends React.Component<AppProps>{
    constructor(props: AppProps){
        super(props);
    }

    render(){
        return (<main className="flex flex-col items-center gap-8 min-h-screen mx-auto min-w-full bg-gray-50">
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <AppRoutes/>
                </Suspense>
            </Router>
        </main>);
    }

}

export default App;
