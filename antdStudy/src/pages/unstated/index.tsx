import * as React from 'react';
import CounterDisplay from './components/counterDisplay';
import Container from '@/store/Counter';

export default () => {
  return (
    <Container.Provider initialState={2}>
      <CounterDisplay />

      <Container.Provider initialState={4}>
        <div style={{marginTop: '15px', fontSize: '18px'}}>
          <CounterDisplay />
        </div>
      </Container.Provider>
    </Container.Provider>
  )
}