/**
 * @filename: NodeCommad.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/08/29 14:05:27 星期四
 */

<template>

  <div class="wrapper-node-commad">

    <p>{{ code }}</p>

  </div>

</template>

<script>

export default {
  name: 'ns-node-commad',
  components: {},
  mixins: [],
  watch: {},
  props: {
    // 执行代码
    code: {
      type: String,
      default: ''
    }
  },
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

<style lang="scss" scoped>
.wrapper-node-commad {
}
</style>
