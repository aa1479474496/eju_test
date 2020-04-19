import React from 'react';
import { HashRouter as Router, Link, Route } from 'react-router-dom';

import InitHooks from './initHooks/InitHooks';
import HooksSimple from './hooksSimple/HooksSimple';
import './App.css';

// const user = <User name='vortesnail' age={25}>I am children text!</User>

function App() {
    return (
        <Router>
            <div>
                <Link className="link" to='/'>initHooks</Link>
                <Link className="link" to='/simple'>hooksSimple</Link>
                <div style={{ padding: '20px', border: '1px solid green', margin: '20px' }}>
                    <Route path="/" exact component={InitHooks}></Route>
                    <Route path="/simple" component={HooksSimple}></Route>
                </div>



            </div>
        </Router>
    );
}

export default App;
