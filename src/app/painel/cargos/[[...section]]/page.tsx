'use server'

import { notFound } from 'next/navigation'
import { Header } from '../components/Header/Header'
import { Overview } from '../components/screens/Overview'
import { SingleRolePage } from '../components/screens/SingleRolePage'
import { randomUUID } from 'crypto'

interface PageProps {
  params: Promise<{
    section?: string[]
  }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ params, searchParams }: PageProps) {
  const { section } = await params
  const rawFirst = section?.[0] ? section[0] : 'visao-geral'
  const first = decodeURIComponent(rawFirst)

  if (first?.startsWith('@')) {
    
    const id = first.slice(1)

    // TODO VERIFICAR SE EXISTE O ID EH VALIDO, EH AUTENTICADO ETC

    const role =  {
      id: "3bc69a18-ae0f-4ba2-bf1f-84ab4b8564d9",
      name: 'Administracao',
      categories: [
        {
          id: "3bc69a18-ae0f-4ba2-bf1f-84ab4b8564d9",
          name: 'Global',
        },
        {
          id: "e03a8189-2f6f-466d-86c5-d4ba5c25c05d",
          name: 'Caixa',
        }
      ],
    }

    return (
      <div className="h-full space-y-6 bg-bg-theme p-4 md:p-8">
        <SingleRolePage section={first} id={id} role={role}/>
      </div>
    )

  }

  const validSections = ['visao-geral', 'categorias', 'atividades']
  const tab = first ?? 'visao-geral'
  if (!validSections.includes(tab)) {
    notFound()
  }
  
  const { id } = await searchParams

  return (
    <div className="h-full space-y-6 bg-bg-theme p-4 md:p-8">
      {
        !id && (
        <>
          <Header section={tab} />
          <section>
            {tab === 'visao-geral' && <Overview />}
            {tab === 'categorias' && 'Categorias'}
            {tab === 'atividades' && 'Atividades'}
          </section>
        </>
        )
      }
      
    </div>
  )
}
