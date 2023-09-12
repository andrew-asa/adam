<template>
  <span class="svg-icon" :style="{ color, width, height }" v-html="html" :title="title"></span>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { icons } from './svgicon'
export default defineComponent({
  name: 'svg-icon',
  props: {
    name: String,
    title: String,
    color: String,
    width: String,
    height: String,
  },
  setup(props) {
    const html = computed(() => {
      const name = props.name
      if (name && name.length < 30 && icons[name]) {
        return icons[name].value || name
      } else {
        return name
      }
    })

    return { html }
  }
})
</script>

<style scoped>
.svg-icon {
  /* width: 18px;
  height: 18px;
  display: inline-block;
  text-align: center;
  vertical-align: middle; */
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.svg-icon ::v-deep(svg) {
  width: 100%;
  height: 100%;
  display: inline-block;
}
</style>
