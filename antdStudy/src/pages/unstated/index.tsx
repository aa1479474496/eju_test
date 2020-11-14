import * as React from 'react';
import CounterDisplay from './components/counterDisplay';
import ShowCount from './components/ShowCount';


import Counter from '@/store/Counter';

export default () => {
  return (
    <Counter.Provider initialState={2}>
      <CounterDisplay />
      <div style={{height: '30px'}}></div>
      <ShowCount />
    </Counter.Provider>
  )
}
