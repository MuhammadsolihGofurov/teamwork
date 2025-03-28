import { useMemo, useState, useEffect } from "react";

export const usePagination = ({ data, siblingCount = 0 }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    handleResize(); // Boshlanishida tekshirish
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const paginationRange = useMemo(() => {
    if (!data) return [];

    const { pageCount, currentPage } = data;
    const totalPageNumbers = isMobile ? 3 : siblingCount + 5;

    if (totalPageNumbers >= pageCount) {
      return range(1, pageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, pageCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < pageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = pageCount;

    if (isMobile) {
      if (!shouldShowLeftDots && shouldShowRightDots) {
        return [firstPageIndex, "...", lastPageIndex];
      }
      if (shouldShowLeftDots && !shouldShowRightDots) {
        return [firstPageIndex, "...", lastPageIndex];
      }
      if (shouldShowLeftDots && shouldShowRightDots) {
        return [firstPageIndex, "...", currentPage, "...", lastPageIndex];
      }
    } else {
      if (!shouldShowLeftDots && shouldShowRightDots) {
        let leftItemCount = 3 + 2 * siblingCount;
        let leftRange = range(1, leftItemCount);
        return [...leftRange, "...", lastPageIndex];
      }

      if (shouldShowLeftDots && !shouldShowRightDots) {
        let rightItemCount = 3 + 2 * siblingCount;
        let rightRange = range(pageCount - rightItemCount + 1, pageCount);
        return [firstPageIndex, "...", ...rightRange];
      }

      if (shouldShowLeftDots && shouldShowRightDots) {
        let middleRange = range(leftSiblingIndex, rightSiblingIndex);
        return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
      }
    }
  }, [data, siblingCount, isMobile]);

  return paginationRange;
};
