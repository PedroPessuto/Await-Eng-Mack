// File: src/components/painel/Buttons.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface ButtonsProps {
  section: string
}

export function Buttons({ section }: ButtonsProps) {
  const router = useRouter()

  // Schema and form for Cargos
  const cargoSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório').max(100),
    description: z.string().optional(),
  })
  type CargoFormData = z.infer<typeof cargoSchema>

  const {
    register: registerCargo,
    handleSubmit: handleSubmitCargo,
    reset: resetCargo,
    formState: { errors: errorsCargo },
  } = useForm<CargoFormData>({
    resolver: zodResolver(cargoSchema),
  })

  const onSubmitCargo = async (values: CargoFormData) => {

    
  }

  // Schema and form for Categorias
  const categorySchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório').max(100),
  })
  type CategoryFormData = z.infer<typeof categorySchema>

  const {
    register: registerCategory,
    handleSubmit: handleSubmitCategory,
    reset: resetCategory,
    formState: { errors: errorsCategory },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  })

  const onSubmitCategory = async (values: CategoryFormData) => {
    
  }

  return (
    <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-end">
      {section === 'visao-geral' && (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Adicionar Cargo</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Cargo</DialogTitle>
              <DialogDescription>Preencha os dados do novo cargo.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitCargo(onSubmitCargo)} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="cargo-name" className="block text-sm font-medium">Nome</label>
                <input id="cargo-name" {...registerCargo('name')} className="w-full px-3 py-2 border rounded" />
                {errorsCargo.name && <p className="text-red-600 text-sm">{errorsCargo.name.message}</p>}
              </div>
              <div className="space-y-1">
                <label htmlFor="cargo-description" className="block text-sm font-medium">Descrição</label>
                <textarea id="cargo-description" {...registerCargo('description')} className="w-full px-3 py-2 border rounded" />
                {errorsCargo.description && <p className="text-red-600 text-sm">{errorsCargo.description.message}</p>}
              </div>
              <DialogFooter>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {section === 'categorias' && (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Adicionar Categoria</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Nova Categoria</DialogTitle>
              <DialogDescription>Preencha o nome da nova categoria.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitCategory(onSubmitCategory)} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="category-name" className="block text-sm font-medium">Nome</label>
                <input id="category-name" {...registerCategory('name')} className="w-full px-3 py-2 border rounded" />
                {errorsCategory.name && <p className="text-red-600 text-sm">{errorsCategory.name.message}</p>}
              </div>
              <DialogFooter>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}