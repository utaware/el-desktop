/**
 * @filename: DividerLine.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/06 18:24:00 星期五
 */

<template>

  <div class="divider-horizontal"></div>

</template>

<script>
export default {
  name: 'ns-divider-line',
  components: {},
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
// 分割线
.divider-horizontal {
  margin: 1rem 0;
  background-color: #dcdfe6;
  height: 1px;
  border: none;
}
</style>
