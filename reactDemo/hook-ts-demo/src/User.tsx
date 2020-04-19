import React, { useState, useEffect } from 'react';

// let switchCount: number = 0;


const User: React.FC = () => {
    const [count, setCount] = useState<number>(0);
    // const [name, setName] = useState<string>('');
    useEffect(() => {
        // console.log('effect');
    },[]);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    )
}

export default User;