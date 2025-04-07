import ContactItems from "@/src/components/ContactItems";
import PinMap from "@/src/components/PinMap";
import { getGetPostSlugsUrl, getGetPostSlugUrl, getPostSlugResponse } from "@/src/services/api";
import customFetch from "@/src/services/custom-fetch";
import { GetPostSlug200Data, GetPostSlugs200 } from "@/src/services/model";
import { Metadata } from "next";

interface BlogPostProps {
  slug?: string;
}


async function getPostSlug(slug: string): Promise<getPostSlugResponse> {
  try {
    const response = await customFetch<getPostSlugResponse>(
      getGetPostSlugUrl(slug)
    );
    return response;
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }
}

export async function generateMetadata({ params }: { params: BlogPostProps }): Promise<Metadata> {

  const { slug } = await params

  if (!slug) {
    throw new Error("Slug não encontrado");
  }

  const response = await getPostSlug(slug);

  const data = response.data as GetPostSlug200Data;
  const { title, excerpt, content } = data;

  const cleanContent = content?.replace(/<[^>]*>?/g, '')?.replace(/&nbsp;/g, ' ')?.substring(0, 155);

  if (!title) {
    throw new Error("Título ou resumo não encontrado");
  } 
  
  return {
    title: `Blog | Tiken - ${title}`,
    description: excerpt || cleanContent,
  }
}

export default async function Page({ params }: { params: Promise<BlogPostProps> }) {
  const { slug } = await params;

  if (!slug) {
    throw new Error("Slug não encontrado");
  }

  let response: getPostSlugResponse;
  try {
    response = await getPostSlug(slug);
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }
  return (
    <>

      <div className="container mx-auto px-4 py-8 overflow-x-hidden">
        <h1 className="text-3xl font-bold mb-8">Blog - {slug}</h1>
        <pre className="block">{JSON.stringify(response, null, 2)}</pre>
      </div>

      <ContactItems />
      <PinMap />
    </>
  )
}


export async function generateStaticParams() {
  try {
    const { data }: GetPostSlugs200 = await customFetch(getGetPostSlugsUrl());

    if (!data) {
      throw new Error("Não foi possível obter os posts");
    }

    const posts = data.map((post) => ({
      slug: post.slug
    }));

    return posts;
  } catch (error) {
    console.error('Erro ao buscar meta informações dos posts:', error);
    return [];
  }
}
