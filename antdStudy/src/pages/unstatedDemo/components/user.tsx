import React, { useEffect } from 'react';
import Detail, { NameType } from '../models';


const User = () => {
  let detail = Detail.useContainer();
  console.log('dddd', detail);
  let { user } = detail;
  let { name = [] } = user;
  return (
  <h3>
    <p>test</p>
    {name.map((item:NameType) => (
      <p key={item.id}>{item.id}</p>
    ))}
  </h3>
  )
}

export default User;