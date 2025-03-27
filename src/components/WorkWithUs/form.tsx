'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRightIcon } from 'lucide-react'
import { PhotoIcon } from '@heroicons/react/24/outline'

const workWithUsFormSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  linkedin: z.string().url('URL do Linkedin inválida'),
  resume: z.instanceof(FileList)
    .refine((files) => files.length > 0, 'Currículo é obrigatório')
    .refine(
      (files) => files[0]?.size <= 10 * 1024 * 1024,
      'Arquivo deve ter no máximo 10MB'
    )
    .refine(
      (files) => {
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        return validTypes.includes(files[0]?.type)
      },
      'Formato de arquivo inválido. Use PDF, DOC ou DOCX'
    ),
})

type WorkWithUsFormData = z.infer<typeof workWithUsFormSchema>

export function WorkWithUsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkWithUsFormData>({
    resolver: zodResolver(workWithUsFormSchema),
  })

  const onSubmit = async (data: WorkWithUsFormData) => {
    // Handle form submission here
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-24 sm:pb-32 lg:px-8">
      <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="name" className="block text-sm/6 font-semibold text-gray-900">
              Nome
            </label>
            <div className="mt-2.5">
              <input
                {...register('name')}
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
              Email
            </label>
            <div className="mt-2.5">
              <input
                {...register('email')}
                type="email"
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="phone" className="block text-sm/6 font-semibold text-gray-900">
              Telefone
            </label>
            <div className="mt-2.5">
              <input
                {...register('phone')}
                type="tel"
                autoComplete="tel"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="linkedin" className="block text-sm/6 font-semibold text-gray-900">
              Linkedin
            </label>
            <div className="mt-2.5">
              <input
                {...register('linkedin')}
                type="url"
                autoComplete="url"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
              {errors.linkedin && (
                <p className="mt-1 text-sm text-red-600">{errors.linkedin.message}</p>
              )}
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="resume" className="block text-sm/6 font-medium text-gray-900">
              Currículo
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                <div className="mt-4 flex text-sm/6 text-gray-600">
                  <label
                    htmlFor="resume"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                  >
                    <span>Faça o upload do seu currículo</span>
                    <input
                      {...register('resume')}
                      id="resume"
                      type="file"
                      className="sr-only"
                      accept=".pdf,.doc,.docx"
                    />
                  </label>
                  <p className="pl-1">ou arraste e solte</p>
                </div>
                <p className="text-xs/5 text-gray-600">PDF, DOC, DOCX até 10MB</p>
                {errors.resume && (
                  <p className="mt-1 text-sm text-red-600">{errors.resume.message}</p>
                )}
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
  )
}