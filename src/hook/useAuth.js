import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";


const useAuth = (code) => {  
  const {refreshToken, setRefreshToken} = useAuthContext();
  const [accessToken, setAccessToken] = useState();  
  const [expiresIn, setExpiresIn] = useState();
  
  
   useEffect(() => {
    axios    
      .post("http://localhost:3001/login", {
        code,
      })
      .then((res) => {              
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);      
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, "/");
      })
      .catch(() => {
        window.location = "/";
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);
  
  useEffect(() => {    
     
    if (!refreshToken || !expiresIn) return
    const interval = setTimeout(() => {
      axios
      .post("http://localhost:3001/refresh", {
        refreshToken,
      })
      .then((res) => {        
        setAccessToken(res.data.accessToken);        
        setExpiresIn(res.data.expiresIn);
      })
      .catch(() => {
        window.location = "/";
      });      
    }, (expiresIn - 60) *1000);

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn]);

    
  return accessToken;
}

export default useAuth