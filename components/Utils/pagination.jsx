import React, { useEffect } from "react";
import { usePagination } from "@/hooks/usePagination";
import { useParams } from "@/hooks/useParams";

const Pagination = ({ data, onPageChange, page = "default", id }) => {
  const paginationRange = usePagination({ data });
  const { updateParams, findParams } = useParams();

  const currentPage = data?.currentPage || 1;

  useEffect(() => {
    if (id) {
      const targetElement = document.getElementById(id);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage, id]);

  if (!data || data?.pageCount < 2) return null;

  return (
    <div className="flex items-center justify-center py-10 gap-3">
      <button
        className="w-[50px] h-[50px] flex items-center justify-center rounded-lg bg-bg-2 disabled:opacity-50"
        onClick={() => {
          updateParams("page", currentPage - 1);
        }}
        disabled={currentPage === 1}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.25 4.5L6.75 9L11.25 13.5"
            stroke="#222222"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="flex flex-row gap-1">
        {paginationRange.map((page, index) => (
          <button
            key={index}
            className={`w-12 h-[50px] flex items-center justify-center rounded-lg bg-bg-2 disabled:opacity-50 transition-all  ${
              currentPage === page ? "bg-main text-white" : "text-primary"
            }`}
            onClick={() =>
              typeof page === "number" && updateParams("page", page)
            }
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className="w-[50px] h-[50px] flex items-center justify-center rounded-lg bg-bg-2 disabled:opacity-50"
        onClick={() => {
          updateParams("page", currentPage + 1);
        }}
        disabled={currentPage === data.pageCount}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.75 4.5L11.25 9L6.75 13.5"
            stroke="#222222"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
