import React, { useState, useEffect, useRef} from 'react';

const CounterRef:React.FC = () => {
    const [count, setCount] = useState<number>(0);
    // const preCountRef = useRef<number>(count);

    const countRef = useRef<number>(count)

    useEffect(() => {
        // console.log('111')
        countRef.current = count;
        // console.log('effect', countRef.current)
    },[count]);

    const handleCount = () => {
        setTimeout(() => {
            // console.log('current count:', count);
            // console.log('countRef:', countRef.current);
            
        }, 2000);
        // console.log('count:', count)
        // console.log('preCountRef:', preCountRef.current)
    }
    return (
        <div>
            {/* <p>pre count: { preCountRef.current }</p> */}
            <p>current count: { count }</p>
            <p>current2 count: { countRef.current }</p>
            <button onClick={() => setCount(count + 1)}>加</button>
            <button onClick={() => handleCount()}>alert</button>
        </div>
    )
}

export default CounterRef;