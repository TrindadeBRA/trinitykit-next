import BlogContent from "@/src/components/BlogContent";
import ContactItems from "@/src/components/ContactItems";
import PinMap from "@/src/components/PinMap";
import { getGetPostSlugsUrl, getGetPostSlugUrl, getPostSlugResponse } from "@/src/services/api";
import customFetch from "@/src/services/custom-fetch";
import { GetPostSlug200Data, GetPostSlugs200 } from "@/src/services/model";
import { Metadata } from "next";

import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'


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

export async function generateMetadata({ params }: { params: Promise<BlogPostProps> }): Promise<Metadata> {

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
    title: `Tiken - ${title}`,
    description: excerpt || cleanContent,
  }
}

export default async function Page({ params }: { params: Promise<BlogPostProps> }) {
  const { slug } = await params;
  if (!slug) {
    throw new Error("Slug não encontrado");
  }
  let response: any;
  try {
    response = await getPostSlug(slug);
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }

  console.log(response?.data?.featured_image_url)

  return (
    <>

<div
        className="img-overlay-gradient w-full h-96 relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${response?.data?.featured_image_url ?? "/assets/images/home-hero.webp"})` }}
        data-aos="fade-right"
      >
        <div className="container mx-auto h-full flex flex-col items-center justify-center">
          <h1 className="text-2xl lg:text-4xl font-bold text-white text-center px-4 z-10 font-space-mono">
            {response.data.title}
          </h1>
          <p className="text-base lg:text-lg text-white text-center px-4 z-10 font-space-mono font-bold mt-4">
            {format(parseISO(response.data.created_at || ''), "dd 'de' MMMM',' yyyy", { locale: ptBR })}
          </p>
        </div>
      </div>

      <div className="mx-auto flex flex-col lg:flex-row container gap-x-8">

        <div className="w-full lg:w-3/4 py-16">
          <BlogContent content={response} />
        </div>
        <div className="w-full lg:w-1/4 flex flex-col gap-y-4 py-16">
          {
            Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-lg font-bold">Lorem ipsum dolor sit amet</h2>
                <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            ))
          }
        </div>
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
