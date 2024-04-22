import { createContext, useState } from "react";
// eslint-disable-next-line no-unused-vars

export const AuthContext  = createContext({});


// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [refreshToken, setRefreshToken] = useState();

  return (
    <AuthContext.Provider value={{ refreshToken, setRefreshToken }}>
      { children }
    </AuthContext.Provider>
  );
};