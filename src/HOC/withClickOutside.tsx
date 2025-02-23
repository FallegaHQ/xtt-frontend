import React, {
    FunctionComponent,
    useEffect,
    useRef,
} from 'react';

const withClickOutside = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const ComponentWithClickOutside: FunctionComponent<P> = (props) => {
        const wrapperRef   = useRef<HTMLDivElement>(null);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const componentRef = useRef<any>(null);

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if(wrapperRef.current && !wrapperRef.current.contains(event.target as Node)){
                    if(componentRef.current && componentRef.current.handleClickOutside){
                        componentRef.current.handleClickOutside();
                    }
                }
            };
            document.addEventListener('mousedown', handleClickOutside);

            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, []);

        return (<div ref={wrapperRef}>
            <WrappedComponent ref={componentRef} {...(props as P)} />
        </div>);
    };

    return ComponentWithClickOutside;
};

export default withClickOutside;
