import React, { useState } from 'react';


function useUser() {
  let [user, setUser] = useState({name: 'xxx'});

  return {
    user,
    setUser
  }
}