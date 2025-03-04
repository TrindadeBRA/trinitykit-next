interface BlogPostProps {
  slug?: string;
}

export default async function Page({ params }: { params: Promise<BlogPostProps> }) {
  const { slug } = await params;
  return <h1>My Page - {slug}</h1>
}


export async function generateStaticParams() {
  // const posts = await fetch('https://.../posts').then((res) => res.json())

  const posts = [
    { slug: "my-first-post" },
    { slug: "my-second-post" },
  ];
 
  return posts.map((post) => ({
    slug: post.slug,
  }))
}