import React, { useEffect, useState, useRef } from 'react';
import { createContainer } from "unstated-next";

let init = {
  name: [{ id: '测试12' }]
}

let init2 = {
  name: [{ id: 'init2' }]
}

export type NameType = {
  id: string | number;
}

export type UserType = {
  name:NameType[]
}


function useDetail() {
 const [user, setUser] = useState<UserType>(init);

 useEffect(() =>{
  setTimeout(() => {
    console.log('time out');
    let _user = {
      ...user,
      ...init2
    }
    setUser(_user);
  }, 2000);
}, []);

return { user };
}

let Detail = createContainer(useDetail);
export default Detail;