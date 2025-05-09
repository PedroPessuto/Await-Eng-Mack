'use client'

import { AuthContext } from '@/components/providers/AuthProvider/AuthClientProvider'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose  } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { Member } from '@/lib/models/Member'
import { Role } from '@/lib/models/Role'
import {
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  ArrowUpDown,
  ChevronDown,
  Eraser,
  Eye,
  Filter,
  Mail,
  MessageCircleMore,
  MoreHorizontal,
  SquarePen,
  Trash2,
  Trash2Icon,
} from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'
import { use, useState } from 'react'
import { toast } from 'sonner'

interface DataTableProps {
  columns: ColumnDef<Role>[]
  data: Role[]
  error?: string
}

function RolesTable({ columns, data }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
    },
  })

  // Exemplo de uso de AuthContext (caso necessário)
  const { user, handleLogin } = use(AuthContext)
  const handleClick = () =>
    handleLogin({ email: 'teste@gmail.com', password: '1213121121' })

  return (
    <>
      <div className="flex w-full items-center gap-8 bg-amber-300">
        <Button onClick={handleClick}>Logar</Button>
        {user ? user.id : 'Nao tem usuario'}
      </div>

      <div className="flex flex-col-reverse gap-2 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2 ">
          <Input
            placeholder="Filtrar por Usuário ou E-mail"
            value={globalFilter}
            onChange={event => setGlobalFilter(event.target.value)}
            className="w-full sm:min-w-sm lg:min-w-md"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <Button variant="outline">
                  <Filter />
                  <span className="hidden sm:inline">Filtros Avancados</span>
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Opcaoes disponivies</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Query Personalizada</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                disabled={table.getFilteredSelectedRowModel().rows.length === 0}
              >
                <div className="flex items-center gap-2 overflow-x-hidden">
                  Ações para {table.getFilteredSelectedRowModel().rows.length}{' '}
                  cargo(s)
                  <ChevronDown />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-[var(--radix-dropdown-menu-content-available-height)]">
              <DropdownMenuLabel>Ações Permitidas</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <MessageCircleMore />
                Enviar Mensagem
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail />
                Enviar E-mail
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setRowSelection({})}>
                <Eraser />
                Limpar Seleção
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <Trash2Icon />
                Remover
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex justify-end">
                  <Button variant="outline" disabled>
                    Ações <ChevronDown />
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Selecione ao menos um cargo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <div className="w-full rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? 'selected' : undefined}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-2 flex flex-col items-center sm:mt-0 sm:flex-row">
        <div className="flex-1 text-center text-muted-foreground text-sm sm:text-start">
          {table.getFilteredSelectedRowModel().rows.length} de{' '}
          {table.getFilteredRowModel().rows.length} cargo(s) selecionado(s).
        </div>
        <div className="flex flex-col items-center justify-end gap-2 space-x-2 py-4 sm:flex-row">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </>
  )
}

interface RolesDataTableProps {
  data: Role[]
  error?: string
}

export function RolesDataTable({ data, error }: RolesDataTableProps) {
  if (error) {
    toast('Erro ao carregar dados', {
      description: error,
    })
  }

  const columns: ColumnDef<Role>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Selecionar Tudo"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Selecionar Linha"
        />
      ),
    },
   
      // {
      //   accessorKey: 'id',
      //   header: ({ column }) => (
      //     <Button
      //       variant="ghost"
      //       onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      //     >
      //       Id  
      //       <ArrowUpDown className="ml-2 h-4 w-4" />
      //     </Button>
      //   ),
      // },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'categories',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Categorias
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {

        const categories = row.original.categories

        return (
          <div className='flex flex-wrap gap-2'>
            {
              categories.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                    <Badge variant="secondary">{item.name}</Badge>
                  </React.Fragment>
                )
                
              })
            }
          </div>
        )
      }
    },
   
    {
      id: 'actions',
      header: 'Ações',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 p-0">
              <span className="sr-only">Abrir Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/painel/cargos/@${row.original.id}`}>
                <Eye />
                Visualizar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
               <Link href={`/painel/cargos/@${row.original.id}`}>
                  <SquarePen />
                  Editar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" asChild>
              <Dialog>
                <DialogTrigger >
                  <Trash2 />
                  <span>Remover</span>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmação</DialogTitle>
                    <DialogDescription>Tem certeza que deseja excluir este cargo?</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                       <Button variant="outline" onClick={() => {}}>Cancelar</Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={() => {}}>Excluir</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return <RolesTable columns={columns} data={data} />
}
