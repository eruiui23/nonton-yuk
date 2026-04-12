interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (val: number) => void;
}

export default function Pagination({ page, totalPages, setPage }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-12 mb-8">
      <div className="join border border-base-300 shadow-sm">
        <button
          className="join-item btn btn-md"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          «
        </button>
        <button className="join-item btn btn-md pointer-events-none bg-base-200">
          {page} / {totalPages}
        </button>
        <button
          className="join-item btn btn-md"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          »
        </button>
      </div>
    </div>
  );
}