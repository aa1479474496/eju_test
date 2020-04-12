import React from 'react';
import logo from './logo.svg';
import { User } from './example';
import './App.css';

const user = <User name='vortesnail' age={25}>I am children text!</User>

function App() {
    return (
        <div>
            {user}
        </div>
    );
}

export default App;
