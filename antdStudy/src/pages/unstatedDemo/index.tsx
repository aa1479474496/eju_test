import React, { useState, useEffect } from 'react';
import Detail from './models';

// import List from './components/list';
import User from './components/user';


const UnstatedDemo = () => {
  // const initialState = {
  //   list: [{ id: '测试' }]
  // }
  return (
    <Detail.Provider>
      <h3>UnstatedDemo</h3>
      {/* <List /> */}
      <User />
    </Detail.Provider>

  )
}

export default UnstatedDemo;