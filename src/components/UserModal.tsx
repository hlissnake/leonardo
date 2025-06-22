"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Input,
  Text,
  Dialog,
  DialogContent,
  DialogHeader,
  Portal,
  Fieldset,
  UseDialogReturn,
  Flex,
} from "@chakra-ui/react";
import { useAuth } from "@/providers/UserAuthProvider";

interface Props {
  dialog: UseDialogReturn;
  isLogin?: boolean;
}

export default function UserModal({ isLogin = false, dialog }: Props) {
  const { setUserInfo, getUserInfo } = useAuth();
  const userInfo = getUserInfo();

  const [username, setUsername] = useState(userInfo?.userName || "");
  const [jobTitle, setJobTitle] = useState(userInfo?.jobTitle || "");
  const [error, setError] = useState("");

  useEffect(() => {
    setUsername(userInfo?.userName || "");
    setJobTitle(userInfo?.jobTitle || "");
  }, [userInfo?.userName, userInfo?.jobTitle]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!!username && !!jobTitle) {
        setUserInfo(username, jobTitle);
        dialog.setOpen(false);
      } else {
        setError("please enter all the information above");
      }
    },
    [dialog, jobTitle, setUserInfo, username]
  );

  const modalTitle = isLogin ? "Login" : "Edit Profile";
  const modalDescription = isLogin 
    ? "Enter your username and job title to login" 
    : "Update your profile information";

  return (
    <Dialog.RootProvider value={dialog}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <DialogContent
            role="dialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            aria-modal="true"
          >
            <form onSubmit={handleSubmit} role="form" aria-label={`${modalTitle} form`}>
              <DialogHeader fontSize="lg" fontWeight="bold" id="modal-title">
                {modalTitle}
              </DialogHeader>
              <Text id="modal-description" srOnly>
                {modalDescription}
              </Text>
              <Dialog.Body pb="4">
                <Fieldset.Root>
                  <Fieldset.Content>
                    <Flex direction={"column"} gap="4">
                      <label htmlFor="username">
                        Username
                        <Input
                          id="username"
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          autoComplete="username"
                          required
                          mt={1}
                          aria-required="true"
                          aria-invalid={!username && error ? "true" : "false"}
                          aria-describedby={error ? "form-error" : undefined}
                        />
                      </label>
                      <label htmlFor="jobTitle">
                        Job Title
                        <Input
                          id="jobTitle"
                          type="text"
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                          autoComplete="organization-title"
                          required
                          mt={1}
                          aria-required="true"
                          aria-invalid={!jobTitle && error ? "true" : "false"}
                          aria-describedby={error ? "form-error" : undefined}
                        />
                      </label>
                      {error && (
                        <Text 
                          id="form-error" 
                          color="red.500" 
                          role="alert" 
                          aria-live="polite"
                        >
                          {error}
                        </Text>
                      )}
                    </Flex>
                  </Fieldset.Content>
                </Fieldset.Root>
              </Dialog.Body>
              <Dialog.Footer>
                {!isLogin && (
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline" aria-label="Cancel editing profile">
                      Cancel
                    </Button>
                  </Dialog.ActionTrigger>
                )}
                <Button 
                  type="submit" 
                  disabled={!!error}
                  aria-label={`${isLogin ? 'Login' : 'Save'} profile information`}
                >
                  {isLogin ? 'Login' : 'Save'}
                </Button>
              </Dialog.Footer>
            </form>
          </DialogContent>
        </Dialog.Positioner>
      </Portal>
    </Dialog.RootProvider>
  );
}
