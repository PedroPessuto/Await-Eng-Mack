// File: src/app/painel/cargos/[id]/(sections)/PermissionForm.tsx
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// Permission model
interface Permission {
  id: string
  name: string
}

interface PermissionFormProps {
  section: string
  id: string
  rolePermissions?: string[]
  allPermissions?: Permission[]
}

// Validation schema
const permissionSchema = z.object({
  permissions: z.array(z.string()).optional(),
})
type FormData = z.infer<typeof permissionSchema>

export function PermissionForm({ section, id, rolePermissions = [], allPermissions = [] }: PermissionFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(permissionSchema),
    defaultValues: {
      permissions: rolePermissions,
    },
  })

  function onSubmit(values: FormData) {
    console.log('Payload Permissions:', values)
    // TODO: call API or Server Action to save permissions
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        {/* Permissões (Dual List) */}
        <FormField
          control={form.control}
          name="permissions"
          render={({ field }) => {
            const selectedIds: string[] = Array.isArray(field.value) ? field.value : []
            return (
              <FormItem>
                <FormLabel>Permissões</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-2 gap-6 mt-2">
                    {/* Selecionadas */}
                    <div>
                      <h3 className="text-sm font-medium mb-2">Selecionadas</h3>
                      <div className="space-y-2">
                        {allPermissions
                          .filter(p => selectedIds.includes(p.id))
                          .map(p => (
                            <div
                              key={p.id}
                              className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded"
                            >
                              <span className="text-sm">{p.name}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  field.onChange(
                                    selectedIds.filter(pid => pid !== p.id)
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
                      <h3 className="text-sm font-medium mb-2">Disponíveis</h3>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {allPermissions
                          .filter(p => !selectedIds.includes(p.id))
                          .map(p => (
                            <div
                              key={p.id}
                              className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded"
                            >
                              <span>{p.name}</span>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  field.onChange([...selectedIds, p.id])
                                }
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                      </div>
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
  )
}
