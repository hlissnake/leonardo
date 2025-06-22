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
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGES);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav 
      role="navigation" 
      aria-label="Pagination navigation"
      aria-describedby="pagination-info"
    >
      <div id="pagination-info" className="sr-only">
        Page {currentPage} of {totalPages} pages
      </div>
      <ChakraPagination.Root
        count={totalCount}
        page={currentPage}
        pageSize={ITEMS_PER_PAGES}
        onPageChange={(e) => onPageChange(e.page)}
      >
        <ButtonGroup variant="ghost" size="sm" role="group" aria-label="Pagination controls">
          <ChakraPagination.PrevTrigger asChild>
            <IconButton
              aria-label={`Go to previous page${isFirstPage ? ' (disabled)' : ''}`}
              aria-disabled={isFirstPage}
            >
              <LuChevronLeft />
            </IconButton>
          </ChakraPagination.PrevTrigger>

          <ChakraPagination.Items
            render={(page) => (
              <IconButton 
                variant={{ base: "ghost", _selected: "outline" }}
                aria-label={`Go to page ${page.value}`}
                aria-current={page.value === currentPage ? "page" : undefined}
              >
                {page.value}
              </IconButton>
            )}
          />

          <ChakraPagination.NextTrigger asChild>
            <IconButton
              aria-label={`Go to next page${isLastPage ? ' (disabled)' : ''}`}
              aria-disabled={isLastPage}
            >
              <LuChevronRight />
            </IconButton>
          </ChakraPagination.NextTrigger>
        </ButtonGroup>
      </ChakraPagination.Root>
    </nav>
  );
}
