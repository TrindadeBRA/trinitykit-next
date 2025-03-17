'use client';
import { useState, useMemo, useCallback, useEffect } from 'react';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  FilterFn,
  flexRender,
} from '@tanstack/react-table';
import { ChevronUp, ChevronDown, Filter } from 'lucide-react';
import { GetProducts200DataItem } from "@/src/services/model";
import { twMerge } from 'tailwind-merge';

type ProductsTableProps = GetProducts200DataItem;

const fuzzyFilter: FilterFn<ProductsTableProps> = (row, columnId, value) => {
  const itemValue = row.getValue(columnId)?.toString()?.toLowerCase();
  return itemValue ? itemValue.includes(value.toLowerCase()) : false;
};

export default function ProductsTable({ allProducts }: { allProducts: ProductsTableProps[] }) {
  const [segmentoFilter, setSegmentoFilter] = useState('');
  const columnHelper = createColumnHelper<ProductsTableProps>();

  const columns = useMemo(
    () => [
      columnHelper.accessor(row => row.segments?.map(s => s.name).join(', '), {
        id: 'segmentos',
        header: 'Segmentos',
        size: 15,
        filterFn: (row, columnId, filterValue) => {
          const segments = row.original.segments?.map(s => s?.name?.toLowerCase()) || [];
          return filterValue === '' || segments.some(s => s?.includes(filterValue.toLowerCase()));
        }
      }),
      columnHelper.accessor('title', {
        header: 'Produto',
        cell: info => info.getValue(),
        size: 15,
      }),
      columnHelper.accessor(row => row.product_lines?.flatMap(l => l.children?.map(c => c.name) || []).join(', '), {
        id: 'descricao',
        header: 'Descrição',
        size: 46,
      }),
      columnHelper.accessor('cas_number', {
        header: 'CAS Number',
        cell: info => info.getValue(),
        size: 22,
      }),
      columnHelper.accessor(() => '', {
        id: 'literatura_tecnica',
        header: 'Literatura Técnica',
        size: 1,
        cell: info => (
          <button
            onClick={() => console.log('Dados do item:', info.row.original)}
            className="px-2 py-1 bg-blue-500 text-white rounded mx-auto block"
          >
            Solicitar
          </button>
        ),
      }),
      columnHelper.accessor(() => '', {
        id: 'solicitar_amostra',
        header: 'Solicitar Amostra',
        size: 1,
        cell: info => (
          <button
            onClick={() => console.log('Dados do item:', info.row.original)}
            className="px-2 py-1 bg-blue-500 text-white rounded mx-auto block"
          >
            Solicitar
          </button>
        ),
      }),
    ],
    []
  );

  console.log('Renderizando ProductsTable com produtos:');

  const tableState = useMemo(() => ({
    columnFilters: [
      { id: 'segmentos', value: segmentoFilter },
    ],
  }), [segmentoFilter]);

  const table = useReactTable({
    data: allProducts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: tableState,
    initialState: {
      pagination: {
        pageSize: 500,
      },
      sorting: [{ id: 'segmentos', desc: false }], // Ordenar por segmentos
    },
  });

  // Log para verificar a quantidade de linhas
  console.log('Número de linhas na tabela:', table.getRowModel().rows.length);

  // Extrair segmentos únicos para o filtro dropdown
  const uniqueSegments = useMemo(() => {
    const segmentsMap = new Map<string, { id: number; name: string; slug: string; uuid: string }>();
    allProducts.forEach(product => {
      product.segments?.forEach(segment => {
        segmentsMap.set(segment.slug!, { id: segment.id!, name: segment.name!, slug: segment.slug!, uuid: crypto.randomUUID() });
      });
    });
    return Array.from(segmentsMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [allProducts]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const segment = searchParams.get('segment');

    if (segment) {
      const selectedSegment = uniqueSegments.find(seg => seg.slug === segment);
      if (selectedSegment) {
        setSegmentoFilter(selectedSegment.name);
      }
    }
  }, [uniqueSegments]);

  const handleSegmentChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSegment = e.target.value;

    if (selectedSegment === "") {
      setSegmentoFilter(''); // Limpar filtro se "Todos" for selecionado
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('segment'); // Remover o parâmetro da URL
      window.history.pushState({}, '', newUrl);
    } else {
      const segment = uniqueSegments.find(segment => segment.name === selectedSegment);
      setSegmentoFilter(segment ? segment.name : '');

      // Atualizar a URL
      if (segment) {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('segment', segment.slug);
        window.history.pushState({}, '', newUrl);
      }
    }
  }, [uniqueSegments]);

  return (
    <div className="p-4 md:p-8 mt-6">
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-black" />
            </div>
            <select
              value={segmentoFilter}
              onChange={handleSegmentChange}
              className="pl-10 p-2 bg-[#f5d22c] rounded-md text-black w-full md:w-auto"
            >
              <option value="">Todos os Segmentos</option>
              {uniqueSegments.map(segment => (
                <option key={segment.uuid} value={segment.name}>{segment.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow md:overflow-visible">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-x-auto md:overflow-visible">
            <table className="min-w-full table-fixed divide-y divide-gray-300" 
                   style={{ minWidth: '768px', width: '100%' }}>
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className="px-4 md:px-6 py-3 text-center text-xs font-bold text-gray-850 uppercase tracking-wider cursor-pointer whitespace-nowrap"
                        onClick={header.column.getToggleSortingHandler()}
                        style={{ width: `${header.getSize()}%` }}
                      >
                        <div className="flex items-center justify-center">
                          <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                          <span>
                            {{
                              asc: <ChevronUp className="h-4 w-4" />,
                              desc: <ChevronDown className="h-4 w-4" />,
                            }[header.column.getIsSorted() as string] ?? null}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-300">
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map(row => {
                    console.log('Renderizando linha:');
                    return (
                      <tr key={row.id} className="text-gray-850 hover:bg-gray-200">
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id} className={
                            twMerge(
                              `px-6 py-4 whitespace-nowrap truncate text-xs`
                            )}
                              style={{ width: `${cell.column.getSize()}%` }}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-6 py-8 text-center text-gray-400"
                    >
                      Nenhum resultado encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Paginação */}
        <div className="p-2 md:p-4 flex flex-col md:flex-row items-center justify-between border-t border-gray-300 gap-4">
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-850">
            <span>
              Página{' '}
              <strong>
                {table.getState().pagination.pageIndex + 1} de{' '}
                {table.getPageCount() || 1}
              </strong>
            </span>
            <span>
              | Total: {table.getFilteredRowModel().rows.length} produtos
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="px-2 md:px-3 py-1 bg-gray-300 text-gray-850 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {'<<'}
            </button>
            <button
              className="px-2 md:px-3 py-1 bg-gray-300 text-gray-850 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {'<'}
            </button>
            <button
              className="px-2 md:px-3 py-1 bg-gray-300 text-gray-850 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {'>'}
            </button>
            <button
              className="px-2 md:px-3 py-1 bg-gray-300 text-gray-850 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {'>>'}
            </button>
            <select
              className="px-2 md:px-3 py-1 md:py-2 bg-gray-300 text-gray-850 rounded focus:outline-none text-xs md:text-sm"
              value={table.getState().pagination.pageSize}
              onChange={e => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[500, 1000, 2000, 3000, 4000, 5000].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Mostrar {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}