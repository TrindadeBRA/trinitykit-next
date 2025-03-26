export default function OurMission() {
    const stats = [
        { label: 'de volume mensal', value: '22 tons' },
        { label: 'viabilizando essa entrega', value: '25 pessoas' },
        { label: 'em aditivos plásticos', value: '80 soluções' },
    ]

    return (
        <div className="bg-[#f4f4f4] py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                    <h2 className="text-4xl font-semibold tracking-tight text-pretty text-black sm:text-5xl" data-aos="fade-right">Missão</h2>
                    <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                        <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                            <p className="text-xl/8 text-black" data-aos="fade-right">
                                Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam
                                eget aliquam. Quisque id at vitae feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget.
                                Eleifend egestas fringilla sapien.
                            </p>
                            <p className="mt-10 max-w-xl text-base/7 text-black" data-aos="fade-right">
                                Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet
                                vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque
                                erat velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris
                                semper sed amet vitae sed turpis id.
                            </p>
                        </div>
                        <div className="lg:flex lg:flex-auto lg:justify-center">
                            <dl className="w-64 space-y-8 xl:w-80">
                                {stats.map((stat) => (
                                    <div key={stat.label} className="flex flex-col-reverse gap-y-4" data-aos="fade-left">
                                        <dt className="text-base/7 text-black">{stat.label}</dt>
                                        <dd className="text-5xl font-semibold tracking-tight text-black">{stat.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}