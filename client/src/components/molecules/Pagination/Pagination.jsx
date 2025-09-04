import React from 'react';
import {
  PaginationContainer,
  PaginationButton,
  PaginationInfo
} from './style';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  // Previous button
  pages.push(
    <PaginationButton
      key="prev"
      onClick={() => onPageChange?.(currentPage - 1)}
      disabled={currentPage === 1}
    >
      ← Previous
    </PaginationButton>
  );

  // Page numbers
  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <PaginationButton
        key={i}
        onClick={() => onPageChange?.(i)}
        className={i === currentPage ? 'active' : ''}
      >
        {i}
      </PaginationButton>
    );
  }

  // Next button
  pages.push(
    <PaginationButton
      key="next"
      onClick={() => onPageChange?.(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next →
    </PaginationButton>
  );

  return (
    <PaginationContainer>
      {pages}
      <PaginationInfo>
        Page {currentPage} of {totalPages}
      </PaginationInfo>
    </PaginationContainer>
  );
};