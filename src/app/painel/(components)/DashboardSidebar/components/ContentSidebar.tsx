import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { SidebarMenuSub } from '@/components/ui/sidebar'
import {
  Banknote,
  Bell,
  BookCheck,
  BookOpenText,
  Calendar,
  Crown,
  FileText,
  Home,
  Inbox,
  MessageCircleMore,
  ScrollText,
  Settings,
  Users,
  Users2,
} from 'lucide-react'

const items = [
  {
    groupName: 'Geral',
    items: [
      {
        title: 'Home',
        url: '#',
        icon: Home,
      },
    ],
  },
]

export function ContentSidebar() {
  return (
    <>
      {items.map(group => (
        <SidebarGroup key={group.groupName}>
          <SidebarGroupLabel>{group.groupName}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}

      <SidebarGroup>
        <SidebarGroupLabel>Time</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenuButton asChild>
            <a href="/#">
              <BookOpenText />
              <span>Visão Geral</span>
            </a>
          </SidebarMenuButton>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/painel/membros">
                  <Users />
                  <span>Membros</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/painel/cargos">
                  <Settings />
                  <span>Cargos</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/painel/grupos">
                  <Users2 />
                  <span>Grupos</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/painel/permissoes">
                  <Crown />
                  <span>Permissões</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  )
}
