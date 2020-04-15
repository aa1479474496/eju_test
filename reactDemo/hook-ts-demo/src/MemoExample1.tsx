import React, { useState, useMemo } from 'react';

// parent component
const MemoExample: React.FC = () => {
    const [time, setTime] = useState<number>(0);
    const [random, setRandom] = useState<number>(0);

    return (
        <div>
            <button onClick={() => setTime(new Date().getTime())}>获取当前时间</button>
            <button onClick={() => setRandom(Math.random())}>获取当前随机数</button>
            <Show time={time}>{random}</Show>
        </div>
    )
}

interface Data {
    time: number
}

const Show: React.FC<Data> = ({ time, children }) => {
    function changeTime(time: number): string {
        console.log('changeTime excuted ...');
        return new Date(time).toISOString();
    }

    return (
        <div>
            <p>Time is: {changeTime(time)}</p>
            <p>Random is: {children}</p>
        </div>
    )
}


export default MemoExample;