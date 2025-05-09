'use server'

import { Button } from '@/components/ui/button'

interface ButtonsProps {
  section: string
}

export async function Buttons({ section }: ButtonsProps) {
  return (
    <>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-end">
        {section === 'visao-geral' && (
          <Button>
            <span>Criar Novo Cargo</span>
          </Button>
        )}
        {section === 'categorias' && (
          <Button>
            <span>Criar Nova Categoria</span>
          </Button>
        )}
      </div>
    </>
  )
}
