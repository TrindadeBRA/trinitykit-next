import IntroProductLine from "@/src/components/IntroProductLine";
import { getGetProductLineSlugUrl, getProductLineSlugResponse } from "@/src/services/api";
import customFetch from "@/src/services/custom-fetch";
import type { GetProductLineSlug200Data, GetProductLineSlug200DataSubcategoriesItem, GetProductLineSlug200DataSubcategoriesItemProductsItem } from '@/src/services/model';
import { Metadata } from 'next';
import { twMerge } from "tailwind-merge";

interface ProductLineProps {
  slug?: string;
}

// Traduzir slugs
export const slugToName = {
  "tk-comp": "TK Comp",
}

async function getProductLineInfo(slug: string): Promise<getProductLineSlugResponse> {
  try {
    const response = await customFetch<getProductLineSlugResponse>(getGetProductLineSlugUrl(slug));
    console.log(response?.data);
    return response;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
}

export async function generateMetadata(
  { params }: { params: Promise<ProductLineProps> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const segmentName = slug ? slugToName[slug as keyof typeof slugToName] || slug : 'Segmento Desconhecido';
  const segmentNameLower = segmentName.toLowerCase();

  return {
    title: `Tiken - Linha de produtos - ${segmentName}`,
    description: `Explore nossa linha de produtos ${segmentNameLower}.`,
  };
}

export default async function Page({ params }: { params: Promise<ProductLineProps> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  if (!slug) {
    return <div>Slug não encontrado</div>;
  }

  const response = await getProductLineInfo(slug);

  if (response.status === 401 || response.status === 404) {
    return <div>Erro ao buscar informações do produto.</div>;
  }

  const data: GetProductLineSlug200Data = response.data as GetProductLineSlug200Data;

  if (!data) {
    return <div>Dados do produto não encontrados.</div>;
  }

  if (data?.subcategories?.length === 0) {
    return <div>Nenhuma subcategoria encontrada.</div>;
  }

  return (
    <div>
      <h1>Linha de produtos</h1>

      <IntroProductLine
        invert={false}
        title={data.parent?.name || ''}
        description={data.parent?.description || ''}
        imagesUrls={data.parent?.images || []}
      />

      <div className="flex gap-x-4 gap-y-12 md:gap-y-6 px-8 flex-wrap container mx-auto">
        
        {data?.subcategories?.map((category: GetProductLineSlug200DataSubcategoriesItem) => {
          const getMaxWidthClass = (length: number) => {
            const widthMap: Record<number, string> = {
              1: "max-w-full",
              2: "max-w-1/2",
              3: "max-w-1/3"
            };
            return `max-w-full md:${widthMap[length] || "max-w-1/3"}`;
          };

          const maxWidthClass = data?.subcategories?.length 
            ? getMaxWidthClass(data.subcategories.length)
            : "";

          return (
            <div key={category.slug} className={twMerge(
              "flex-1 w-full md:w-auto",
              maxWidthClass
            )}>
              <h3 className="text-lg text-center font-semibold mb-2">{category.name}</h3>
              <table className="border-collapse border border-gray-200 w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Produto</th>
                    <th className="border border-gray-300 px-4 py-2">CAS Number</th>
                  </tr>
                </thead>
                <tbody>
                  {category?.products?.map((product: GetProductLineSlug200DataSubcategoriesItemProductsItem) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">{product.title}</td>
                      <td className="border border-gray-300 px-4 py-2">{product.cas_number}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export async function generateStaticParams() {
  return [
    { slug: "tk-comp" },
  ];
}