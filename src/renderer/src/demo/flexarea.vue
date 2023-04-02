<template>
    <div class="question-input-pane">
        <el-input type="textarea" rows="1" v-model="inputValue" placeholder="输入问题" ref="questionInput2" v-auto-h></el-input>
    </div>
</template>
<script  lang="ts">
import { textAreaAutoHeight } from '@renderer/utils/directives/elements_plus_directives';
import { defineComponent, ref } from 'vue';
export default {
    data() {
        return {
            inputValue: ""
        }
    },
    directives: {
        // 指令名
        autoH: textAreaAutoHeight
    },
}
</script>
<style scoped>
.question-input-pane {
    width: 300px
}
</style>