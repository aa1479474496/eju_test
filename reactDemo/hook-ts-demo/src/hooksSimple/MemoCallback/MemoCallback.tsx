import React, { useState, memo, useMemo, useCallback } from 'react';

interface ChildProps {
    name: string,
    onChange?(e:any): void
}

const Child: React.FC<ChildProps> = memo((props) => {
    console.log('child render');
    
    let { name, onChange } = props;
    return (
        <div>
            <div>child-----{name}</div>
            <input type="text" onChange={onChange}/>
        </div>
    )
});


const Parent: React.FC = () => {
    const [name, setName] = useState<string>('test');
    const [text, setText] = useState<string>('');
    const onChange = useCallback((e) => {
        setText(e.target.value)
    }, []);
    return (
        <>
            <p>test callback</p>
            <p>text: {text}</p>
            <Child name={name} onChange={onChange}></Child>
        </>
    )
}

export default Parent;


// let props = {
//     name: 'jack',
//     data: {
//         count: 0,
//         age: 12
//     }
// }

// interface data {
//     count: number,
//     age: number
// }
// interface ChildProps {
//     name: string,
//     data: data
// }

// interface ChildProps {
//     name: string,
//     data: {
//         count: number,
//         age: number 
//     }
// }