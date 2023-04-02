<template>
    <el-input v-model="searchText" :placeholder="placeholder" @keyup.enter.native="search" class="search-input"
        suffix-icon="search" ref="searchInput">
        <template #suffix>
            <el-icon>
                <Close v-show="searchText" @click="clearSearch" />
            </el-icon>
        </template>
    </el-input>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {search_pane_props } from './search_pane'
const props = defineProps(search_pane_props)
const emit = defineEmits(['search', 'clear'])
const searchText = ref(props.input)
const search = () => {
    emit('search', searchText.value)
}
const clearSearch = () => {
    searchText.value = ''
    emit("clear")
}
onMounted(() => {
    
})
</script>
<style scoped>
.search-input {
    width: calc(v-bind('width'));
}
</style>