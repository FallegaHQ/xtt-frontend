import React from 'react';

interface AccountProps{
}

class Account extends React.Component<AccountProps>{
    constructor(props: AccountProps){
        super(props);
    }

    render(){
        return (<div className="flex flex-col items-center w-full">
            <h1 className="text-4xl font-bold mb-4">Account</h1>
        </div>);
    }

}

export default Account;
