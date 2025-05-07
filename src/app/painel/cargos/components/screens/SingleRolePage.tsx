import { H1 } from '@/components/typography/H1'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Home, Pencil, Trash } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils/cn'
import { ChevronRight } from 'lucide-react'
import { Role } from '@/lib/models/Role'
import { Button } from '@/components/ui/button'

interface SingleRolePageProps {
  section: string
  id: string
  role: Role
}

export function SingleRolePage({ section, id, role }: SingleRolePageProps) {
  return (
    <>
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
                {/* <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/painel" className="flex gap-2 items-center" >
                    <LayoutGrid className="w-4 hover:text-foreground transition-colors" />
                    Painel
                  </BreadcrumbLink>
                </BreadcrumbItem> */}
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-primary">
                    Cargos
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-primary">
                    {role.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* <div className="flex gap-2 text-gray-500 items-center text-sm">
              <Settings className="size-5" />
            </div> */}
          </div>

          <div className="flex w-full flex-col items-center justify-between gap-4 bg-white md:flex-row md:gap-0">
            <div className="w-full space-y-2">
              <H1>{role.name}</H1>
              <h2 className="line-clamp-3 text-base text-muted-foreground md:line-clamp-2">
                CRUD de Cargos
              </h2>
            </div>

            <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-end">
              <Button>
                <Pencil />
                <span>Editar</span>
              </Button>
              <Button variant="destructive">
                <Trash />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center rounded-sm border-1 bg-white p-2">
        <div className="flex items-start overflow-x-auto">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <div
                  className={`py-1.5 ${(section === 'visao-geral' || section === 'membros') && 'border-primary border-b-2'}`}
                >
                    <NavigationMenuLink
                    href="/painel/cargos/"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        `${(section === 'visao-geral' || section === 'membros') && 'bg-primary/10 hover:bg-primary/10 focus:bg-primary/10'}`
                      )}
                    >
                      Informações
                    </NavigationMenuLink>
                </div>
              </NavigationMenuItem>
              <div className="m-2 inline-block w-0.5 self-stretch bg-neutral-200" />
              <NavigationMenuItem>
                <div
                  className={`py-1.5 ${section === 'categorias' && 'border-primary border-b-2'}`}
                >
                    <NavigationMenuLink
                    href="/painel/cargos/categorias"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        `${section === 'categorias' && 'bg-primary/10 hover:bg-primary/10 focus:bg-primary/10'}`
                      )}
                    >
                      Permissões
                    </NavigationMenuLink>
                </div>
              </NavigationMenuItem>
              <div className="m-2 inline-block w-0.5 self-stretch bg-neutral-200" />
              <NavigationMenuItem>
                <div
                  className={`py-1.5 ${section === 'atividades' && 'border-primary border-b-2'}`}
                >
                    <NavigationMenuLink
                    href="/painel/cargos/atividades" 
                      className={cn(
                        navigationMenuTriggerStyle(),
                        `${section === 'atividades' && 'bg-primary/10 hover:bg-primary/10 focus:bg-primary/10'}`
                      )}
                    >
                      Campos Personalizados
                    </NavigationMenuLink>
                </div>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <span className="block sm:hidden">
          <ChevronRight />
        </span>
      </div>
      </header>

      <section>
        dada
      </section>
    </>
  )
}