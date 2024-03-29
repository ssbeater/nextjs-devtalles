export function generatePaginationNumbers(
  totalPages: number,
  currentPage: number
) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  // current page is between first 3
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // current page is between last 3
  if (currentPage > totalPages - 3) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // current page is between 4 and totalPages - 3
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}
