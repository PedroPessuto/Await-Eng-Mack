'use server'

import { notFound } from 'next/navigation'
import { Header } from '../components/Header/Header'
import { Overview } from '../components/screens/Overview'
import { SingleRolePage } from '../components/screens/SingleRolePage'

interface PageProps {
  params: Promise<{
    section?: string[]
  }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ params, searchParams }: PageProps) {
  const { section } = await params
  const tab = section?.[0] ? section[0] : 'visao-geral'

  const validSections = ['visao-geral', 'categorias', 'atividades']

  if (!validSections.includes(tab)) {
    notFound()
  }
  
  const { id } = await searchParams

  return (
    <div className="h-full space-y-6 bg-bg-theme p-4 md:p-8">
      {
        id && <><SingleRolePage section={tab}/></>
      }
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
