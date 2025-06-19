// context/AuthContext.tsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { Text } from "@chakra-ui/react";

const AuthContext = createContext<{
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (userName: string, jobTitle: string) => void;
  getUserInformation: () => {
    userName?: string;
    jobTitle?: string;
  };
}>({
  isLoading: true,
  isAuthenticated: false,
  login: () => {},
  getUserInformation: () => ({
    userName: "",
    jobTitle: "",
  }),
});

const AUTH_USERNAME = "user_name";
const AUTH_JOB_TITLE = "job_title";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const login = useCallback(
    (_username: string, _jobTitle: string) => {
      localStorage.setItem(AUTH_USERNAME, _username);
      localStorage.setItem(AUTH_JOB_TITLE, _jobTitle);
      setUserName(_username);
      setJobTitle(_jobTitle);
      setIsAuthenticated(true);
      router.push("/");
    },
    [router]
  );

  const getUserInformation = useCallback(() => {
    return {
      userName,
      jobTitle,
    };
  }, [userName, jobTitle]);

  useEffect(() => {
    // Replace with your actual auth logic (cookie, localStorage, fetch)
    const authUsername = localStorage.getItem(AUTH_USERNAME);
    const authJobTitle = localStorage.getItem(AUTH_JOB_TITLE);
    setUserName(authUsername ?? "");
    setJobTitle(authJobTitle ?? "");
    setIsAuthenticated(!!authUsername && !!authJobTitle);
    setLoading(false);
  }, []);
  console.log("isAuthenticated", isAuthenticated);
  return (
    <AuthContext.Provider
      value={{ isLoading, isAuthenticated, login, getUserInformation }}
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
    const { isLoading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated && !isLoading) {
        router.push("/login");
      }
    }, [isLoading, isAuthenticated, router]);

    if (!isAuthenticated && isLoading) {
      return <Text>Checking User Information.....</Text>; // or a spinner/loading indicator
    }

    return <Component {...props} />;
  };
};
