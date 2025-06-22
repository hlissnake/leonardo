"use client";

import {
  Box,
  Button,
  HStack,
  Text,
} from "@chakra-ui/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageInfo?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showPageInfo = true,
  size = "md",
}: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Box textAlign="center" p={4} bg="gray.50" borderRadius="md">
      {showPageInfo && (
        <Text fontSize="sm" mb={2}>
          Page {currentPage} of {totalPages}
        </Text>
      )}
      <HStack justify="center" gap={2}>
        <Button
          size={size}
          disabled={currentPage <= 1}
          onClick={handlePrevious}
          variant="outline"
        >
          Previous
        </Button>
        <Button
          size={size}
          disabled={currentPage >= totalPages}
          onClick={handleNext}
          variant="outline"
        >
          Next
        </Button>
      </HStack>
    </Box>
  );
} 