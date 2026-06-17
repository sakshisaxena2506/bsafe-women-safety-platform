import Button from "./Button";

export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm text-slate-600 dark:text-slate-300">
      <Button variant="secondary" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        Previous
      </Button>
      <span>
        Page {page} of {totalPages}
      </span>
      <Button variant="secondary" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
        Next
      </Button>
    </div>
  );
}
