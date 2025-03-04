import { getGetProductsUrl, getProductsResponse } from "@/src/services/api";
import customFetch from "@/src/services/custom-fetch";
import { GetProducts200DataItem } from "@/src/services/model";

async function getProdutos(): Promise<getProductsResponse> {
  try {
    const response = await customFetch<getProductsResponse>(getGetProductsUrl());
    return response;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
}

export default async function NossosProdutos() {
  const response: getProductsResponse = await getProdutos();
  const produtos = response.data;

  if (!produtos || !Array.isArray(produtos)) {
    return <div>Nenhum produto encontrado</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-white">Nossos Produtos</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Segmento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Linha de Produto Pai</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Linha de Produto Filho</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-600">
            {produtos.map((produto: GetProducts200DataItem) => (
              <tr key={produto.id} className="text-gray-300 hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">{produto.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{produto.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {produto.segments?.map(segment => segment.name).join(', ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {produto.product_lines?.map(line => line.name).join(', ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {produto.product_lines?.map(line => 
                    line.children?.map(child => child.name).join(', ')
                  ).join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}