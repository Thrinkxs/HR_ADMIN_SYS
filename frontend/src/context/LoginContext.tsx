import { createContext, useState, useContext, ReactNode } from "react";
import { object, string } from "zod";

export type LoginContextProps = {
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  userRole: string;
  setUserRole: React.Dispatch<React.SetStateAction<string>>;
  user: object | undefined;
  setUser: React.Dispatch<React.SetStateAction<object>>;
};

const defaultValue = {
  auth: false,
  user: object,
  userRole: string,
  setUserRole: () => {},
  setAuth: () => {},
  setUser: () => {},
} as unknown as LoginContextProps;

// useEffect(() => {
//   // const data = localStorage.getItem("Auth-State");
//   const token = localStorage.getItem("token");
//   if (token) {
//     setAuth(true);
//   }
// }, []);

// useEffect(() => {
//   console.log("Updated Auth", auth);
//   console.log("Updated userRole", userRole);
//   localStorage.setItem("Auth-State", JSON.stringify(auth));
// }, [auth]);

export const LoginContext = createContext<LoginContextProps>(defaultValue);

type Props = {
  children: ReactNode;
};

export const LoginProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState(false);
  const [userRole, setUserRole] = useState<string>("");
  const [user, setUser] = useState<object>();

  return (
    <LoginContext.Provider
      value={{ auth, setAuth, userRole, setUserRole, user, setUser }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useAuth = () => useContext(LoginContext);
