
'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, X } from 'lucide-react'
import { Role } from '@/lib/models/Role'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Category } from "@/lib/models/Category"

interface SingleRolePageProps {
  section: string
  id: string
  role: Role
}

export function PermissionForm({ section, id, role }: SingleRolePageProps) {

  const formSchema = z.object({
    name: z.string().min(1).max(50),
    description: z.string().max(500).optional(),
    categories: z.string().array().optional(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: role.name ?? "",
      description: role.description ?? "",
      categories: role.categories?.map(cat => cat.id) || [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // recarregar a pagina
    console.log(values)
  }

  return (
    <>
      <section>
       
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome do cargo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Salvar Alteracoes</Button>
          </form>
        </Form>

      </section>
    </>
  )
}