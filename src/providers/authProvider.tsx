// context/AuthContext.tsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import UserModal from "@/components/UserModal";

const AuthContext = createContext<{
  isLoaded: boolean;
  isAuthenticated: boolean;
  login: (userName: string, jobTitle: string) => void;
  logout: () => void;
  getUserInfo: () => {
    userName: string | null;
    jobTitle: string | null;
  };
}>({
  isLoaded: true,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  getUserInfo: () => ({
    userName: "",
    jobTitle: "",
  }),
});

const AUTH_USERNAME = "user_name";
const AUTH_JOB_TITLE = "job_title";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [isLoaded, setLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = useCallback(
    (_username: string, _jobTitle: string) => {
      localStorage.setItem(AUTH_USERNAME, _username);
      localStorage.setItem(AUTH_JOB_TITLE, _jobTitle);
      setIsAuthenticated(true);
      router.push("/");
    },
    [router]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_USERNAME);
    localStorage.removeItem(AUTH_JOB_TITLE);
    setIsAuthenticated(false);
    router.push("/login");
  }, [router]);

  const getUserInfo = useCallback(() => {
    const userName = localStorage.getItem(AUTH_USERNAME);
    const jobTitle = localStorage.getItem(AUTH_JOB_TITLE);
    return {
      userName,
      jobTitle,
    };
  }, []);

  useEffect(() => {
    const authUsername = localStorage.getItem(AUTH_USERNAME);
    const authJobTitle = localStorage.getItem(AUTH_JOB_TITLE);
    setIsAuthenticated(!!authUsername && !!authJobTitle);
    setLoaded(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoaded, isAuthenticated, login, logout, getUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export const withAuth = <T extends object>(
  Component: React.ComponentType<T>
) => {
  return function ProtectedRoute(props: T) {
    const { isLoaded, isAuthenticated } = useAuth();

    if (!isAuthenticated && isLoaded) {
      return <UserModal />;
    }

    if (isAuthenticated && isLoaded) {
      return <Component {...props} />;
    }

    return null;
  };
};
