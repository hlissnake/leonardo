"use client";

import {
  ButtonGroup,
  Pagination as ChakraPagination,
  IconButton,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

const ITEMS_PER_PAGES = 20;

export default function Pagination({
  currentPage,
  totalCount,
  onPageChange,
}: PaginationProps) {
  return (
    <ChakraPagination.Root
      count={totalCount}
      page={currentPage}
      pageSize={ITEMS_PER_PAGES}
      onPageChange={(e) => onPageChange(e.page)}
    >
      <ButtonGroup variant="ghost" size="sm">
        <ChakraPagination.PrevTrigger asChild>
          <IconButton>
            <LuChevronLeft />
          </IconButton>
        </ChakraPagination.PrevTrigger>

        <ChakraPagination.Items
          render={(page) => (
            <IconButton variant={{ base: "ghost", _selected: "outline" }}>
              {page.value}
            </IconButton>
          )}
        />

        <ChakraPagination.NextTrigger asChild>
          <IconButton>
            <LuChevronRight />
          </IconButton>
        </ChakraPagination.NextTrigger>
      </ButtonGroup>
    </ChakraPagination.Root>
  );
}
