import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import { Button, Card, Divider } from 'antd';

import toggleDemo from "./Hooks/useToggle/demo";
import toggleDemo1 from "./Hooks/useToggle/demo";

const links = [
    {path: '/fakehooks/toggle', component: toggleDemo, text: 'toggle'},
    {path: '/fakehooks/toggle1', component: toggleDemo1, text: 'toggle1'}
]

const createLinks = (type, setPath) => {
    return (
        links.map(link => {
            let typename = '';
            if (type === link.path) {
                typename = 'is_active'
            }
            return <Button key={link.path} onClick={() => {setPath(link.path)}} type="link" className={typename}><Link className="link" to={link.path}>{link.text}</Link></Button>
        })
    )
}

const createRouts = () => {
    return (
        links.map(link => {
            return <Route key={link.path} path={link.path} component={link.component}></Route>
        })
    )
}

const FakeHooks = (props) => {
    console.log('props', props)
    let comprops = props;
    const [path, setPath] = useState<string>('');
    const [name, setName] = useState<string>('jack');
    useEffect(() => {
        console.log('effect');
        if (!path) {
            let { location = {} } = comprops;
            let { pathname } = location;
            setPath(pathname);
        }
    }, []);

    return (
        <div>
            fakdeHooks

            <Button type="primary" onClick={() => setName('rose')}>Primary - {name}</Button>

            <Card>
                {createLinks(path, setPath)}
                   
                
            </Card>

            <Divider />

            <Card>
               {createRouts()}
            </Card>


        </div>
    )
}

export default FakeHooks;