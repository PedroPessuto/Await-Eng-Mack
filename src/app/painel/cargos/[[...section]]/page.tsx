'use server'

import { notFound } from 'next/navigation'
import { Header } from '../components/Header/Header'
import { Overview } from './(screens)/OverviewView'
import { SingleRolePage } from './(screens)/SingleRoleView/SingleRolePage'
import { randomUUID } from 'crypto'
import { CategoriesView } from './(screens)/CategoriesView/CategoriesView'

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
      description: "",
      categories: [
        {
          id: "3bc69a18-ae0f-4ba2-bf1f-84ab4b856488",
          name: 'Global',
        },
        {
          id: "3bc69a18-ae0f-4ba2-b22f-84ab4b856488",
          name: 'Caixa',
        }
      ],
    }

    const rawSecond =  section?.[1] ? section[1] : 'informacoes'

    return (
      <div className="h-full space-y-6 bg-bg-theme p-4 md:p-8">
        <SingleRolePage section={rawSecond} id={id} role={role}/>
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
            {tab === 'categorias' && <CategoriesView />}
            {/* {tab === 'atividades' && 'Atividades'} */}
          </section>
        </>
        )
      }
      
    </div>
  )
}
