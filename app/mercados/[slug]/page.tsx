import IntroProductLine from "@/src/components/IntroProductLine";

interface MercadoProps {
  slug?: string;
}

export default async function Page({ params }: { params: Promise<MercadoProps> }) {
  const { slug } = await params;
  return (
    <div>
      <h1 className="text-4xl font-bold">Mercado - {slug}</h1>
      <IntroProductLine />
      <IntroProductLine invert />
      <IntroProductLine />
      <IntroProductLine invert />
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