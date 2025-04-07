import Link from "next/link";

export const metadata = {
  title: 'Blog | Tiken',
  description: 'Descubra as últimas novidades e tendências em química, com artigos que oferecem soluções inovadoras e insights valiosos. Junte-se a nós para explorar o mundo da química e encontrar o que há de melhor para suas necessidades.',
}

export default function Blog() {
  return (
    <div>
      <h1>Blog</h1>
      <Link href="/blog/page/1">Página 1</Link>
    </div>
  );
}