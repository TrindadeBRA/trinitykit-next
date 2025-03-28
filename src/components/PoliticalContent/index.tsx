import { InformationCircleIcon } from '@heroicons/react/20/solid'

export default function PrivacyPolicy() {
    return (
        <div className="bg-white px-6 py-24 lg:px-8 overflow-x-hidden">
            <div className="mx-auto max-w-7xl text-base/7 text-gray-700">
                <p className="text-base/7 font-semibold text-[#0399c4]" data-aos="fade-in">Política de Privacidade</p>
                <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl" data-aos="fade-in">
                    Tiken: Compromisso com sua Privacidade
                </h1>
                <p className="mt-6 text-xl/8" data-aos="fade-in">
                    Na Tiken, protegemos seus dados pessoais e garantimos transparência em todas as nossas práticas de tratamento de informações.
                </p>
                <div className="mt-10">
                    <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900" data-aos="fade-in">
                        Coleta e Uso de Dados
                    </h2>
                    <p className="mt-6" data-aos="fade-in">
                        Comprometemo-nos a coletar e utilizar seus dados pessoais de forma ética, segura e em conformidade com a Lei Geral de Proteção de Dados (LGPD).
                    </p>
                    <ul role="list" className="mt-8 space-y-8 text-gray-600" data-aos="fade-in">
                        <li className="flex gap-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mt-1 size-5 flex-none text-[#0399c4]">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                            <span>
                                <strong className="font-semibold text-gray-900">Coleta de Dados em Formulários</strong> Ao preencher nossos formulários, seus dados serão armazenados para futuras comunicações de marketing, sempre com seu consentimento expresso.
                            </span>
                        </li>
                        <li className="flex gap-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mt-1 size-5 flex-none text-[#0399c4]">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                            <span>
                                <strong className="font-semibold text-gray-900">Finalidade do Armazenamento</strong> Os dados coletados serão utilizados exclusivamente para comunicações de marketing, ofertas personalizadas e melhoria de nossos serviços.
                            </span>
                        </li>
                        <li className="flex gap-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mt-1 size-5 flex-none text-[#0399c4]">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                            <span>
                                <strong className="font-semibold text-gray-900">Direito de Exclusão</strong> Você pode solicitar a qualquer momento a exclusão de seus dados ou a interrupção do envio de comunicações de marketing.
                            </span>
                        </li>
                    </ul>

                    <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900">
                        Segurança dos Dados
                    </h2>
                    <p className="mt-6" data-aos="fade-in">
                        Implementamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição não autorizada.
                    </p>

                    <figure className="mt-10 border-l border-[#0399c4] pl-9" data-aos="fade-in">
                        <blockquote className="font-semibold text-gray-900">
                            <p>
                                &quot;Sua privacidade é nossa prioridade. Comprometemo-nos a tratar seus dados com o máximo de respeito, segurança e transparência.&quot;
                            </p>
                        </blockquote>
                    </figure>

                    <div className="mt-16">
                        <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900" data-aos="fade-in">
                            Consentimento e Transparência
                        </h2>
                        <p className="mt-6">
                            Ao utilizar nossos serviços e preencher formulários, você concorda expressamente com nossa política de privacidade. Seus dados serão utilizados única e exclusivamente para os fins especificados, com total transparência.
                        </p>
                        <p className="mt-8">
                            Em caso de dúvidas ou para exercer seus direitos de proteção de dados, entre em contato através do e-mail: privacidade@tiken.com.br
                        </p>
                    </div>

                    <figure className="mt-16" data-aos="fade-in">
                        <figcaption className="mt-4 flex gap-x-2 text-sm/6 text-gray-500">
                            <InformationCircleIcon aria-hidden="true" className="mt-0.5 size-5 flex-none text-gray-300" />
                            Proteção de dados: nosso compromisso com você
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>
    )
}