/**
 * @filename: Mermaid.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/11/18 18:28:19 星期一
 */

<template>

  <div class="wrapper-mermaid" ref="mermaid">

    <div class="mermaid" v-html="renderContent"></div>

  </div>

</template>

<script>
// mermaid
import mermaid from 'mermaid'

export default {
  name: 'ns-mermaid',
  components: {},
  mixins: [],
  watch: {},
  props: {
    // 接受的文本内容
    content: {
      type: String,
      defalt: ''
    },
    // 参数列表
    params: {
      type: Array,
      default: () => []
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
      const { content } = this
      mermaid.render('graphDiv', content, (html) => {
        this.renderContent = html
      })
    }
  },
  filters: {},
  created () {},
  mounted () {
    // https://github.com/mermaid-js/mermaid/blob/master/src/mermaidAPI.js 配置列表
    mermaid.initialize({
      theme: 'forest', // default(紫色), forest(绿色), dark(蓝紫) or neutral(灰色)
      startOnLoad: false
    })
    this.renderMermaid()
  }
}
</script>

<style lang="scss" scoped>
.wrapper-mermaid {
}
</style>
