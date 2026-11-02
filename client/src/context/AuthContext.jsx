
import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';

import api from '../api';


const AuthContext = createContext(null);


function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem('shopease_token');

    if (!token) {
      setChecking(false);
      return;
    }

    api.get('/auth/me')
      .then((response) => {
        setUser(response.data.user);
      })
      .catch(() => {
        localStorage.removeItem('shopease_token');
      })
      .finally(() => {
        setChecking(false);
      });

  }, []);


  function saveLogin(data) {
    localStorage.setItem('shopease_token', data.token);
    setUser(data.user);
  }

  
  function logout() {
    localStorage.removeItem('shopease_token');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        checking,
        saveLogin,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
