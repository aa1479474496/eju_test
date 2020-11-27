import React, { useState, useEffect } from 'react';
import Detail from './models';

import List from './components/list';


const UnstatedDemo = () => {

  // const [initialState, setInitialState] = useState({ list: [] });

  const initialState = {
    list: [{ id: '测试' }]
  }

  // useEffect(() => {
  //   let detail = Detail.useContainer();
  //   let { addList } = detail;
  //   addList();

  //   // setInitialState({ 
  //   //   list: [{ id: '测试' }] 
  //   // });
  //   console.log('effect');
  //   // setTimeout(() => {
  //   // }, 1000);
  // }, []);

  console.log(2222);
  return (
    <Detail.Provider initialState={initialState}>
      <h3>UnstatedDemo</h3>
      <List />
    </Detail.Provider>

  )
}

export default UnstatedDemo;