import { ReactNode, createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getWithAuth } from "../api/api";
import { toastError, toastSuccess } from "../components/toast";

export type UserTypeContext = {
  user: User | null;
};

const defaultValue = {
  user: {
    id: 0,
    username: "",
    nama: "",
    email: "",
    password: "",
    role: "",
    holiday_token: null,
  },
};

export const UserContext = createContext<UserTypeContext>(defaultValue);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const updateUser = (user: User) => {
    setUser(user);
  };

  const token = Cookies.get("access_token");
  console.log(token)
  const getUser = async () => {
    if (token) {
      try {
        const response = await getWithAuth(token, "user/me");
        const data = response.data;
        updateUser(data);
        toastSuccess("Get User Succesful")
      } catch (error) {
        toastError("Get User Failed");
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;