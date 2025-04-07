import ContactItems from "@/src/components/ContactItems";
import PinMap from "@/src/components/PinMap";
import { getGetPostSlugsUrl, getPostSlugsResponse } from "@/src/services/api";
import customFetch from "@/src/services/custom-fetch";
import { GetPostSlugs200, GetPostSlugs200DataItem } from "@/src/services/model";
import { Metadata } from "next";
import Link from "next/link";


interface BlogPageProps {
  page: string;
}

export const postsPerPage = 3;


async function getPostsPagination(page: string): Promise<getPostSlugsResponse> {
  try {
    const response = await customFetch<getPostSlugsResponse>(
      getGetPostSlugsUrl({
        page: parseInt(page),
        per_page: postsPerPage
      })
    );
    return response;
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }
}

export async function generateMetadata({ params }: { params: Promise<BlogPageProps> }): Promise<Metadata> {

  const { page } = await params
  
  return {
    title: `Blog | Tiken - Página ${page}`,
    description: 'A Tiken oferece soluções inovadoras em química. Se não encontrar seu produto, entre em contato e encontraremos a solução ideal para você.',
  }
}

export default async function Page({ params }: { params: BlogPageProps }) {
  const { page } = await params;
  let response: getPostSlugsResponse;
  try {
    response = await getPostsPagination(page);
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }

  const data = response.data as GetPostSlugs200DataItem[];

  return (
    <>

      <div className="container mx-auto px-4 py-8 overflow-x-hidden">
        <h1 className="text-3xl font-bold mb-8">Blog - Página {page}</h1>
        <pre className="flex w-full flex-wrap">{JSON.stringify(response, null, 2)}</pre>

        {
          data && (
            <div className="flex flex-col gap-4 w-full">
              {data.map((post: GetPostSlugs200DataItem) => (
                <div key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">{post.title}</h2>
                    <p className="text-sm text-gray-500">{post.excerpt}</p>
                  </Link>
                </div>
              ))}
            </div>
          )
        }
      </div>

      <ContactItems />
      <PinMap />
    </>

  );

}

export async function generateStaticParams() {
  try {
    const { total_pages }: GetPostSlugs200 = await customFetch(getGetPostSlugsUrl(
      {
        page: 1,
        per_page: postsPerPage
      }
    ));

    if (!total_pages) {
      throw new Error("Não foi possível obter o total de páginas");
    }

    const pages = Array.from({ length: Math.max(1, total_pages) }, (_, i) => ({
      page: (i + 1).toString()
    }));

    return pages;
  } catch (error) {
    console.error('Erro ao buscar meta informações dos posts:', error);
    return [];
  }
}
