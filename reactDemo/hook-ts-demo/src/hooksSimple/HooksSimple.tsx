import React from 'react';

import StateParent from './SetName/Parent';
import MemnName from './MemoName/MemoName';
import MemoCallback from './MemoCallback/MemoCallback';


const HooksSimple:React.FC = () => {
    return (
        <>
            <h1>test</h1>
            {/* <StateParent /> */}
            <hr/>
            <MemnName />

            <hr/>
            <MemoCallback />
        </>
    )
}

export default HooksSimple;