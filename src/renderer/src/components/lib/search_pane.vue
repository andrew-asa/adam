<template>
    <el-input v-model="searchText" :placeholder="placeholder" @keyup.enter.native="search" class="search-input"
        suffix-icon="search" ref="searchInputRef">
        <template #suffix>
            <el-icon>
                <Close v-show="searchText" @click="clearSearch" />
            </el-icon>
        </template>
    </el-input>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';
import { search_pane_props } from './search_pane'
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
const searchInputRef = ref<HTMLElement | null>(null)

onMounted(() => {
    // console.log('事件加载1');
    // @ts-ignore
    let $searchIcon = searchInputRef.value.input.parentElement.querySelectorAll("i")[1]
    if ($searchIcon) {
        $searchIcon.addEventListener('click', search)
        $searchIcon.classList.add("search-icon")
    }
    // console.log(searchInputRef.value)
})
onBeforeUnmount(() => {
    // console.log('事件卸载1');
    // @ts-ignore
    let $searchIcon = searchInputRef.value.input.parentElement.querySelectorAll("i")[1]
    if ($searchIcon) {
        $searchIcon.removeEventListener('click', search)
    }
})
</script>
<style scoped>
.search-input {
    width: calc(v-bind('width'));
}
</style>