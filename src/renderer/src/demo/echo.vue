
<template>
    <div>
        <el-input type="textarea" rows="1" v-model="text" placeholder="输入问题" class="question-input-pane"
            ref="questionInput2" v-auto-h></el-input>
        <el-button type="success" @click="retype">打印</el-button>
    </div>
    <HtmlTypeContent class="type-content" :showCursor="showCursor" ref="typeContent" :content="text"></HtmlTypeContent>
</template>
<script lang="ts">
import HtmlTypeContent from '@renderer/components/lib/vuetype/HtmlTypeContent.vue';
import { textAreaAutoHeight } from '@renderer/utils/directives/elements_plus_directives';
import { ref } from 'vue';
export default {
    props: {

    },
    directives: {
        // 指令名
        autoH: textAreaAutoHeight
    },
    components: {
        HtmlTypeContent
    },
    setup(props) {
        const showCursor = ref(true);
        const text = ref('这是一段markdown文本');
        return {
            showCursor, text
        }
    },
    methods: {
        retype() {
            // console.log(`重新打印 ${this.text}`)
            this.$refs.typeContent.type(this.text)
        }
    }
}
</script>
<style scoped>
.question-input-pane {
    width: 300px
}

.type-content {
    width: 300px;
}
</style>
  