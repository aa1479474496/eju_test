import React, { useState, memo, useMemo } from 'react';

interface data {
    name: string
}

interface ChildProps {
    data: data
}
const Child: React.FC<ChildProps> = memo(({data}) => {
    console.log('child render ...', data);

    return (
        <div>
            <div>child</div>
            <div>{data.name}</div>
        </div>
    )
});

const Hook: React.FC = () => {
    console.log('hook render');
    const [count, setCount] = useState(0);
    const [name, setName] = useState('rose');
    const data= useMemo(() => {
        return {
            name
        }
    }, [name])
    // const data = {
    //     name
    // }

    return (
        <div>
            <div>{count}</div>
            <button onClick={() => setCount(count + 1)}>update count</button>
            <button onClick={() => setName('jack')}>update name</button>
            <Child data={data}/>
        </div>
    )
}



export default Hook;