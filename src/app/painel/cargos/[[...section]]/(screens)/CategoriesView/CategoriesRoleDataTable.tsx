'use client'

import { AuthContext } from '@/components/providers/AuthProvider/AuthClientProvider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
  MoreHorizontal,
  SquarePen,
  Trash2,
  Trash2Icon,
} from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'
import { useState } from 'react'
import { toast } from 'sonner'

interface DataTableProps {
  columns: ColumnDef<Category>[]
  data: Category[]
  error?: string
}

export function CategoriesRoleTable({ columns, data }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = useState({})

  // Dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState<Row<Category> | null>(null)
  const [newName, setNewName] = useState('')

  // Mock API functions
  const mockDeleteCategory = (id: string) =>
    new Promise<string>(resolve => setTimeout(() => resolve(id), 500))
  const mockBulkDelete = (ids: string[]) =>
    new Promise<string[]>(resolve => setTimeout(() => resolve(ids), 500))
  const mockRenameCategory = (id: string, name: string) =>
    new Promise<{ id: string; name: string }>(resolve =>
      setTimeout(() => resolve({ id, name }), 500)
    )

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
    state: { sorting, columnFilters, globalFilter, rowSelection },
  })

  const handleDeleteClick = (row: Row<Category>) => {
    setSelectedRow(row)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (selectedRow) {
      await mockDeleteCategory(selectedRow.original.id)
      toast(`Categoria "${selectedRow.original.name}" excluída com sucesso`)
    }
    setDeleteDialogOpen(false)
    setSelectedRow(null)
  }

  const handleBulkDeleteClick = () => {
    setBulkDeleteDialogOpen(true)
  }

  const confirmBulkDelete = async () => {
    const ids = table.getFilteredSelectedRowModel().rows.map(r => r.original.id)
    await mockBulkDelete(ids)
    toast(`${ids.length} categorias excluídas`)
    setBulkDeleteDialogOpen(false)
    setRowSelection({})
  }

  const handleEditClick = (row: Row<Category>) => {
    setSelectedRow(row)
    setNewName(row.original.name)
    setEditDialogOpen(true)
  }

  const confirmEdit = async () => {
    if (selectedRow) {
      await mockRenameCategory(selectedRow.original.id, newName)
      toast(`Categoria renomeada para "${newName}`)
    }
    setEditDialogOpen(false)
    setSelectedRow(null)
    setNewName('')
  }

  return (
    <>
      {/* Filtro e ações em massa */}
      <div className="flex flex-col-reverse gap-2 py-4 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="Filtrar por categoria"
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
          className="w-full sm:min-w-sm lg:min-w-md"
        />
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Ações para {table.getFilteredSelectedRowModel().rows.length}{' '}
              categoria(s) <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
            <DropdownMenuLabel>Ações Permitidas</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setRowSelection({})}>
              <Eraser /> Limpar Seleção
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={handleBulkDeleteClick}
            >
              <Trash2Icon /> Excluir Todas
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
      {/* Tabela */}
      <div className="w-full rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(group => (
              <TableRow key={group.id}>
                {group.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() ? 'selected' : undefined}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {cell.column.id === 'actions' ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEditClick(row)}>
                              <SquarePen /> Renomear
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              variant="destructive"
                              onClick={() => handleDeleteClick(row)}
                            >
                              <Trash2 /> Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Paginação */}
      <div className="mt-2 flex flex-col items-center sm:flex-row sm:justify-between">
        <div className="text-sm text-muted-foreground">
          {table.getRowModel().rows.length} de {table.getFilteredRowModel().rows.length} exibidas
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Anterior
          </Button>
          <Button size="sm" variant="outline" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Próximo
          </Button>
        </div>
      </div>
      {/* Dialogs */}
      <Dialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir todas as categorias</DialogTitle>
            <DialogDescription>
              Você realmente deseja excluir todas as categorias selecionadas?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBulkDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmBulkDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir a categoria "{selectedRow?.original.name}"?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Renomear Categoria</DialogTitle>
            <DialogDescription>
              Insira um novo nome para a categoria "{selectedRow?.original.name}".
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input value={newName} onChange={e => setNewName(e.target.value)} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmEdit}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

interface CategoriesRoleDataTableProps {
  data: Category[]
  error?: string
}

export function CategoriesRoleDataTable({ data, error }: CategoriesRoleDataTableProps) {
  if (error) {
    toast('Erro ao carregar dados', { description: error })
  }
  const columns: ColumnDef<Category>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={v => table.toggleAllPageRowsSelected(!!v)}
          aria-label="Selecionar Todos"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={v => row.toggleSelected(!!v)}
          aria-label="Selecionar Linha"
        />
      ),
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Nome <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      id: 'actions',
      header: 'Ações',
      cell: ({ row }) => <CategoriesRoleTable columns={columns} data={data} />,
    },
  ]
  return <CategoriesRoleTable columns={columns} data={data} />
}