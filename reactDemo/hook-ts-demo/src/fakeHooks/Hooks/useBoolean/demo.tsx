import React from 'react';
import { Button, Switch } from 'antd';
import useBoolean from './useBoolean';

const BooleanDemo:React.FC = () => {
    const { state, toggle, setTrue, setFalse } = useBoolean(true);
    return (
        <>
           <p>
               Effects:
               <Switch checked={state} onChange={toggle}></Switch>
           </p>

           <p>
                <Button type="default" onClick={() => toggle()}>Toggle</Button>
                <Button type="danger" onClick={setFalse} style={{margin: '0 16px'}}>Set false</Button>
                <Button type="primary" onClick={setTrue} style={{margin: '0 16px'}}>Set true</Button>
           </p>
        </>
    )
}

export default BooleanDemo;