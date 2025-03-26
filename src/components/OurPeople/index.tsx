import Image from "next/image";

export default function OurPeople() {
    return (

        <div className = "my-16 overflow-hidden" id="equipe" >
            <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:min-w-full lg:flex-none lg:gap-y-8">
                    <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl" data-aos="fade-right">Nossa equipe</h2>
                        <p className="mt-6 text-xl/8 text-gray-600" data-aos="fade-right">
                            Quasi est quaerat. Sit molestiae et. Provident ad dolorem occaecati eos iste. Soluta rerum quidem
                            minus ut molestiae velit error quod. Excepturi quidem expedita molestias quas.
                        </p>
                        <p className="mt-6 text-base/7 text-gray-600" data-aos="fade-right">
                            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
                            amet fugiat veniam occaecat fugiat. Quasi aperiam sit non sit neque reprehenderit.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
                        <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                            <Image
                                alt=""
                                src="/assets/images/ourpeople-page/our-people-01.webp"
                                className="aspect-7/5 w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                                width={1152}
                                height={842}
                                data-aos="fade-left"
                            />
                        </div>
                        <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                            <div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                                <Image
                                    alt=""
                                    src="/assets/images/ourpeople-page/our-people-02.webp"
                                    className="aspect-4/3 w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                                    width={768}
                                    height={604}
                                    data-aos="fade-right"

                                />
                            </div>
                            <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                                <Image
                                    alt=""
                                    src="/assets/images/ourpeople-page/our-people-03.webp"
                                    className="aspect-7/5 w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                                    width={1152}
                                    height={842}
                                    data-aos="fade-in"
                                />
                            </div>
                            <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                                <Image
                                    alt=""
                                    src="/assets/images/ourpeople-page/our-people-02.webp"
                                    className="aspect-4/3 w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                                    width={768}
                                    height={604}
                                    data-aos="fade-left"

                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}