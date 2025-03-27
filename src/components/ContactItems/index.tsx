import { EnvelopeIcon } from "@heroicons/react/24/outline"
import { MapPinIcon, PhoneIcon } from "lucide-react"

export default function ContactItems() {
  return (
    <div className="relative isolate overflow-hidden overflow-x-hidden">
      {/* Background com efeito parallax */}
      <div
        className="absolute inset-0 bg-[url('/assets/images/contact-itens-bg.webp')] bg-cover bg-center bg-fixed"
        style={{ backgroundAttachment: 'fixed' }}
      />

      {/* Overlay para melhorar legibilidade */}
      <div className="absolute inset-0 bg-black/5" />

      {/* Conteúdo */}
      <div className="relative px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <p className="text-base/7 font-semibold text-[#0399c4]" data-aos="fade-left">Centro de Suporte</p>
            <h2 className="text-5xl font-semibold tracking-tight text-white" data-aos="fade-left">Esperamos seu contato</h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 mt-12">

            <div className="text-white border border-white/10 rounded-lg w-full bg-white/10 p-4" data-aos="fade-left">
              <div className="flex flex-row gap-2 items-center">
                <MapPinIcon className="w-6 h-6 text-[#0399c4]" />
                <h3 className="text-2xl font-light">Endereço</h3>
              </div>
              <div className="mt-6">
                <p>R. Vicente de Paula Souza e Silva, 466</p>
                <p>Asuncion - 09861-690 - Brazil</p>
              </div>
            </div>

            <div className="text-white border border-white/10 rounded-lg w-full bg-white/10 p-4" data-aos="fade-in">
              <div className="flex flex-row gap-2 items-center">
                <EnvelopeIcon className="w-6 h-6 text-[#0399c4]" />
                <h3 className="text-2xl font-light">Email</h3>
              </div>
              <div className="mt-6">
                <p>contato@tiken.com.br</p>
                <p>vendas@tiken.com.br</p>
              </div>
            </div>

            <div className="text-white border border-white/10 rounded-lg w-full bg-white/10 p-4" data-aos="fade-right">
              <div className="flex flex-row gap-2 items-center">
                <PhoneIcon className="w-6 h-6 text-[#0399c4]" />
                <h3 className="text-2xl font-light">Telefone & WhatsApp</h3>
              </div>
              <div className="mt-6">
                <p>(11) 99999-9999</p>
                <p>(11) 99999-9999</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
