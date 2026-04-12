interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (val: number) => void;
}

export default function Pagination({ page, totalPages, setPage }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-12 mb-8">
      <div className="join join-xs rounded-full border border-base-200 shadow-lg bg-base-100">
        <button
          className="join-item btn btn-sm btn-ghost"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          «
        </button>
        <button className="join-item btn btn-sm btn-disabled pointer-events-none">
          {page} / {totalPages}
        </button>
        <button
          className="join-item btn btn-sm btn-ghost"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          »
        </button>
      </div>
    </div>
  );
}