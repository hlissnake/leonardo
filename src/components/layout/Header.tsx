"use client";

import { useAuth } from "@/providers/authProvider";
import { Box, Flex, Text, Spacer } from "@chakra-ui/react";
import Dropdown from "./Dropdown";

export default function Header() {
  const { getUserInfo, logout } = useAuth();
  const userInfo = getUserInfo();

  const dropdownItems = [
    { label: "Profile", action: "profile" },
    { label: "Logout", action: "logout" },
  ];

  const handleDropdownAction = (action: string) => {
    switch (action) {
      case "profile":
        console.log("Profile clicked");
        break;
      case "logout":
        logout();
        break;
    }
  };

  return (
    <Box as="header" boxShadow="sm" px={4} py={2}>
      <Flex align="center" maxW="container.xl" mx="auto">
        <Text fontWeight="bold" fontSize="xl">
          Leonardo
        </Text>
        <Spacer />
        <Dropdown
          items={dropdownItems}
          triggerText={userInfo.userName || "User"}
          onAction={handleDropdownAction}
        />
      </Flex>
    </Box>
  );
}
