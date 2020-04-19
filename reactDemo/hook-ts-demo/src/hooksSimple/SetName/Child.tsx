import React, { useState, useEffect, useRef } from 'react';

interface ChildProps {
    data: string
}

const Child:React.FC<ChildProps> = props => {
    let { data } = props;
    const [name, setName] = useState<string>(data);
    const [count, setCount] = useState<number>(0);
    const countRef = useRef(5);
    // const countRef = useRef<number>(count);
    useEffect(() => {
        // countRef.current = count;
        console.log('use effect...', count);
        const timer = setInterval(() => {
            // console.log('time...count', count, countRef.current);
            countRef.current++;
            let _count = countRef.current + 10;

            console.log('time...count', _count, countRef.current);

            setCount(_count);
        },1000);
        return () => clearInterval(timer);
    }, []);
    return (
        <>
            <p>{name}-{data}=={count}</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </>
    )
}


export default Child;