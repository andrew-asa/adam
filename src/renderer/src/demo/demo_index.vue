<template>
    <search-pane @search="search" @clear="clearSearch"></search-pane>
    <div>
        <el-button link v-for="link in showLinks" type="success" @click="go(link)">{{ link.name }}</el-button>
    </div>
</template>
<script setup lang="ts">

import router from '@renderer/router';
import SearchPane from '@renderer/components/lib/search_pane.vue';
import { ref } from 'vue'
import _ from "lodash"
const links: any = []
const ls: any = []
const routes = router.getRoutes()
for (let i = 0; i < routes.length; ++i) {
    var r = routes[i]
    var item = {
        name: r.name || "",
        path: r.path || ""
    }
    links.push(item)
    ls.push(item)
}
const showLinks = ref(ls)

function go(link) {
    // console.log(link.name)
    router.push(link.path)
}
const search = (searchText) => {

    showLinks.value = _.filter(links, item => {
        return _.includes(_.toLower(item.name), _.toLower(searchText))
    })
}
const clearSearch = () => {
    showLinks.value = []
    links.forEach(element => {
        showLinks.value.push(element)
    });
}

</script>
<style scoped></style>