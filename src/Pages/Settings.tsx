import React from 'react';

interface SettingsProps{
}

class Settings extends React.Component<SettingsProps>{
    constructor(props: SettingsProps){
        super(props);
    }

    render(){
        return (<div className="flex flex-col items-center w-full">
            <h1 className="text-4xl font-bold mb-4">Settings</h1>
        </div>);
    }

}

export default Settings;
