/**
 * @filename: MarkdownComponents.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/11/30 10:22:41 星期六
 */

<template>

  <div class="wrapper-markdown-components">

    <components 
      :is="componentsName"
      :params="paramsList.propsParams"
      :content="content">

      <slot></slot>

    </components>

  </div>

</template>

<script>
// components
import MarkdownCard from '../mark/Card.vue'
import MarkdownMermaid from '../mark/Mermaid.vue'
import MarkdownCode from '../mark/Code.vue'

export default {
  name: 'ns-markdown-components',
  components: {
    MarkdownCard,
    MarkdownMermaid,
    MarkdownCode
  },
  mixins: [],
  watch: {},
  props: {
    // 文本内容
    content: {
      type: String,
      default: ''
    },
    // 传递参数
    params: {
      type: String,
      default: '',
      validator: (value) => {
        return value.trim().split(' ').length
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    // 参数列表 string => string[]
    paramsList () {
      const result = this.params.trim().split(' ')
      const [ renderName, ...propsParams ] = result
      return { renderName, propsParams }
    },
    componentsName () {
      return 'markdown-' + this.paramsList.renderName
    }
  },
  methods: {},
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang="scss" scoped>

</style>
