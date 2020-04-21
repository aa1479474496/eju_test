import React from 'react';

import StateParent from './SetName/Parent';
import MemnName from './MemoName/MemoName';
import MemoCallback from './MemoCallback/MemoCallback';
import UseReducer from './UseReducer/ReducerDemo';
import UseContext from './UseContext/ContextDemo';
import CustomHook from './CustomHook/CustomHook';

const HooksSimple:React.FC = () => {
    return (
        <>
            <h1>test</h1>
            {/* <StateParent /> */}
            <hr/>
            <MemnName />

            <hr/>
            <MemoCallback />

            <hr/>
            <p>UseReducer</p>
            <UseReducer />

            <hr/>
            <p>UseContext</p>
            <UseContext />

            <hr/>
            <p>CustomHook</p>
            <CustomHook />
        </>
    )
}

export default HooksSimple;