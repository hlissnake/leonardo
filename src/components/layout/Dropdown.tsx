"use client";

import { Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";

interface DropdownItem {
  label: string;
  action: string;
}

interface DropdownItemProps {
  label: string;
  onClick: () => void;
}

function DropdownItem({ label, onClick }: DropdownItemProps) {
  return (
    <Box
      as="button"
      w="full"
      textAlign="left"
      px={4}
      py={2}
      _hover={{ bg: "gray.100" }}
      onClick={onClick}
    >
      {label}
    </Box>
  );
}

interface DropdownProps {
  items: DropdownItem[];
  triggerText: string;
  onAction: (action: string) => void;
}

export default function Dropdown({
  items,
  triggerText,
  onAction,
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  const handleDropdownAction = (action: string) => {
    setOpen(false);
    onAction(action);
  };

  return (
    <Box position="relative" minW="200px">
      <Button
        variant="ghost"
        onClick={() => setOpen((v) => !v)}
        px={2}
        py={1}
        minW={0}
        borderRadius="full"
      >
        <Text as="span" fontSize="sm">
          {triggerText}
        </Text>
        <Text as="span" ml={1} fontSize="sm">
          ▼
        </Text>
      </Button>
      {open && (
        <Box
          position="absolute"
          left={0}
          mt={2}
          borderRadius="md"
          boxShadow="md"
          zIndex={10}
          minW="120px"
        >
          {items.map((item) => (
            <DropdownItem
              key={item.action}
              label={item.label}
              onClick={() => handleDropdownAction(item.action)}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
