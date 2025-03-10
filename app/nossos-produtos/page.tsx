import ProductsTable from "@/src/components/ProductsTable";
import { getGetProductsUrl, getProductsResponse } from "@/src/services/api";
import customFetch from "@/src/services/custom-fetch";

export const metadata = {
  title: 'Nossos Produtos | Tiken',
  description: 'A Tiken oferece soluções inovadoras em química. Se não encontrar seu produto, entre em contato e encontraremos a solução ideal para você.',
}

async function getProdutos(): Promise<getProductsResponse> {
  try {
    const response = await customFetch<getProductsResponse>(getGetProductsUrl());
    console.log(response);
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
    return (
      <div className="p-8 text-white">
        <h1 className="text-2xl font-bold mb-6">Nossos Produtos</h1>
        <div className="bg-gray-800 p-6 rounded-lg">Nenhum produto encontrado</div>
      </div>
    );
  }
  
  return <ProductsTable produtos={produtos} />;
}