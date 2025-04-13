import { GetPostSlugs200DataItem } from "@/src/services/model"
import Image from "next/image"
import Link from "next/link"
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function BlogGrid(
    {
        posts
    }: {
        posts: GetPostSlugs200DataItem[]
    }
) {
    return (
        <div className="bg-white py-12 relative isolate overflow-hidden overflow-x-hidden">
            <div className="absolute top-0 left-0 right-0 z-0">
                <svg
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
                >
                    <defs>
                        <pattern
                            x="50%"
                            y={-1}
                            id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                            width={200}
                            height={200}
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M.5 200V.5H200" fill="none" />
                        </pattern>
                    </defs>
                    <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                        <path
                            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                            strokeWidth={0}
                        />
                    </svg>
                    <rect fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" width="100%" height="100%" strokeWidth={0} />
                </svg>
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                <div className="mx-auto max-w-2xl lg:max-w-4xl">
                    <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl" data-aos="fade-right">Fique por dentro</h2>
                    <p className="mt-2 text-lg/8 text-gray-600" data-aos="fade-right">Descubra as últimas novidades e tendências em química, com artigos que oferecem soluções inovadoras e insights valiosos.</p>
                    <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
                        {posts.map((post) => (
                            <article key={post.slug} className="relative isolate flex flex-col gap-8 lg:flex-row" data-aos="fade-right">
                                <div className="relative aspect-video sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
                                    <Link href={`/blog/${post.slug}`}>
                                        <Image
                                            alt=""
                                            src={post.featured_image_url || ''}
                                            className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover"
                                            width={1000}
                                            height={1000}
                                        />
                                        <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
                                    </Link>
                                </div>
                                <div>
                                    <div className="flex items-center gap-x-4 text-xs">
                                        <time dateTime={post.created_at || ''} className="text-gray-500">
                                            {format(parseISO(post.created_at || ''), "dd 'de' MMMM',' yyyy", { locale: ptBR })}
                                        </time>
                                    </div>
                                    <div className="group relative max-w-xl">
                                        <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                                            <Link href={`/blog/${post.slug}`}>
                                                <span className="absolute inset-0" />
                                                {post.title}
                                            </Link>
                                        </h3>
                                        <p className="mt-5 text-sm/6 text-gray-600">{post.excerpt}</p>
                                    </div>


                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
