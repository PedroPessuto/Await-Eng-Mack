'use server'

import { headers } from 'next/headers'

import { H1 } from '@/components/typography/H1'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Home } from 'lucide-react'
import { Buttons } from './Buttons'
import { Navbar } from './Navbar'

interface HeaderProps {
  section: string
}

function humanize(segment: string) {
  // IDs numéricos viram “#123”
  if (/^\d+$/.test(segment)) return `#${segment}`
  // “meu-item” → “Meu Item”
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

export async function Header({ section }: HeaderProps) {

  const headersList = await headers();
  const referer = headersList.get('referer') || '';
  let segments: string[] = []
  try {
    const refererUrl = new URL(referer)
    segments = refererUrl.pathname.split('/').filter(Boolean)
  } catch {
    segments = []
  }

  // 3. Monta array de crumbs: [{ href, label }, ...]
  const crumbs = segments.map((seg, i) => {
    const href = '/' + segments.slice(0, i + 1).join('/')
    return { href, label: humanize(seg) }
  })

  return (
    <header className="flex flex-col gap-4 overflow-x-hidden">
      <div className="flex w-full flex-col space-y-4 rounded-sm border-1 bg-white p-4">
        <div className="flex justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="text-primary">
                <BreadcrumbLink
                  href="/painel"
                  className="flex items-center gap-2 hover:text-primary "
                >
                  <Home className="w-4 brightness-[80%]" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary">
                  Cargos
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex w-full flex-col items-center justify-between gap-4 bg-white md:flex-row md:gap-0">
          <div className="w-full space-y-2">
            <H1>Cargos</H1>
            <h2 className="line-clamp-3 text-base text-muted-foreground md:line-clamp-2">
              CRUD de Cargos
            </h2>
          </div>

          <Buttons section={section} />
        </div>
      </div>

      <Navbar section={section} />
    </header>
  )
}
