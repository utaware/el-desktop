/**
 * @filename: index.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/04 16:23:09 星期三
 */

<template>
  <!-- 主页面 -->
  <div class="tool-page">

    <Annie></Annie>
  
  </div>

</template>

<script>
// components
import Annie from './annie/main'

export default {
  name: 'ns-tool-page',
  components: {
    Annie
  },
  mixins: [],
  watch: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  methods: {},
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang="stylus" scoped>
// 包裹容器
.tool-page {

}
</style>
