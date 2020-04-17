import React, { useState } from 'react';

interface ChildProps {
    data: string
}

const Child:React.FC<ChildProps> = props => {
    let { data } = props;
    const [name, setName] = useState<string>(data);

    return (
        <>
            <p>{name}-{data}</p>
        </>
    )
}


export default Child;