import React from 'react';
import { Button, Switch } from 'antd';
import useToggle from './useToggle';

const ToggleDemo:React.FC = () => {
    const { state, toggle ,setLeft, setRight} = useToggle('Hello', 'World');
    return  (
        <>
            <div>{state}</div>
            <p>
                Effects:
                {/* <Switch checked={state} /> */}
            </p>
            <p>
                <Button type="default" onClick={() => toggle()}>Toggle</Button>
            </p>
            <Button type="danger" onClick={() => toggle('Hello')} style={{ margin: '0 16px' }}>
                Toggle Hello
            </Button>

            <Button type="danger" onClick={setLeft} style={{ margin: '0 16px' }}>
                Set Hello
            </Button>
        </>
    )
}


export default ToggleDemo;