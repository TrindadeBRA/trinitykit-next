import { getGetProductLineSlugUrl, getProductLineSlugResponse } from "@/src/services/api";
import customFetch from "@/src/services/custom-fetch";
import { Metadata } from 'next';

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
    title: `Tiken - ${segmentName}`,
    description: `Explore nossa linha de produtos para o mercado de ${segmentNameLower}.`,
  };
}

export default async function Page({ params }: { params: Promise<ProductLineProps> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  if (!slug) {
    return <div>Slug não encontrado</div>;
  }

  const response: getProductLineSlugResponse = await getProductLineInfo(slug);
  const productLineInfo = response.data;

  if (!productLineInfo) {
    return <div>Segmento não encontrado</div>;
  }

  return (
    <div>
      <h1>Linha de produtos</h1>
      <div className="flex flex-wrap gap-4 text-black">
        <pre>{JSON.stringify(productLineInfo, null, 2)}</pre>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return [{ slug: "tk-comp" }];
}