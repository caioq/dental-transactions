import { ReactNode, createContext, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils";

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

interface AuthContextType {
  signed: boolean | null;
  user: User | null;
  signIn: (data: SignInInput) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setSigned: React.Dispatch<React.SetStateAction<boolean | null>>;
  // getUserData: () => void;
}

interface SignInInput {
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextType);

interface AuthProviderProps {
  children: ReactNode;
  userData: User;
}

export function AuthProvider({ children, userData }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(userData);
  const [signed, setSigned] = useState<boolean | null>(() => !!userData);
  const navigate = useNavigate();

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
      createdAt: new Date(user.createdAt),
    });
    setSigned(true);
    localStorage.setItem("@DT:token", accessToken);
    localStorage.setItem("@DT:user", JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${accessToken}`;

    //TODO: navigate to home
  }, []);

  const signOut = useCallback(async () => {
    setUser(null);
    setSigned(false);
    localStorage.removeItem("@DT:token");
    localStorage.removeItem("@DT:user");

    api.defaults.headers.authorization = "";

    navigate("", { replace: true });
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, signed, signIn, signOut, setSigned, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
