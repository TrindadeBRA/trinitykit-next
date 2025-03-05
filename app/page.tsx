import Hero from "@/src/components/Hero";

export const metadata = {
  title: 'Tiken - Home',
  description: 'Tiken é uma empresa que cria soluções para o mundo através da química',
  openGraph: {
    title: 'Tiken - Home',
    description: 'Tiken é uma empresa que cria soluções para o mundo através da química',
  },
}

export default function Home() {
  
  return (
    <>
      <Hero />
    </>
  );
}
