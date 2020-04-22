import React from 'react';
import { Button, Switch } from 'antd';
import useToggle from './useToggle';

export default () => {
    const { state, toggle } = useToggle();
    // const { state, toggle } = useToggle();
    console.log('useToggle', useToggle)
    return (
        <div>
            <p>
                Effects: 
                <Switch checked={state}/>
            </p>

            <p>
                <Button type="default" onClick={() => toggle()}>Toggle</Button>
            </p>
        </div>
    )
}
// export default toggleDemo;