'use client'

import { AuthContext } from '@/components/providers/AuthProvider/AuthClientProvider'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose  } from '@/components/ui/dialog'
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
import { Category } from '@/lib/models/Category'
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
import { useRouter } from 'next/navigation'

interface DataTableProps {
  columns: ColumnDef<Category>[]
  data: Category[]
  error?: string
}

function CategoriesRoleTable({ columns, data }: DataTableProps) {
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
      <div className="flex flex-col-reverse gap-2 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2 ">
          <Input
            placeholder="Filtrar por categoria"
            value={globalFilter}
            onChange={event => setGlobalFilter(event.target.value)}
            className="w-full sm:min-w-sm lg:min-w-md"
          />
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
                  categoria(s)
                  <ChevronDown />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-[var(--radix-dropdown-menu-content-available-height)]">
              <DropdownMenuLabel>Ações Permitidas</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setRowSelection({})}>
                <Eraser />
                Limpar Seleção
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <Trash2Icon />
                Excluir
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
                <p>Selecione ao menos uma categoria</p>
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
          {table.getFilteredRowModel().rows.length} categoria(s) selecionado(s).
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

interface CategoriesRoleDataTableProps {
  data: Category[]
  error?: string
}

export function CategoriesRoleDataTable({ data, error }: CategoriesRoleDataTableProps) {
  if (error) {
    toast('Erro ao carregar dados', {
      description: error,
    })
  }

  const router = useRouter()

  const columns: ColumnDef<Category>[] = [
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
      id: 'actions',
      header: 'Ações',
      cell: ({ row }) => {
        const { id, name } = row.original

        async function handleDelete() {
          await fetch(`/api/private/categories/roles/${id}`, { method: 'DELETE' })
          router.refresh()
        }

        async function handleRename(newName: string) {
          await fetch(`/api/private/categories/roles/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...row.original, name: newName }),
          })
          router.refresh()
        }

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 p-0">
                <span className="sr-only">Abrir Menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" >
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Dialog>
                  <DialogTrigger asChild>
                    <span>
                      <SquarePen /> Renomear
                    </span>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Renomear Categoria</DialogTitle>
                    </DialogHeader>
                    <input
                      defaultValue={name}
                      className="w-full border p-2 rounded mb-4"
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          handleRename((e.target as HTMLInputElement).value)
                        }
                      }}
                    />
                    <DialogFooter>
                      <Button onClick={() => router.back()}>Cancelar</Button>
                      <Button onClick={() => {
                        const input = document.querySelector<HTMLInputElement>('input')
                        if (input) handleRename(input.value)
                      }}>
                        Salvar
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onSelect={handleDelete}>
                <Trash2 />
                <span>Remover</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return <CategoriesRoleTable columns={columns} data={data} />
}
