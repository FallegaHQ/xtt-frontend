import React from 'react';
import { Navigate } from 'react-router-dom';
import {
    AuthContext,
    AuthContextType,
} from '../Context/AuthContext';

function finalMethod(target: unknown, propertyKey: string){
    const className = target?.constructor.name;

    if(Object.prototype.hasOwnProperty.call(target, propertyKey)){
        throw new Error(`${className} must not override ${propertyKey}(). It is marked as final.`);
    }
}

export interface PageState{
    isLoading?: boolean;
}

export interface PageProps{
    title?: string;
}

abstract class Page<P extends PageProps = PageProps, S extends PageState = PageState> extends React.Component<P, S>{
    protected static requiresAuth: boolean = false;
    declare context: AuthContextType;

    public constructor(props: P){
        super(props);
        // Prevent overriding render in child classes
        if(Object.prototype.hasOwnProperty.call(Object.getPrototypeOf(this), 'render')){
            throw new Error(`${this.constructor.name} must not override render(). Use renderContent() instead.`);
        }

        this.state = this.getDefaultState();
    }

    protected abstract get pageTitle(): string | null;

    componentDidMount(): void{
        if(this.initializePage !== Page.prototype.initializePage){
            this.initializePage();
        }
        this.updateDocumentTitle();
    }

    @finalMethod render(): React.ReactNode{
        const requiresAuth = (this.constructor as typeof Page).requiresAuth;
        const title        = this.pageTitle;

        if(requiresAuth){
            return this.renderWithAuthContext((auth) => (<div className="page">
                {title && <h1 className="text-gray-800 text-3xl font-bold mb-5">{title}</h1>}
                {this.renderContent(auth)}
            </div>));
        }

        return (<div className="page">
            {title && <h1 className="text-gray-800 text-3xl font-bold mb-5">{title}</h1>}
            {this.renderContent()}
        </div>);
    }

    protected getDefaultState(): S{
        return {
            isLoading: false,
        } as S;
    }

    protected initializePage(): void{
    }

    // noinspection JSUnusedGlobalSymbols
    protected setLoading(loading: boolean): void{
        this.setState(prevState => ({
            ...prevState,
            isLoading: loading,
        } as S));
    }

    protected abstract renderContent(auth?: AuthContextType): React.ReactNode;

    private updateDocumentTitle(): void{
        const title = this.pageTitle;
        if(title){
            document.title = title;
        }
    }

    private renderWithAuthContext(content: (auth: AuthContextType) => React.ReactNode): React.ReactNode{
        return (<AuthContext.Consumer>
            {(auth: AuthContextType | undefined) => {
                if(!auth?.isAuthenticated){
                    return <Navigate to="/login" replace/>;
                }
                return content(auth);
            }}
        </AuthContext.Consumer>);
    }
}

export default Page;
