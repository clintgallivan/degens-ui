import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TokenContext = createContext({});

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState();

  // useEffect(() => {
  //   const dataFetcher = async () => {
  //     axios
  //       .get(`http://127.0.0.1:5000/`)
  //       .then((res) => {
  //         if (res.data.success && res.data.code == "returning_user") {
  //           setDiscord(res.data.data)

  //           // axios
  //           //   .get(`/api/discord/refresh`)
  //           //   .then(res2 => {
  //           //     if (res2.data) {
  //           //       console.log(res2.data)
  //           //     }
  //           //   })
  //           //   .catch(err2 => {})
  //         }
  //       })
  //       .catch((err) => {})
  //   }

  //   dataFetcher()
  // }, [])

  return (
    <TokenContext.Provider value={[token, setToken]}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => {
  return useContext(TokenContext);
};
// export { TokenContext, TokenProvider };
