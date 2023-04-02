<template>
    <context-menu>
      <context-menu-submenu :label="'View'">
        <context-menu-item disabled> Icon </context-menu-item>
        <context-menu-item> List </context-menu-item>
        <context-menu-item> Detailed information </context-menu-item>
      </context-menu-submenu>
      <context-menu-submenu :label="'Sort by'">
        <context-menu-item> Name </context-menu-item>
        <context-menu-item> Date </context-menu-item>
        <context-menu-item> Type </context-menu-item>
        <context-menu-item> Size </context-menu-item>
        <context-menu-item disabled> Duration </context-menu-item>
      </context-menu-submenu>
      <context-menu-item @click="refresh" :divider="true"> Refresh </context-menu-item>
      <context-menu-item @itemClickHandle="itemClickEvent" :divider="true"> Stop </context-menu-item>
      <context-menu-submenu :label="'Custom'" divider>
        <context-menu-item> Secondary menu </context-menu-item>
        <context-menu-submenu :label="'Multi level menu'">
          <context-menu-item>Three level menu</context-menu-item>
          <context-menu-item>Nested menu</context-menu-item>
        </context-menu-submenu>
      </context-menu-submenu>
      <context-menu-submenu :label="'New'" divider>
        <context-menu-item>New file</context-menu-item>
        <context-menu-item>New folder</context-menu-item>
        <context-menu-item>Shortcut</context-menu-item>
      </context-menu-submenu>
      <context-menu-item :disabled="true">Properties</context-menu-item>
    </context-menu>
  
    <div v-contextmenu="{id: '123'}">Right click on area {id: '123'}</div>
    <div v-contextmenu="{id: [1, 2, 3]}">Right click on area { id: [1, 2, 3]}</div>
  </template>
  
  <script lang="ts">
  
  import { inject } from 'vue'
  import ContextMenu from '@renderer/components/lib/contextmenu/ContextMenu.vue'
  import ContextMenuItem from '@renderer/components/lib/contextmenu/ContextMenuItem.vue'
  import ContextMenuSubmenu from '@renderer/components/lib/contextmenu/ContextMenuSubmenu.vue'
  export default {
    name: 'App',
    setup () {
      const emitContext = inject('emitContext') as (event: Event, dataId: Record<string, unknown>) => void
  
      function refresh () {
        alert('refresh')
      }
  
      function openContextMenu (e: any) {
        emitContext(e, { id: [1, 2, 3] })
      }
  
      function itemClickEvent (e: any) {
        console.log('Stop; with id:' + e.id)
      }
  
      return { refresh, itemClickEvent, openContextMenu }
    }
  }
  </script>