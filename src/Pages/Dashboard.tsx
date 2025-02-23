import { AuthContextType } from '../Context/AuthContext.tsx';
import Page, {
    PageProps,
    PageState,
} from '../Components/Page';
import React from 'react';

class Dashboard extends Page<PageProps, PageState>{
    protected static requiresAuth: boolean = true;

    protected get pageTitle(): string{
        return 'Dashboard';
    }

    protected renderContent(auth?: AuthContextType): React.ReactNode{
        return (<div className="p-6">

            <p>{auth?.user?.name ?? 'No user logged in'}</p>
        </div>);
    }

}

export default Dashboard;
