'use server'

import { Button } from '@/components/ui/button'

interface ButtonsProps {
  section: string
}

export async function Buttons({ section }: ButtonsProps) {
  return (
    <>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-end">
        {section === 'cargos' && (
          <Button>
            <span>Criar Novo Cargo</span>
          </Button>
        )}
      </div>
    </>
  )
}
