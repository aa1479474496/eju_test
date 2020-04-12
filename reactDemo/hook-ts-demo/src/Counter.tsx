import React, { useState } from 'react';

interface CounterProps {
    initial?: number
}

const Counter: React.FC<CounterProps> = props => {
    const { initial = 0 } = props;

    const [count, setCount] = useState<number>(initial);
    return (
        <>
            <div>Count: {count}</div>
            <button onClick={() => setCount(count+1)}>加</button>
            <button onClick={() => setCount(count-1)}>减</button>
        </>
    )
}

export default Counter;