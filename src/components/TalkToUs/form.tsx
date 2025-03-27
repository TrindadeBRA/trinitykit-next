'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRightIcon } from 'lucide-react'
import { useState } from 'react'
import { getGetSegmentSlugUrl, getPostContactFormSubmitUrl, getSegmentSlugResponse, postContactFormSubmit, postContactFormSubmitResponse, postContactFormSubmitResponse200 } from '@/src/services/api'
import customFetch from '@/src/services/custom-fetch'
import { PostContactFormSubmitBody } from '@/src/services/model'

const talkToUsFormSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(1, 'Telefone inválido'),
  message: z.string().optional(),
})

type TalkToUsFormData = z.infer<typeof talkToUsFormSchema>

export function TalkToUsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TalkToUsFormData>({
    resolver: zodResolver(talkToUsFormSchema),
  })

  const onSubmit = async (data: TalkToUsFormData) => {
    try {
      setIsSubmitting(true)
      setSubmitError(null)
      
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('phone', data.phone)
      formData.append('message', data.message || '')
      formData.append('tag', 'Fale Conosco')

      await customFetch<postContactFormSubmitResponse>(getPostContactFormSubmitUrl(), {
        method: 'POST',
        body: formData,
      })

    } catch (error) {
      setSubmitError('Ocorreu um erro ao enviar o formulário.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-6 pt-16 pb-16 lg:px-8">
      <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-500/10 text-green-500 rounded-md">
            Mensagem enviada com sucesso! Entraremos em contato em breve.
          </div>
        )}

        {submitError && (
          <div className="mb-6 p-4 bg-red-500/10 text-red-500 rounded-md">
            {submitError}
          </div>
        )}

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="name" className="block text-sm/6 font-semibold text-white">
              Nome*
            </label>
            <div className="mt-2.5">
              <input
                {...register('name')}
                type="text"
                autoComplete="name"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm/6 font-semibold text-white">
              Email*
            </label>
            <div className="mt-2.5">
              <input
                {...register('email')}
                type="email"
                autoComplete="email"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="phone" className="block text-sm/6 font-semibold text-white">
              Telefone*
            </label>
            <div className="mt-2.5">
              <input
                {...register('phone')}
                type="tel"
                autoComplete="tel"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm/6 font-semibold text-white">
              Mensagem
            </label>
            <div className="mt-2.5">
              <textarea
                {...register('message')}
                rows={4}
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-x-2 rounded-md bg-[#f5d22c] text-black px-4 py-2.5 font-bold font-space-mono text-sm hover:bg-[#f5d22c]/80 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
            <ArrowRightIcon className="size-4" />
          </button>
        </div>
      </div>
    </form>
  )
}