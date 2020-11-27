import * as React from 'react';
import CounterDisplay from './components/counterDisplay';
import ShowCount from './components/ShowCount';


import Counter from '@/store/Counter';

export default () => {
  const [count, setCount] = React.useState(3);

  React.useEffect(() => {
    setCount(5);
  }, []);

  return (
    <Counter.Provider initialState={count}>
      <p>{count}</p>
      <CounterDisplay />
      <div style={{height: '30px'}}></div>
      <ShowCount />
    </Counter.Provider>
  )
}
