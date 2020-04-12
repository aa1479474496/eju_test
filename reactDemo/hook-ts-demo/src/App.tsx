import React from 'react';
import logo from './logo.svg';
import { User } from './example';
import Counter from './Counter';
import Article from './Article';
import './App.css';

const user = <User name='vortesnail' age={25}>I am children text!</User>

function App() {
    return (
        <div>
            {user}
            <div>
                <span>Counter:</span>
                <Counter />
            </div>
            <hr />
            <div>
                <span>Article:</span>
                <Article title='第一篇' content='第一篇内容' />
            </div>
        </div>
    );
}

export default App;
