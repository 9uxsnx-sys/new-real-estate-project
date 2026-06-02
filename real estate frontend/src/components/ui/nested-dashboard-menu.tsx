"use client";

import { 
  Menubar, 
  MenubarMenu, 
  MenubarTrigger, 
} from "@/components/ui/menubar"; 
 
export default function NestedDashboardMenu() { 
  return ( 
    <Menubar> 
      <MenubarMenu>
        <MenubarTrigger>Home</MenubarTrigger>
      </MenubarMenu>
 
      <MenubarMenu>
        <MenubarTrigger>Projects</MenubarTrigger>
      </MenubarMenu>
 
      <MenubarMenu>
        <MenubarTrigger>Properties</MenubarTrigger>
      </MenubarMenu>
 
      <MenubarMenu>
        <MenubarTrigger>Language</MenubarTrigger>
      </MenubarMenu>
 
      <MenubarMenu>
        <MenubarTrigger>Theme</MenubarTrigger>
      </MenubarMenu>
    </Menubar> 
  ); 
}