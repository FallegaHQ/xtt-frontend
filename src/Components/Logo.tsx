import React from 'react';

type LogoProps = {
    animate?: boolean, className?: string
};

class Logo extends React.Component<LogoProps>{
    constructor(props: LogoProps){
        super(props);
    }

    render(){

        return (<svg
                width="287.496"
                height="50.328"
                viewBox="0 0 287.496 50.328"
                xmlns="http://www.w3.org/2000/svg"
                className={this.props.className}
            >
                <g
                    id="svgGroup"
                    strokeLinecap="round"
                    fillRule="nonzero"
                    fontSize="9pt"
                    stroke="#00000000"
                    strokeWidth={0}
                    fill="#000"
                    style={{
                        fill: '#000',
                    }}
                >
                    <path
                        d="M 44.712 0 L 25.776 24.696 L 44.712 49.464 L 37.8 49.464 L 22.32 29.232 L 6.84 49.464 L 0 49.464 L 18.936 24.768 L 0 0 L 6.912 0 L 22.392 20.232 L 37.872 0 L 44.712 0 Z"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path
                        d="M 54.648 14.976 A 45.059 45.059 0 0 1 55.284 14.664 C 60.332 12.239 64.584 11.376 68.04 11.376 A 19.445 19.445 0 0 1 73.125 12.005 C 79.854 13.825 83.16 19.442 83.16 26.784 L 83.16 49.464 L 77.76 49.464 L 77.76 43.632 A 14.953 14.953 0 0 1 67.398 50.096 A 16.657 16.657 0 0 1 64.656 50.328 A 17.782 17.782 0 0 1 59.861 49.7 C 56.844 48.854 54.401 47.181 52.859 44.833 A 11.457 11.457 0 0 1 51.048 38.448 A 11.639 11.639 0 0 1 57.238 28.188 A 17.011 17.011 0 0 1 65.664 26.064 A 32.55 32.55 0 0 1 69.744 26.333 A 45.117 45.117 0 0 1 77.76 28.152 L 77.76 26.784 A 17.573 17.573 0 0 0 77.68 25.086 C 77.317 21.353 75.644 17.62 71.098 16.398 A 13.152 13.152 0 0 0 67.68 15.984 A 13.431 13.431 0 0 0 66.452 16.041 A 27.571 27.571 0 0 0 56.808 19.368 L 54.648 14.976 Z M 77.76 32.112 C 74.376 31.176 70.56 30.6 66.528 30.6 A 14.323 14.323 0 0 0 65.177 30.663 C 60.245 31.131 56.304 34.136 56.304 38.232 A 6.796 6.796 0 0 0 56.915 41.115 C 57.697 42.802 59.184 44.059 61.109 44.801 A 12.498 12.498 0 0 0 65.592 45.576 C 70.488 45.576 76.32 43.056 77.76 37.8 L 77.76 32.112 Z"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path
                        d="M 99.648 18.216 C 101.808 14.256 106.632 11.376 111.888 11.376 A 16.309 16.309 0 0 1 113.398 11.445 C 118.113 11.884 121.879 14.378 123.99 18.174 A 15.542 15.542 0 0 1 125.856 25.776 L 125.856 49.464 L 120.456 49.464 L 120.456 26.496 A 13.069 13.069 0 0 0 120.171 23.736 C 119.19 19.195 115.763 16.2 111.168 16.2 C 104.904 16.2 99.648 20.592 99.648 25.776 L 99.648 49.464 L 94.248 49.464 L 94.248 12.24 L 99.648 12.24 L 99.648 18.216 Z"
                        vectorEffect="non-scaling-stroke" fill={'#f00'}
                    />
                    <path
                        d="M 138.528 14.976 A 45.059 45.059 0 0 1 139.164 14.664 C 144.212 12.239 148.464 11.376 151.92 11.376 A 19.445 19.445 0 0 1 157.005 12.005 C 163.734 13.825 167.04 19.442 167.04 26.784 L 167.04 49.464 L 161.64 49.464 L 161.64 43.632 A 14.953 14.953 0 0 1 151.278 50.096 A 16.657 16.657 0 0 1 148.536 50.328 A 17.782 17.782 0 0 1 143.741 49.7 C 140.724 48.854 138.281 47.181 136.739 44.833 A 11.457 11.457 0 0 1 134.928 38.448 A 11.639 11.639 0 0 1 141.118 28.188 A 17.011 17.011 0 0 1 149.544 26.064 A 32.55 32.55 0 0 1 153.624 26.333 A 45.117 45.117 0 0 1 161.64 28.152 L 161.64 26.784 A 17.573 17.573 0 0 0 161.56 25.086 C 161.197 21.353 159.524 17.62 154.978 16.398 A 13.152 13.152 0 0 0 151.56 15.984 A 13.431 13.431 0 0 0 150.332 16.041 A 27.571 27.571 0 0 0 140.688 19.368 L 138.528 14.976 Z M 161.64 32.112 C 158.256 31.176 154.44 30.6 150.408 30.6 A 14.323 14.323 0 0 0 149.057 30.663 C 144.125 31.131 140.184 34.136 140.184 38.232 A 6.796 6.796 0 0 0 140.795 41.115 C 141.577 42.802 143.064 44.059 144.989 44.801 A 12.498 12.498 0 0 0 149.472 45.576 C 154.368 45.576 160.2 43.056 161.64 37.8 L 161.64 32.112 Z"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path
                        d="M 213.336 49.464 L 213.336 5.328 L 196.704 5.328 L 196.704 0 L 235.584 0 L 235.584 5.328 L 218.952 5.328 L 218.952 49.464 L 213.336 49.464 Z"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path
                        d="M 245.592 49.464 L 245.592 0 L 251.208 0 L 281.88 40.248 L 281.88 0 L 287.496 0 L 287.496 49.464 L 281.88 49.464 L 251.208 9.216 L 251.208 49.464 L 245.592 49.464 Z"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>
            </svg>

        );
    };
}

export default Logo;
