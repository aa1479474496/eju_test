import React from 'react';
// import logo from './logo.svg';
// import { User } from './example';
import Counter from './Counter';
import Article from './Article';
import User from './User';
import CounterRef from './CounterRef';
import CreateRef from './CreateRef';

import  HooksSimple from './hooksSimple/HooksSimple';
import './App.css';

// const user = <User name='vortesnail' age={25}>I am children text!</User>

function App() {
    return (
        <div>
            {/* {user} */}

            <div style={{padding:'20px',border: '1px solid green', margin:'20px'}}>
            <HooksSimple />
            </div>

            <div>
                <span>Counter:</span>
                <Counter />
            </div>
            <hr />
            <div>
                <span>Article:</span>
                <Article title='第一篇' content='第一篇内容' />
            </div>
            <hr/>
            <div>
                <span>User:useEffect</span>
                <User />
            </div>
            <hr/>
            <div>
                <span>CounterRef:useRef</span>
                <CounterRef />
            </div>
            <hr/>
            <div>
                <span>CreateRef:useRef</span>
                <CreateRef />
            </div>
        </div>
    );
}

export default App;
