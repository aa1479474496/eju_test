import React from 'react';
import { Button, Switch } from 'antd';
import useToggle from './useToggle';

const ToggleDemo:React.FC = () => {
    const { state, toggle } = useToggle();
    return  (
        <>
            <div>{state}</div>
            <p>
                Effects:
                <Switch checked={state} />
            </p>
            <p>
                <Button type="default" onClick={() => toggle()}>Toggle</Button>
            </p>
        </>
    )
}


export default ToggleDemo;