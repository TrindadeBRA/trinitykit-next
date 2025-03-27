import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { ArrowRightIcon } from 'lucide-react'

export default function WorkWithUs() {
    return (
        <div className="relative isolate bg-white overflow-x-hidden">
            <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
                <div className="relative px-6 py-24 lg:static lg:px-8">
                    <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                        <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
                            <svg
                                aria-hidden="true"
                                className="absolute inset-0 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                            >
                                <defs>
                                    <pattern
                                        x="100%"
                                        y={-1}
                                        id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                                        width={200}
                                        height={200}
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <path d="M130 200V.5M.5 .5H200" fill="none" />
                                    </pattern>
                                </defs>
                                <rect fill="white" width="100%" height="100%" strokeWidth={0} />
                                <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
                                    <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                                </svg>
                                <rect fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" width="100%" height="100%" strokeWidth={0} />
                            </svg>
                        </div>
                        <p
                            className="text-base/7 font-semibold text-[#0399c4]"
                            data-aos="fade-in"
                            data-aos-desktop="fade-left"
                        >
                            Trabalhe Conosco
                        </p>
                        <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                            Seja Tiken!
                        </h2>
                        <p className="mt-6 text-lg/8 text-gray-600">
                            Proin volutpat consequat porttitor cras nullam gravida at. Orci molestie a eu arcu. Sed ut tincidunt
                            integer elementum id sem. Arcu sed malesuada et magna.
                        </p>
                    </div>
                </div>
                <form action="#" method="POST" className="px-6 py-24 sm:pb-32 lg:px-8">
                    <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block text-sm/6 font-semibold text-gray-900">
                                    Nome
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
                                    Email
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="phone-number" className="block text-sm/6 font-semibold text-gray-900">
                                    Telefone
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        id="phone-number"
                                        name="phone-number"
                                        type="tel"
                                        autoComplete="tel"
                                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block text-sm/6 font-semibold text-gray-900">
                                    Linkedin
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        id="linkedin"
                                        name="linkedin"
                                        type="url"
                                        autoComplete="url"
                                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                    />
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                                    Currículo
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                                        <div className="mt-4 flex text-sm/6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                                            >
                                                <span>Faça o upload do seu currículo</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".pdf, .doc, .docx" />
                                            </label>
                                            <p className="pl-1">ou arraste e solte</p>
                                        </div>
                                        <p className="text-xs/5 text-gray-600">PDF, DOC, DOCX até 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button
                                type="submit"
                                className="flex items-center gap-x-2 rounded-md bg-[#9061a8] text-white px-4 py-2.5 font-bold font-space-mono w-fit"
                            >

                                enviar <ArrowRightIcon className="size-4" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
