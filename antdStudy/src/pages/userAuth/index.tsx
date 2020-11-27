import React, { useEffect } from 'react';
import { useModel } from 'umi';


const UserAuth = () => {
  const { user, signIn } = useModel('user');
  let { name = '' } = user;
  useEffect(() => {
    setTimeout(() => {
      console.log('time out');
      signIn({
        name: 'test'
      })
    }, 2000);
  }, []);

  return (
    <div>
      <h3>userAuth</h3>
      <p>{name}</p>
    </div>
  )
}


export default UserAuth;