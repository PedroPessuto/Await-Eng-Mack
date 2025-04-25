'use server'

import { notFound } from 'next/navigation'
import { Header } from '../components/Header/Header'
import { Overview } from '../components/screens/Overview'

interface PageProps {
  params: Promise<{
    section?: string[]
  }>
}

export default async function Page({ params }: PageProps) {
  const { section } = await params
  const tab = section?.[0] ? section[0] : 'visao-geral'

  const validSections = ['visao-geral', 'atividades', 'cargos']

  if (!validSections.includes(tab)) {
    notFound()
  }

  return (
    <div className="h-full space-y-6 bg-bg-theme p-4 md:p-8">
      <Header section={tab} />

      <section>
        {tab === 'visao-geral' && <Overview />}
        {tab === 'atividades' && 'Atividades'}
        {tab === 'cargos' && 'Cargos'}
      </section>
    </div>
  )
}
