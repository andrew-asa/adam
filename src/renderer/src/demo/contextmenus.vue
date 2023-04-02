<template>
    <context-menu :name="`demo_show_contextmenus`">
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

    <div v-contextmenu="{ name: 'demo_show_contextmenus' }">Right click on area {id: '123'}</div>

    <div v-contextmenu="{ name: 'demo_show_contextmenus' }">Right click on area { id: [1, 2, 3]}</div>

    <div v-contextmenu="{ name: 'xxx' }">点击此处无效果</div>
    <el-button type="success" @click.stop="openContextMenu"> 手动打开菜单</el-button>
    <el-button type="success" @click.stop="stopOpen"> 无法打开</el-button>
</template>
  
<script lang="ts">

import { inject } from 'vue'

export default {
    name: 'App',
    setup() {
        const emitContext = inject('emitContext') as (event: Event, dataId: Record<string, unknown>) => void

        function refresh() {
            alert('refresh')
        }

        function openContextMenu(e: any) {
            emitContext(e, { name: 'demo_show_contextmenus' })
        }
        function stopOpen(e: any) {
            emitContext(e, { id: '[1, 2, 3]' })
        }

        function itemClickEvent(e: any) {
            console.log('Stop; with id:' + e.id)
        }

        return { refresh, itemClickEvent, openContextMenu, stopOpen }
    }
}
</script>