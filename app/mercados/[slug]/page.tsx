import IntroProductLine from "@/src/components/IntroProductLine";
import { getGetSegmentSlugUrl, getSegmentSlugResponse } from "@/src/services/api";
import customFetch from "@/src/services/custom-fetch";
import { GetSegmentSlug200DataItem, GetSegmentSlug200DataItemCategoriesItem, GetSegmentSlug200DataItemCategoriesItemProductsItem } from "@/src/services/model";

interface MercadoProps {
  slug?: string;
}

//traduzir slugs
export const slugToName = {
  "plasticos-elastomeros": "Plásticos e Elastoméricos",
  "cosmeticos": "Cosméticos",
  "adesivos": "Adesivos",
  "tintas-vernizes": "Tintas e Vernizes",
}

async function getSegmentsInfo(slug: string): Promise<getSegmentSlugResponse> {
  try {
    const response = await customFetch<getSegmentSlugResponse>(getGetSegmentSlugUrl(slug));
    return response;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
}


export default async function Page({ params }: { params: Promise<MercadoProps> }) {
  const { slug } = await params;

  if (!slug) {
    return <div>Slug não encontrado</div>;
  }

  const response: getSegmentSlugResponse = await getSegmentsInfo(slug);
  const segmentInfo = response.data;

  console.log(">>>>>>>>>>>>>segmentInfo", segmentInfo);


  if (!segmentInfo) {
    return <div>Segmento não encontrado</div>;
  }


  return (
    <div>
      <h1 className="text-4xl font-bold">Mercado - {slug}</h1>

      {
        Object.values(segmentInfo).map((product_lines: GetSegmentSlug200DataItem, index: number) => {
          // console.log(">>>>>>>>>>>>>product_lines", product_lines);

          return (
            <div key={product_lines.slug} style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}>
              <IntroProductLine
                invert={index % 2 !== 0}
                title={product_lines.name!}
                description={product_lines.description!}
                imagesUrls={product_lines.images!}
              />


              <div className="flex gap-4 flex-wrap container mx-auto">
                {product_lines?.categories?.map((category: GetSegmentSlug200DataItemCategoriesItem) => (
                  <div key={category.slug} className="flex-1 max-w-1/2">
                    <h3 className="text-lg text-center font-semibold mb-2">{category.name}</h3>
                    <table className="border-collapse border border-gray-200 w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border border-gray-300 px-4 py-2">Nome</th>
                          <th className="border border-gray-300 px-4 py-2">CAS Number</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category?.products?.map((product: GetSegmentSlug200DataItemCategoriesItemProductsItem) => (
                          <tr key={product.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{product.title}</td>
                            <td className="border border-gray-300 px-4 py-2">{product.cas_number}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
              
              
            </div>
          )
        })
      }
      <div className="mb-96"></div>
    </div>

  )
}


export async function generateStaticParams() {
  // const posts = await fetch('https://.../posts').then((res) => res.json())

  const posts = [
    { slug: "plasticos-elastomeros" },
    { slug: "cosmeticos" },
    { slug: "adesivos" },
    { slug: "tintas-vernizes" },
  ];

  return posts.map((post) => ({
    slug: post.slug,
  }))
}