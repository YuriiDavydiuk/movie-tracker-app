import ReactPaginateModule from 'react-paginate';
import { type ReactPaginateProps } from 'react-paginate';
import { type ComponentType } from 'react';

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  const linkClasses =
    'flex h-10 min-w-9 cursor-pointer items-center justify-center rounded border border-gray-200 px-2 text-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600';
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={1}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName="flex flex-wrap justify-center gap-1 text-blue-600"
      pageLinkClassName={linkClasses}
      previousLinkClassName={linkClasses}
      nextLinkClassName={linkClasses}
      breakLinkClassName={linkClasses}
      activeLinkClassName="bg-blue-600 font-medium text-white"
      disabledClassName="pointer-events-none opacity-50"
      nextLabel="›"
      previousLabel="‹"
    />
  );
}
