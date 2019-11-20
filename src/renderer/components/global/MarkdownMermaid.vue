/**
 * @filename: MarkdownMermaid.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/11/18 18:28:19 星期一
 */

<template>

  <div class="mermaid" ref="mermaid" v-html="renderContent"></div>

</template>

<script>
// mermaid
import mermaid from 'mermaid'

export default {
  name: 'ns-markdown-mermaid',
  components: {},
  mixins: [],
  watch: {},
  props: {
    // 传递文本
    graphDefinition: {
      type: String,
      default: `graph LR
    A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]`
    }
  },
  data () {
    return {
      renderContent: ''
    }
  },
  computed: {},
  methods: {
    // 渲染
    renderMermaid () {
      const { graphDefinition } = this
      mermaid.render('graphDiv', graphDefinition, (html) => {
        this.renderContent = html
      })
    }
  },
  filters: {},
  created () {},
  mounted () {
    mermaid.initialize({ startOnLoad: false })
    this.renderMermaid()
  }
}
</script>

<style lang="scss" scoped>
.mermaid {
}
</style>
