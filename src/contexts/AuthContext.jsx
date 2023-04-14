import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/init-firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const AuthContext = createContext({
  currentUser: null,
  signInwithGoogle: () => Promise,
  logout: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  function signInwithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function logout() {
    return signOut(auth);
  }
  const value = {
    currentUser,
    signInwithGoogle,
    logout,
  };

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
