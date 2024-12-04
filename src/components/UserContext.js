// import React, { createContext, useContext, useState } from 'react';

// const UserContext = createContext();

// export const useUser = () => {
//   return useContext(UserContext);
// };

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState({ role: 'Sales' }); // example, ideally fetched from login response

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
