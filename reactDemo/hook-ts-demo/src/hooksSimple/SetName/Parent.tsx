import React, { useState } from 'react';
import Child from './Child';

const Parent:React.FC = () => {
    const [name, setName] = useState('jack');

    return (
        <div>
            <button onClick={() => setName('rose')}> change name </button>
            <p>parent:{name}</p>
            <Child data={name}/>
        </div>

    )
}

export default Parent;