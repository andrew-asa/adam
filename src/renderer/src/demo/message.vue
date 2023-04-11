<template>
  <context-menu name="app_action">
    <context-menu-item @click="showMainWindow"> 主界面 </context-menu-item>
    <context-menu-submenu :label="'开发'" divider>
      <context-menu-item @click="showConsole">控制台</context-menu-item>
      <context-menu-item @click="openInBrowser">浏览器中打开</context-menu-item>
    </context-menu-submenu>
    <context-menu-item> 隐藏 </context-menu-item>
  </context-menu>
  <div v-contextmenu="{ name: 'app_action' }" class="m-click">右键</div>
</template>
  
<script lang="ts">

import { inject } from 'vue'
import ContextMenu from '@renderer/components/lib/contextmenu/ContextMenu.vue'
import ContextMenuItem from '@renderer/components/lib/contextmenu/ContextMenuItem.vue'
import ContextMenuSubmenu from '@renderer/components/lib/contextmenu/ContextMenuSubmenu.vue'
import AppController from '@renderer/utils/app/appcontroller'
import { ctx } from '@/renderer/src/startup/ctx_starter.js'
export default {
  name: 'message',
  setup() {
    const emitContext = inject('emitContext') as (event: Event, dataId: Record<string, unknown>) => void



    function openContextMenu(e: any) {
      emitContext(e, { name: 'app_action' })
    }


    return { openContextMenu }
  },
  methods: {
    showMainWindow() {
      console.log('打开主界面');
    },
    showConsole() {
      console.log('打开控制台');
      ctx.app.controller.openConsole();
    },
    openInBrowser() {
      ctx.app.controller.openInBrowser();
    }
  }
}
</script>
<style  scoped>
.m-click {
  width: 400px;
  height: 100px;
  background-color: rgb(235, 236, 231);
}
</style>
