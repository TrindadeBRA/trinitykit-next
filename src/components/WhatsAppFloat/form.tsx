'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { twMerge } from "tailwind-merge"
import { useState } from 'react'
import { getPostContactFormSubmitUrl, postContactFormSubmitResponse } from '@/src/services/api'
import { errorToast, successToast } from '@/src/hooks/useToastify'
import customFetch from '@/src/services/custom-fetch'

const whatsAppFormSchema = z.object({
    email: z
        .string()
        .min(1, 'Email é obrigatório')
        .email('Email inválido')
})

type WhatsAppFormData = z.infer<typeof whatsAppFormSchema>

interface WhatsAppFormProps {
    setIsOpen: (isOpen: boolean) => void
}

export function WhatsAppForm({ setIsOpen }: WhatsAppFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<WhatsAppFormData>({
        resolver: zodResolver(whatsAppFormSchema)
    })

    const onSubmit = async (data: WhatsAppFormData) => {
        try {
            setIsSubmitting(true)

            const formData = new FormData()
            formData.append('email', data.email)
            formData.append('tag', 'WhatsApp Widget')
            formData.append('message',
                `
                Página origem: ${window.location.href}
                Email: ${data.email}
                `
            )

            await customFetch<postContactFormSubmitResponse>(getPostContactFormSubmitUrl(), {
                method: 'POST',
                body: formData,
            })

        } catch (e) {
            console.error("Erro ao enviar.", e)
            errorToast("Ocorreu um erro ao enviar.")
            setIsOpen(false)
            setTimeout(() => {
                window.open("https://wa.me/5511999999999", "_blank")
            }, 1000)
        } finally {
            setIsSubmitting(false)
            successToast("Entraremos em contato em breve!")
            reset()
            setIsOpen(false)
            setTimeout(() => {
                window.open("https://wa.me/5511999999999", "_blank")
            }, 1000)
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
                <div>
                    <label htmlFor="email" className="text-xs text-muted-foreground">
                        Seu email para contato:
                    </label>
                    <input
                        id="email"
                        {...register('email')}
                        type="email"
                        autoComplete="email"
                        placeholder="seu@email.com"
                        className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white bg-white! placeholder:text-gray-500 text-black! text-sm"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className={twMerge(
                        "w-full px-4 py-2 rounded-md font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors",
                    )}
                >
                    {isSubmitting ? "Enviando..." : "Chamar no WhatsApp!"}
                </button>
            </div>
        </form>
    )
}