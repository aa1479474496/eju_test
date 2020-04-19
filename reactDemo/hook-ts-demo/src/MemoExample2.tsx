import React, { useState, useMemo, useEffect } from 'react';

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

// const Show: React.FC<Data> = ({ time, children }) => {
//     function changeTime(time: number): string {
//         console.log('changeTime excuted123 ...');
//         return new Date(time).toISOString();
//     }

//     const newTime: string = useMemo(() => {
//         return changeTime(time);
//     }, [time])

//     return (
//         <div>
//             <p>Time is: {newTime}</p>
//             <p>Random is: {children}</p>
//         </div>
//     )
// }

const Show:React.FC<Data> = ({ time, children }) => {
    function changeTime(time: number): string {
    //   console.log('changeTime excuted345...')
      return new Date(time).toISOString()
    }
  
    const newTime: string = useMemo(() => {
        // console.log('23232')
      return changeTime(time)
    }, [time]);

    useEffect(() => {
        // console.log('effect usememo')
    }, [time]);

    // useEffect(() => {
    //     console.log('effect');
    // },[]);
  
    return (
      <div>
        <p>Time is: { newTime }</p>
        <p>Random is: { children }</p>
      </div>
    )
  }
  
 


export default MemoExample;