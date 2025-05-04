
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  BookOpen,
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  BookText,
  LogOut,
  Home,
} from 'lucide-react';

const AppSidebar = () => {
  const location = useLocation();
  
  const mainNavItems = [
    { title: 'الرئيسية', icon: Home, path: '/' },
    { title: 'لوحة التحكم', icon: LayoutDashboard, path: '/dashboard' },
    { title: 'الكتب', icon: BookOpen, path: '/books' },
    { title: 'الإعارات', icon: Calendar, path: '/borrowings' },
    { title: 'المستخدمين', icon: Users, path: '/users' },
    { title: 'التقييمات', icon: BookText, path: '/reviews' },
  ];
  
  const adminNavItems = [
    { title: 'الإعدادات', icon: Settings, path: '/settings' },
  ];

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="py-6 flex justify-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
            <BookOpen className="h-4 w-4 text-navy-dark" />
          </div>
          <span className="font-bold text-lg text-gold">مكتبة التراث العربي</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>القائمة الرئيسية</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                  >
                    <Link to={item.path} className="flex gap-2 items-center">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>الإدارة</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNavItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                  >
                    <Link to={item.path} className="flex gap-2 items-center">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="p-4">
          <Link 
            to="/login" 
            className="flex items-center gap-2 text-sidebar-foreground/70 hover:text-sidebar-foreground"
          >
            <LogOut className="h-4 w-4" />
            <span>تسجيل الخروج</span>
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
