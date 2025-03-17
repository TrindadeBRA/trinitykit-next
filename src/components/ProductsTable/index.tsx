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

type ProductsTableProps = GetProducts200DataItem;

const fuzzyFilter: FilterFn<ProductsTableProps> = (row, columnId, value) => {
  const itemValue = row.getValue(columnId)?.toString()?.toLowerCase();
  return itemValue ? itemValue.includes(value.toLowerCase()) : false;
};

export default function ProductsTable({ allProducts }: { allProducts: ProductsTableProps[] }) {
  const [segmentoFilter, setSegmentoFilter] = useState('');
  const [linhaFilter, setLinhaFilter] = useState('');
  const columnHelper = createColumnHelper<ProductsTableProps>();
  
  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: info => info.getValue(),
        size: 80, // Definir tamanho fixo para colunas menores
      }),
      columnHelper.accessor('title', {
        header: 'Nome',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('cas_number', {
        header: 'CAS',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor(row => row.segments?.map(s => s.name).join(', '), {
        id: 'segmentos',
        header: 'Segmentos',
        filterFn: (row, columnId, filterValue) => {
          const segments = row.original.segments?.map(s => s?.name?.toLowerCase()) || [];
          return filterValue === '' || segments.some(s => s?.includes(filterValue.toLowerCase()));
        }
      }),
      columnHelper.accessor(row => row.product_lines?.map(l => l.name).join(', '), {
        id: 'linhas',
        header: 'Linhas de Produto',
        filterFn: (row, columnId, filterValue) => {
          const lines = row.original.product_lines?.map(l => l?.name?.toLowerCase()) || [];
          return filterValue === '' || lines.some(l => l?.includes(filterValue.toLowerCase()));
        }
      }),
      columnHelper.accessor(row => row.product_lines?.flatMap(l => l.children?.map(c => c.name) || []).join(', '), {
        id: 'sublinhas',
        header: 'Sublinhas',
      }),
    ],
    []
  );

  console.log('Renderizando ProductsTable com produtos:');

  const tableState = useMemo(() => ({
    columnFilters: [
      { id: 'segmentos', value: segmentoFilter },
      { id: 'linhas', value: linhaFilter },
    ],
  }), [segmentoFilter, linhaFilter]);

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

  // Extrair segmentos e linhas únicos para os filtros dropdown
  const uniqueSegments = useMemo(() => {
    const segmentsMap = new Map<string, { id: number; name: string; slug: string; uuid: string }>();
    allProducts.forEach(product => {
      product.segments?.forEach(segment => {
        segmentsMap.set(segment.slug!, { id: segment.id!, name: segment.name!, slug: segment.slug!, uuid: crypto.randomUUID() });
      });
    });
    return Array.from(segmentsMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [allProducts]);

  const uniqueLines = useMemo(() => {
    const linesMap = new Map<string, { id: number; name: string; slug: string; uuid: string }>();
    allProducts.forEach(product => {
      product.product_lines?.forEach(line => {
        linesMap.set(line.slug!, { id: line.id!, name: line.name!, slug: line.slug!, uuid: crypto.randomUUID() });
      });
    });
    return Array.from(linesMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [allProducts]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const segment = searchParams.get('segment');
    const productLine = searchParams.get('product-line');

    if (segment) {
      const selectedSegment = uniqueSegments.find(seg => seg.slug === segment);
      if (selectedSegment) {
        setSegmentoFilter(selectedSegment.name);
      }
    }

    if (productLine) {
      const selectedLine = uniqueLines.find(line => line.slug === productLine);
      if (selectedLine) {
        setLinhaFilter(selectedLine.name);
      }
    }
  }, [uniqueSegments, uniqueLines]);

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

  const handleLineChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLine = e.target.value;

    if (selectedLine === "") {
      setLinhaFilter(''); // Limpar filtro se "Todos" for selecionado
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('product-line'); // Remover o parâmetro da URL
      window.history.pushState({}, '', newUrl);
    } else {
      const line = uniqueLines.find(line => line.name === selectedLine);
      setLinhaFilter(line ? line.name : '');

      // Atualizar a URL
      if (line) {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('product-line', line.slug);
        window.history.pushState({}, '', newUrl);
      }
    }
  }, [uniqueLines]);

  return (
    <div className="p-8 mt-6">
      <h1 className="text-2xl font-bold mb-6 text-black">Nossos ProdutosXXX</h1>
      
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={segmentoFilter}
              onChange={handleSegmentChange}
              className="pl-10 p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos os Segmentos</option>
              {uniqueSegments.map(segment => (
                <option key={segment.uuid} value={segment.name}>{segment.name}</option>
              ))}
            </select>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={linhaFilter}
              onChange={handleLineChange}
              className="pl-10 p-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todas as Linhas</option>
              {uniqueLines.map(line => (
                <option key={line.uuid} value={line.name}>{line.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-600">
          <thead className="bg-gray-700">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                    style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                  >
                    <div className="flex items-center space-x-1">
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
          <tbody className="divide-y divide-gray-600 bg-gray-800">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => {
                console.log('Renderizando linha:');
                return (
                  <tr key={row.id} className="text-gray-300 hover:bg-gray-700">
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
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
        
        {/* Paginação */}
        <div className="p-4 flex items-center justify-between border-t border-gray-600">
          <div className="flex items-center gap-2 text-sm text-gray-300">
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
              className="px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {'<<'}
            </button>
            <button
              className="px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {'<'}
            </button>
            <button
              className="px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {'>'}
            </button>
            <button
              className="px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {'>>'}
            </button>
            <select
              className="px-2 py-1 bg-gray-700 text-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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