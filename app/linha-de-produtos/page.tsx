import Link from 'next/link';

export const metadata = {
  title: 'Linha de produtos | Tiken',
  description: 'A Tiken oferece soluções inovadoras em química. Se não encontrar seu produto, entre em contato e encontraremos a solução ideal para você.',
}

export default function LinhaDeProdutos() {
  const slugs = [
    "plasticos-elastomeros",
    "cosmeticos",
    "adesivos",
    "tintas-vernizes",
  ];

  return (
    <div>
      <h1>Mercados</h1>
      <div className="flex flex-wrap gap-4">
        {slugs.map((slug) => (
          <Link 
            key={slug} 
            href={`/mercados/${slug}`} 
            className="btn bg-blue-500 text-white hover:bg-blue-700 rounded-lg px-4 py-2 transition duration-300"
          >
            {slug}
          </Link>
        ))}
      </div>
    </div>
  );
}