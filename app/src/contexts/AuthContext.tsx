import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { api } from "../utils";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

interface AuthContextType {
  signed: boolean;
  user: User | null;
  signIn: (data: SignInInput) => Promise<void>;
  // signOut: () => Promise<void>;
}

interface SignInInput {
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextType);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [signed, setSigned] = useState<boolean>(false);

  const signIn = useCallback(async (data: SignInInput) => {
    const { email, password } = data;
    const response = await api.post("sessions", {
      email,
      password,
    });

    const { accessToken, user } = response.data;

    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.cratedAt),
    });
    setSigned(true);
    localStorage.setItem("@DT:token", accessToken);
    localStorage.setItem("@DT:user", JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${accessToken}`;
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("@DT:token");
    const user = localStorage.getItem("@DT:user");
    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      setSigned(true);
      setUser(JSON.parse(user));
    }
  }, []);

  return <AuthContext.Provider value={{ user, signed, signIn }}>{children}</AuthContext.Provider>;
}
