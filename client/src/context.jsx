import { createContext, useContext } from "react";
import useFetch from "./hooks/useFetch";

const UrlContext = createContext();

function UrlProvider({children}){
  const {data: user, loading, error, fetchfn} = useFetch("/user/currUser");
  
  const isAuthenticated = user ?  true : false;

  return <UrlContext.Provider value={{user, error, loading, isAuthenticated, fetchfn}}>
    {children}
  </UrlContext.Provider>
}

export const UrlState = () => {
  return useContext(UrlContext);
}

export default UrlProvider