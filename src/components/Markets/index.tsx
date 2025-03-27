import { ArrowRightIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const markets = [
  {
    name: 'Plásticos & Elastômeros ',
    slug: 'plasticos-elastomeros',
    imageSrc: '/assets/images/market-plasticos-elastomeros.webp',
    downloadLink: '/downloads/plastico-elastomeros.pdf',
  },
  {
    name: 'Cosméticos',
    slug: 'cosmeticos',
    imageSrc: '/assets/images/market-cosmeticos.webp',
    downloadLink: '/downloads/cosmeticos.pdf',
  },
  {
    name: 'Adesivos',
    slug: 'adesivos',
    imageSrc: '/assets/images/market-adesivos.webp',
    downloadLink: '/downloads/adesivos.pdf',
  },
]

export default function Markets() {
  return (
    <div className="bg-gray-100" id="mercados">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 lg:max-w-none">
          <p className="text-base/7 font-semibold text-[#0399c4] text-center" data-aos="fade-left">Nosso Foco</p>
          <h2 className="mt-2 text-5xl font-semibold tracking-tight text-pretty text-[#515151] text-center" data-aos="fade-left">
            Mercados
          </h2>
          <p className="mt-6 text-xl text-[#515151] text-center max-w-2xl mx-auto" data-aos="fade-left">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam no nummy nibh euismod tincidunt ut laoreet dolore magna.</p>

          <div className="mt-12 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0 max-w-5xl mx-auto">
            {markets.map((market) => (
              <div key={market.name} className="group relative" data-aos="zoom-in">

                <div>
                  <Link href={`/produtos?segment=${market.slug}`}>
                    <h3 className="mt-6 mb-4 text-xl text-gray-500 font-light">
                      {market.name}
                    </h3>
                  </Link>
                </div>


                <div className="relative">
                  <Link href={`/produtos?segment=${market.slug}`}>
                    <Image
                      src={market.imageSrc}
                      className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 transition-all duration-300 max-sm:h-80 sm:aspect-2/1 lg:aspect-square"
                      width={1000}
                      height={1000}
                      alt={market.name}
                    />
                  </Link>
                </div>

                <div className="flex flex-row gap-2 justify-between w-full mt-6">
                  <Link
                    href={`/produtos?segment=${market.slug}`}
                    className="flex items-center gap-x-2 rounded-md bg-[#9061a8] text-white px-4 py-2.5 font-bold font-space-mono w-fit"
                  >
                    saiba mais <ArrowRightIcon className="size-4" />
                  </Link>

                  <Link
                    href={market.downloadLink}
                    className="flex items-center gap-x-2 text-[#0399c4] font-bold font-space-mono w-fit"
                  >
                    Download <ArrowRightIcon className="size-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
