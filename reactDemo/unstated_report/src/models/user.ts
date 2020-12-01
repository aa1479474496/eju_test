import React, { useState, useEffect } from 'react';


function useUser() {
  let [user, setUser] = useState({name: 'xxx'});

  useEffect(() => {
    setTimeout(() => {
      console.log('user timeout');
      setUser({name: 'user name'});
    }, 2000);
  }, [])


  return {
    user,
    setUser
  }
}

export { useUser };