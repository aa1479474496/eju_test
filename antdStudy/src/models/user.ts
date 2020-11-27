import { useState, useCallback } from 'react';


type UserTypes = {
  name: string;
}

export default function useAuthModel() {
  const [ user, setUser ] = useState<UserTypes>({name: ''});

  const signIn = useCallback((userInfo) => {
    setUser(userInfo);
  }, []);

  return {
    user,
    signIn
  }
}


