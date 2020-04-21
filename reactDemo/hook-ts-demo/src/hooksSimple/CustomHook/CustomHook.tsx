import React from 'react';

import  { useWindowSize } from './UseWindowSize';

const CustomHook:React.FC = () => {
    const [width, height] = useWindowSize();
    return (
        <>
            <div>width: {width}</div>
            <div>height: {height}</div>
        </>
    )
}

export default CustomHook;