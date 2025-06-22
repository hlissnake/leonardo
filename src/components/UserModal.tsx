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

  const [username, setUsername] = useState(userInfo.userName || "");
  const [jobTitle, setJobTitle] = useState(userInfo.jobTitle || "");
  const [error, setError] = useState("");

  useEffect(() => {
    setUsername(userInfo.userName || "");
    setJobTitle(userInfo.jobTitle || "");
  }, [userInfo.userName, userInfo.jobTitle]);

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

  return (
    <Dialog.RootProvider value={dialog}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogHeader fontSize="lg" fontWeight="bold">
                {isLogin ? "Login!" : "Edit Profile"}
              </DialogHeader>
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
                        />
                      </label>
                      <label htmlFor="jobTitle">
                        Job Title
                        <Input
                          id="jobTitle"
                          type="jobTitle"
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                          autoComplete="current-jobTitle"
                          required
                          mt={1}
                        />
                      </label>
                      {error && <Text color="red.500">{error}</Text>}
                    </Flex>
                  </Fieldset.Content>
                </Fieldset.Root>
              </Dialog.Body>
              <Dialog.Footer>
                {!isLogin && (
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </Dialog.ActionTrigger>
                )}
                <Button type="submit" disabled={!!error}>
                  Save
                </Button>
              </Dialog.Footer>
            </form>
          </DialogContent>
        </Dialog.Positioner>
      </Portal>
    </Dialog.RootProvider>
  );
}
