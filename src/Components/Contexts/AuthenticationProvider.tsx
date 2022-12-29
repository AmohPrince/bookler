import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Authenticator } from "../../Types/Contexts";

export const AuthProvider = createContext<{
  userData: Authenticator;
  setUserData: React.Dispatch<React.SetStateAction<Authenticator>>;
  isLoggedIn: boolean;
}>(null as any);
const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userData, setUserData] = useState<Authenticator>({
    accountType: "Personal Account",
    picture: null,
    name: "",
    email: null,
    birthday: null,
    address: null,
    gender: null,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  console.log(isLoggedIn);
  console.log(userData);
  useEffect(() => {
    if (userData.email !== null) {
      setIsLoggedIn(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <AuthProvider.Provider
      value={{
        userData,
        setUserData,
        isLoggedIn,
      }}
    >
      {children}
    </AuthProvider.Provider>
  );
};

export default AuthenticationProvider;