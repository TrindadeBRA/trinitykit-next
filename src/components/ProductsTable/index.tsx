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
import ModalForm from './ModalForm';

type ProductsTableProps = GetProducts200DataItem;

const fuzzyFilter: FilterFn<ProductsTableProps> = (row, columnId, value) => {
  const itemValue = row.getValue(columnId)?.toString()?.toLowerCase();
  return itemValue ? itemValue.includes(value.toLowerCase()) : false;
};

export default function ProductsTable({ allProducts }: { allProducts: ProductsTableProps[] }) {
  const [segmentoFilter, setSegmentoFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductsTableProps | null>(null);
  const [modalTitle, setModalTitle] = useState('');
  const columnHelper = createColumnHelper<ProductsTableProps>();

  const handleOpenModal = (product: ProductsTableProps, title: string) => {
    setSelectedProduct(product);
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

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
            onClick={() => handleOpenModal(info.row.original, 'Literatura Técnica')}
            className="px-2 py-1 bg-blue-500 text-white rounded mx-auto block cursor-pointer"
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
            onClick={() => handleOpenModal(info.row.original, 'Solicitar Amostra')}
            className="px-2 py-1 bg-blue-500 text-white rounded mx-auto block cursor-pointer"
          >
            Solicitar
          </button>
        ),
      }),
    ],
    [
      // columnHelper
    ]
  );

  // console.log('Renderizando ProductsTable com produtos:');

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
  // console.log('Número de linhas na tabela:', table.getRowModel().rows.length);

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
    <div className="p-2 md:p-8 mt-4 md:mt-6 overflow-x-auto">
      <div className="mb-4 md:mb-6 flex flex-col md:flex-row gap-2 md:gap-4">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          <div className="relative w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 md:h-5 md:w-5 text-black" />
            </div>
            <select
              value={segmentoFilter}
              onChange={handleSegmentChange}
              className="pl-8 md:pl-10 p-2 bg-[#f5d22c] rounded-md text-black w-full md:w-auto text-sm md:text-base"
            >
              <option value="">Todos os Segmentos</option>
              {uniqueSegments.map(segment => (
                <option key={segment.uuid} value={segment.name}>{segment.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed divide-y divide-gray-300" 
                   style={{ minWidth: '768px' }}>
              <thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className="px-2 md:px-6 py-2 md:py-3 text-center text-xs md:text-sm font-bold text-gray-850 uppercase tracking-wider cursor-pointer whitespace-nowrap"
                        onClick={header.column.getToggleSortingHandler()}
                        style={{ width: `${header.getSize()}%` }}
                      >
                        <div className="flex items-center justify-center">
                          <span className="text-xs md:text-sm">{flexRender(header.column.columnDef.header, header.getContext())}</span>
                          <span>
                            {{
                              asc: <ChevronUp className="h-3 w-3 md:h-4 md:w-4" />,
                              desc: <ChevronDown className="h-3 w-3 md:h-4 md:w-4" />,
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
                  table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="text-gray-850 hover:bg-gray-200">
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className={
                          twMerge(
                            `px-2 md:px-6 py-2 md:py-4 whitespace-nowrap truncate text-xs md:text-sm`
                          )}
                            style={{ width: `${cell.column.getSize()}%` }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-6 py-8 text-center text-gray-400 text-sm md:text-base"
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
        <div className="p-2 md:p-4 flex flex-col md:flex-row items-center justify-between border-t border-gray-300 gap-2 md:gap-4">
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

          <div className="flex items-center gap-1 md:gap-2">
            <button
              className="px-1 md:px-3 py-1 bg-gray-300 text-gray-850 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {'<<'}
            </button>
            <button
              className="px-1 md:px-3 py-1 bg-gray-300 text-gray-850 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {'<'}
            </button>
            <button
              className="px-1 md:px-3 py-1 bg-gray-300 text-gray-850 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {'>'}
            </button>
            <button
              className="px-1 md:px-3 py-1 bg-gray-300 text-gray-850 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {'>>'}
            </button>
            <select
              className="px-1 md:px-3 py-1 bg-gray-300 text-gray-850 rounded focus:outline-none text-xs md:text-sm"
              value={table.getState().pagination.pageSize}
              onChange={e => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[500, 1000, 2000, 3000, 4000, 5000].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ModalForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`${modalTitle}: ${selectedProduct?.title || ''}`}
      >
        {selectedProduct && (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700">Detalhes do Produto</h4>
              <p className="mt-1"><span className="font-semibold">Nome:</span> {selectedProduct.title}</p>
              <p><span className="font-semibold">CAS Number:</span> {selectedProduct.cas_number || 'N/A'}</p>
              <p><span className="font-semibold">Segmentos:</span> {selectedProduct.segments?.map(s => s.name).join(', ') || 'N/A'}</p>
              <p><span className="font-semibold">Descrição:</span> {selectedProduct.product_lines?.flatMap(l => l.children?.map(c => c.name) || []).join(', ') || 'N/A'}</p>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-700">Formulário de Solicitação</h4>
              <form className="mt-2 space-y-3">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensagem</label>
                  <textarea 
                    id="message" 
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                  />
                </div>
                <div className="pt-3">
                  <button 
                    type="button" 
                    className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md cursor-pointer"
                  >
                    Enviar Solicitação
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </ModalForm>
    </div>
  );
}