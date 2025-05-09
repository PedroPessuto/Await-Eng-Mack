// File: app/painel/cargos/[id]/info/page.tsx
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, X } from 'lucide-react'
import { Role } from '@/lib/models/Role'
import { Category } from '@/lib/models/Category'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface InfoFormProps {
  section: string
  id: string
  role: Role
  categories: Category[]
  error?: string
}

// Schema de validação
const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().max(500).optional(),
  categories: z.array(z.string()).optional(),
})

type FormData = z.infer<typeof formSchema>

export function InfoForm({ section, id, role, categories, error }: InfoFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: role.name ?? '',
      description: (role as any).description ?? '',
      categories: role.categories?.map(cat => cat.id) ?? [],
    },
  })

  function onSubmit(data: FormData) {
    console.log('Payload enviado:', data)
    // Aqui você pode chamar seu endpoint ou Server Action
  }

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Nome do Cargo */}
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

          {/* Descrição */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input placeholder="Digite a descrição do cargo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Categorias (Dual List) */}
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => {
              const selectedIds = field.value || []
              return (
                <FormItem>
                  <FormLabel>Categorias</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-2 gap-6 mt-2">
                      {/* Selecionadas */}
                      <div>
                        <h3 className="text-sm font-medium mb-2">Selecionadas</h3>
                        <div className="space-y-2">
                          {categories
                            .filter(cat => selectedIds.includes(cat.id))
                            .map(cat => (
                              <div
                                key={cat.id}
                                className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded"
                              >
                                <span className='text-sm'>{cat.name}</span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    field.onChange(
                                      selectedIds.filter(id => id !== cat.id)
                                    )
                                  }
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Disponíveis */}
                      <div>
                        <h3 className="text-sm font-medium mb-2">Outras</h3>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {categories
                            .filter(cat => !selectedIds.includes(cat.id))
                            .map(cat => (
                              <div
                                key={cat.id}
                                className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded"
                              >
                                <span>{cat.name}</span>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={() =>
                                    field.onChange([...selectedIds, cat.id])
                                  }
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                        </div>

                        {/* Botão para criar nova categoria */}
                        {/* <div className="mt-4 flex">
                          <Input
                            placeholder="Nova permissão..."
                            className="flex-1"
                          />
                          <Button className="ml-2" type="button">
                            +
                          </Button>
                        </div> */}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <Button type="submit">Salvar Alterações</Button>
        </form>
      </Form>
    </section>
  )
}
