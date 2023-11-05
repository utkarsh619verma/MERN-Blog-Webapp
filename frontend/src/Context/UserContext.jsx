import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { URL } from "../../url";

// eslint-disable-next-line react-refresh/only-export-components
export const usercontext = createContext();

export function UserContext({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    getuser();
  }, []);
  const getuser = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/refetch", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <usercontext.Provider value={{ user, setUser }}>
      {children}
    </usercontext.Provider>
  );
}

UserContext.propTypes = {
  children: PropTypes.node.isRequired,
};
