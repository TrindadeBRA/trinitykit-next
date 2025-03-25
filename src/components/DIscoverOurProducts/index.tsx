import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function DiscoverOurProducts() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Background com efeito parallax */}
      <div
        className="absolute inset-0 bg-[url('/assets/images/our-products-bg.webp')] bg-cover bg-center bg-fixed"
        style={{ backgroundAttachment: 'fixed' }}
      />

      {/* Overlay para melhorar legibilidade */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Conteúdo */}
      <div className="relative px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl" data-aos="zoom-in">
            Descubra nossos produtos
          </h2>
          <p className="mx-auto mt-6 w-full max-w-4xl text-lg/8 text-pretty text-white font-semibold drop-shadow-2xl" data-aos="zoom-in">
            A Tiken tem se diferenciado cada vez mais, oferecendo soluções que atendam as exigências e necessidades de mercado, através de produtos com alta qualidade e performance
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/produtos"
              className="flex items-center gap-x-2 rounded-md bg-white text-[#0399c4] px-4 py-2.5 font-bold font-space-mono"
              data-aos="zoom-in"
            >
              saiba mais <ArrowRightIcon className="size-4" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
