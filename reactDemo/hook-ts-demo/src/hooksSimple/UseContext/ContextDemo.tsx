import React, { useContext, useReducer } from 'react';

const reducer = (state = 0, { type }) => {
    switch (type) {
        case 'add':
            return state + 1;
        case 'delete':
            return state - 1;
        default:
            return state;
    }
}

const Context = React.createContext(null);

const Child = () => {
    const [count, dispatch] = useContext(Context);
    return (
        <div>
            <div>child... {count}</div>
            <button onClick={() => dispatch({ type: 'add' })}>child add</button>
            <button onClick={() => dispatch({ type: 'delete' })}>child delete</button>
        </div>
    )
}

const Hook = () => {
    const [count, dispatch] = useReducer(reducer, 10);
    return (
        <Context.Provider value={[count, dispatch]}>
            <div>
                <div>mom... {count}</div>
                <Child />
                <button onClick={() => dispatch({type: 'add'})}>mom add</button>
                <button onClick={() => dispatch({type: 'delete'})}>mom delete</button>
            </div>
        </Context.Provider>
    )
}

export default Hook;