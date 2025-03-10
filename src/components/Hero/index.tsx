import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Particles from '../Particles'

export default function Hero() {
    return (
        <div className="relative isolate overflow-hidden bg-white h-lvh">
            <div className="w-full absolute top-0 left-0 right-0 bottom-0 -z-10">
                <Particles
                    particleColors={
                        [
                            "#672873", // Roxo escuro
                            "#9a5183", // Roxo médio
                            "#cc2e4a", // Vermelho rosado
                            "#dd5736", // Laranja avermelhado
                            "#e37d4f", // Laranja médio
                            "#e7ae24"  // Amarelo dourado
                        ]
                    }
                    particleCount={1000}
                    particleSpread={30}
                    particleHoverFactor={1}
                    speed={0.8}
                    particleBaseSize={500}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                    className="w-full h-full"
                />
            </div>
            <svg
                aria-hidden="true"
                className="absolute inset-0 -z-10 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            >
                <defs>
                    <pattern
                        x="50%"
                        y={-1}
                        id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
                        width={200}
                        height={200}
                        patternUnits="userSpaceOnUse"
                    >
                        <path d="M.5 200V.5H200" fill="none" />
                    </pattern>
                </defs>
                <rect fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" width="100%" height="100%" strokeWidth={0} />
            </svg>
            <div className="mx-auto max-w-7xl px-6 lg:flex h-full items-center justify-center lg:justify-start">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:shrink-0 lg:pt-8 bg-white/75 p-2 rounded-lg">
                    <div className="mt-24 sm:mt-32 lg:mt-16">
                        <a href="#" className="inline-flex space-x-6">
                            <span className="rounded-full bg-gradient-custom px-3 py-1 text-sm/6 font-semibold text-white ring-1 ring-white/10 ring-inset">
                                Novidades
                            </span>
                            <span className="inline-flex items-center space-x-2 text-sm/6 font-medium text-gray-600">
                                <span>Acabamos de lançar a v1.0</span>
                                <ChevronRightIcon aria-hidden="true" className="size-5 text-gray-400" />
                            </span>
                        </a>
                    </div>
                    <h1 className="mt-10 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                    Criamos conexões e soluções através da química para inovar o mundo
                    </h1>
                    <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                        Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                        fugiat veniam occaecat.
                    </p>
                    <div className="mt-10 flex items-center gap-x-6">
                        <a
                            href="#"
                            className="rounded-md bg-gradient-custom px-6 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Comece agora
                        </a>
                        <a href="#" className="text-sm/6 font-semibold text-gray-900">
                            Saiba mais <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
