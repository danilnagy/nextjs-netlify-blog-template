import { createContext, useState, useEffect } from "react";
import netlifyIdentity from "netlify-identity-widget";

export const AuthContext = createContext({
  user: null,
  login: () => {},
  signup: () => {},
  logout: () => {},
  authReady: false,
});

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);


  useEffect(() => {
      // on login
    netlifyIdentity.on("login", (user) => {
      setUser(user);
      netlifyIdentity.close();
    });

    // on logout
    netlifyIdentity.on("logout", (user) => {
      setUser(null);
    });

    // connect with Netlify Identity
    netlifyIdentity.init();
  }, []);

  const login = () => {
    netlifyIdentity.open('login');
  };

  const signup = () => {
    netlifyIdentity.open('signup');
  };

  const logout = () => {
    netlifyIdentity.logout();
  };

  const context = {
    login,
    signup,
    logout,
    user,
  };


  return (
    <AuthContext.Provider value={context}>
        {children}
    </AuthContext.Provider>
  );
};