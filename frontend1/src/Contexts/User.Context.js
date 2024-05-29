import React, { createContext, useEffect, useState } from 'react'
import axios from "axios";

export const User = createContext(null);

function UserContextProvider({children}) {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   if (!user) {
  //     axios.get('/api/profile').then(({data}) => {
  //       setUser(data);
  //     }).catch(err => console.log(err));
  //     setUser()
  //   }
  // }, []);

  return (
    <User.Provider value={{user, setUser}}>
      {children}
    </User.Provider>
  )
}

export default UserContextProvider