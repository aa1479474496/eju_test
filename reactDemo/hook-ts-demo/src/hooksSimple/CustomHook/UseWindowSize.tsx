import { useEffect, useState } from 'react';

export const useWindowSize = () => {
    const [width, setWidth] = useState<number>();
    const [height, setHeight] = useState<number>();

    useEffect(() => {
        const { clientWidth, clientHeight } = document.documentElement;
        setWidth(clientWidth);
        setHeight(clientHeight);
    }, []);

    useEffect(() => {
        const handleWindowSize = () => {
            const { clientWidth, clientHeight } = document.documentElement;
            setWidth(clientWidth);
            setHeight(clientHeight);
        }

        window.addEventListener('resize', handleWindowSize, false);

        return () => {
            window.removeEventListener('resize', handleWindowSize, false);
        }
    });

    return [width, height];
}