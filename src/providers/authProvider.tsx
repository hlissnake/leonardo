// context/AuthContext.tsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext<{
  isAuthenticated: boolean;
  login: (userName: string, jobTitle: string) => void;
  getUserInformation: () => {
    userName?: string;
    jobTitle?: string;
  };
}>({
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

  const [userName, setUserName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const isAuthenticated = !!userName && !!jobTitle;

  const login = useCallback(
    (_username: string, _jobTitle: string) => {
      localStorage.setItem(AUTH_USERNAME, _username);
      localStorage.setItem(AUTH_JOB_TITLE, _jobTitle);
      setUserName(_username);
      setJobTitle(_jobTitle);
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
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, getUserInformation }}
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
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login");
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null; // or a spinner/loading indicator
    }

    return <Component {...props} />;
  };
};
