import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  return (
    <div className="flex justify-center gap-4 my-8">
      {currentPage > 1 && (
        <Link
          href={`${basePath}/${currentPage - 1}`}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Anterior
        </Link>
      )}
      
      {currentPage < totalPages && (
        <Link
          href={`${basePath}/${currentPage + 1}`}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Próximo
        </Link>
      )}
    </div>
  );
}