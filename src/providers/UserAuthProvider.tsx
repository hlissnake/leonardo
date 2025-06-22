// context/AuthContext.tsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import UserModal from "@/components/UserModal";
import { useDialog } from "@chakra-ui/react";

const AuthContext = createContext<{
  isLoaded: boolean;
  isAuthenticated: boolean;
  setUserInfo: (userName: string, jobTitle: string) => void;
  getUserInfo: () =>
    | {
        userName: string | null;
        jobTitle: string | null;
      }
    | undefined;
  openUserModal: () => void;
  closeUserModal: () => void;
  logout: () => void;
}>({
  isLoaded: true,
  isAuthenticated: false,
  setUserInfo: () => {},
  getUserInfo: () => ({
    userName: "",
    jobTitle: "",
  }),
  openUserModal: () => {},
  closeUserModal: () => {},
  logout: () => {},
});

const AUTH_USERNAME = "user_name";
const AUTH_JOB_TITLE = "job_title";

export function UserAuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const dialog = useDialog({
    closeOnEscape: false,
    closeOnInteractOutside: false,
  });

  const setUserInfo = useCallback((_username: string, _jobTitle: string) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(AUTH_USERNAME, _username);
    localStorage.setItem(AUTH_JOB_TITLE, _jobTitle);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(AUTH_USERNAME);
    localStorage.removeItem(AUTH_JOB_TITLE);
    setIsAuthenticated(false);
  }, []);

  const getUserInfo = useCallback(() => {
    if (typeof window === "undefined") return;
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
      value={{
        isLoaded,
        isAuthenticated,
        setUserInfo,
        logout,
        getUserInfo,
        openUserModal: () => dialog.setOpen(true),
        closeUserModal: () => dialog.setOpen(false),
      }}
    >
      {children}
      <UserModal isLogin={!isAuthenticated} dialog={dialog} />
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a UserAuthProvider");
  }
  return context;
};

export const withAuth = <T extends object>(
  Component: React.ComponentType<T>
) => {
  return function ProtectedRoute(props: T) {
    const { isLoaded, isAuthenticated, openUserModal, closeUserModal } =
      useAuth();

    useEffect(() => {
      if (!isAuthenticated && isLoaded) {
        openUserModal();
      }
    }, [isAuthenticated, isLoaded, openUserModal, closeUserModal]);

    if (isAuthenticated && isLoaded) {
      return <Component {...props} />;
    }

    return null;
  };
};
