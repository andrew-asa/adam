<template>
    <div class="container">
        <div class="markdown-body" v-html="markdownContent" ref="contentRef">

        </div>
        <div v-show="showCursor" class="cursor"></div>
    </div>
</template>
<script lang="ts">
import { reactive, ref } from 'vue';
import markdownRender from '@renderer/utils/markdown_it_utils';
import { getLastTextNode } from '@renderer/utils/dom_utils';
// import '@renderer/assets/css/github-markdown-dark.css';
export default {
    props: {
        content: {
            type: String,
            required: true,
        },
        showCursor: {
            type: Boolean,
            default: false
        },
        // 打印完是否显示光标
        completeHideCursor: {
            type: Boolean,
            required: false,
            default: false,
        },
        // 打印速度
        typeSpeed: {
            type: Number,
            required: false,
            default: 100,
        }
    },
    components: {

    },
    setup(props) {
        const pos = reactive({ x: 0, y: 0 });
        const contentRef = ref(null);
        const typeContent = ref("")
        const showCursor = ref(props.showCursor);
        const typeTimeId = ref(-1)
        return {
            pos, contentRef, typeContent, showCursor, typeTimeId
        }
    },
    computed: {
        markdownContent() {
            return markdownRender.render(this.typeContent)
        }
    },
    mounted: function () {
        // console.log('加载完成开始打字');
        this.startType();
    },
    updated: function () {
        // console.log('内容更新');
        this.updateCursor();
    },
    methods: {
        /**
         * 隐藏光标
         */
        hideCursor: function () {
            this.showCursor = false;
        },
        startType: function () {
            this.type(this.$props.content)
        },
        /**
         * 重新打字
         */
        type: function (content) {
            if(!content) {
                return;
            }
            const markdown = content;
            this.typeContent = "";
            let index = 0;
            if (this.typeTimeId !== -1) {
                // console.log(`暂停上一个打印任务:${this.typeTimeId}`);
                clearInterval(this.typeTimeId);
            }
            let timeId = setInterval(() => {
                if (index >= markdown.length) {
                    clearInterval(timeId);
                    if (this.$props.completeHideCursor) {
                        this.showCursor = false;
                    }
                    this.typeTimeId = -1
                    return;
                }
                this.typeContent += markdown[index++];
            }, this.$props.typeSpeed);
            this.typeTimeId = timeId
            // console.log(`打印完成:${this.typeTimeId}`);
        },
        updateCursor: function () {
            const contentDom = this.$refs.contentRef;
            const lastText = getLastTextNode(contentDom);
            const textNode = document.createTextNode('\u200b');
            if (lastText) {
                lastText.parentElement.appendChild(textNode);
            } else {
                contentDom.appendChild(textNode);
            }
            // const domRect = contentDom.getBoundingClientRect();
            const range = document.createRange();
            range.setStart(textNode, 0);
            range.setEnd(textNode, 0);
            const rect = range.getBoundingClientRect();
            // this.pos.x = rect.left - domRect.left;
            // this.pos.y = rect.top - domRect.top; 
            this.pos.x = rect.left;
            this.pos.y = rect.top;
            textNode.remove()
        }
    }
}
</script>
<style scoped>
.markdown-body {
    background: inherit;
    /* line-height: 2; */
    /* font-family: 'Roboto Mono'; */
}

.container {
    position: inherit;
    /* position: absolute; */
}

.cursor {
    content: '';
    content: '';
    position: absolute;
    width: 10px;
    height: 16px;
    background: #d5d9da;
    animation: toggle 0.6s infinite;
    opacity: 0;
    transform: translateY(3px);
    left: calc(v-bind('pos.x') * 1px);
    top: calc(v-bind('pos.y') * 1px);
}

@keyframes toggle {
    30% {
        opacity: 1;
    }
}
</style>
  