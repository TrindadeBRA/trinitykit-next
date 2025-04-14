import ContactItems from "@/src/components/ContactItems";
import DiscoverOurProducts from "@/src/components/DIscoverOurProducts";
import ExcellenceRecognition from "@/src/components/ExcellenceRecognition";
import Hero from "@/src/components/Hero";
import Markets from "@/src/components/Markets";
import OurBlog from "@/src/components/OurBlog";
import OurPurpose from "@/src/components/OurPurpose";
import PinMap from "@/src/components/PinMap";
import TalkToUs from "@/src/components/TalkToUs";
import { getGetPostSlugsUrl, getPostSlugsResponse } from "@/src/services/api";
import customFetch from "@/src/services/custom-fetch";
import { GetPostSlugs200DataItem } from "@/src/services/model";

export const metadata = {
  title: 'Tiken - Home',
  description: 'Inove seu mundo!',
}

async function getPostsPagination(): Promise<getPostSlugsResponse> {
  try {
    const response = await customFetch<getPostSlugsResponse>(
      getGetPostSlugsUrl({
        page: 1,
        per_page: 3
      })
    );
    return response;
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }
}

export default async function Home() {

  let recentPostsResponse: getPostSlugsResponse;
  try {
    recentPostsResponse = await getPostsPagination();
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }
  const recentPosts = recentPostsResponse.data as GetPostSlugs200DataItem[];
  
  return (
    <>
      <Hero />
      <ExcellenceRecognition />
      <OurPurpose />
      <DiscoverOurProducts />
      <Markets />
      <TalkToUs />
      <OurBlog posts={recentPosts} />
      <ContactItems />
      <PinMap />
    </>
  );
}