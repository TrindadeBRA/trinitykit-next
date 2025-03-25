import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { ArrowRight, ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import Particles from '../Particles'


export default function Hero() {
    return (
        <div className="h-[calc(100vh-100px)] bg-[url('/assets/images/home-hero.webp')] bg-cover bg-center relative">
            {/* Camada de partículas */}
            <div className="w-full absolute top-0 left-0 right-0 bottom-0 z-10">
                <Particles
                    particleColors={[
                        "#672873",
                        "#9a5183",
                        "#cc2e4a",
                        "#dd5736",
                        "#e37d4f",
                        "#e7ae24"
                    ]}
                    particleCount={1000}
                    particleSpread={15}
                    particleHoverFactor={1}
                    speed={0.8}
                    particleBaseSize={500}
                    moveParticlesOnHover={false}
                    alphaParticles={false}
                    className="w-full h-full"
                />
            </div>

            {/* Conteúdo/Texto */}
            <div className="relative mx-auto max-w-7xl px-6 lg:flex h-full items-center justify-center lg:justify-start z-20">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:shrink-0 lg:pt-8 p-2 rounded-lg">
                    <h1 className="mt-10 text-4xl font-semibold text-white tracking-tight text-pretty sm:text-5xl" data-aos="fade-right">
                        Criamos conexões e soluções através da química para inovar o mundo
                    </h1>
                    <p className="mt-8 text-lg font-medium text-pretty text-white sm:text-xl/8" data-aos="fade-right">
                        Somos uma empresa de especialidades químicas em parceria com marcas renomadas internacionalmente. Com uma equipe que adquiriu conhecimento técnico e know-how ao longo dos anos, temos como objetivo proporcionar de forma eficiente e rápida, soluções que atendam as demandas dos mercados.
                    </p>
                    <div className="mt-10 flex flex-col lg:flex-row items-center gap-10" data-aos="fade-right">
                        <Link
                            href="/#contato"
                            className="flex items-center gap-x-2 rounded-md bg-[#f5d22c] text-black px-4 py-2.5 font-bold font-space-mono"
                        >
                            fale conosco <ArrowRightIcon className="size-4" />
                        </Link>
                        <Link
                            href="https://tiken.com.br/wp-content/uploads/2024/05/Apresentacao-Tiken-2024_compressed.pdf"
                            target="_blank"
                            className="flex items-center gap-x-2 text-white font-bold font-space-mono"
                        >
                            baixar apresentação <ArrowRightIcon className="size-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
