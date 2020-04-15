import React from 'react';
// import logo from './logo.svg';
// import { User } from './example';
import Counter from './Counter';
import Article from './Article';
import User from './User';
import CounterRef from './CounterRef';
import CreateRef from './CreateRef';
import MemoExample1 from './MemoExample1';
import MemoExample2 from './MemoExample2';
import UseState2 from './UseState2';
import './App.css';

// const user = <User name='vortesnail' age={25}>I am children text!</User>

function App() {
    return (
        <div>
            {/* {user} */}
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
            <hr/>
            {/* <div>
                <span>useMemo:MemoExample1</span>
                <MemoExample1 />
            </div>
            <hr/> */}
            <div>
                <span>useMemo:MemoExample2</span>
                <MemoExample2 />
            </div>

            <hr/>
            <div>
                <span>UseState2:UseState2</span>
                <UseState2 />
            </div>
            
        </div>
    );
}

export default App;
