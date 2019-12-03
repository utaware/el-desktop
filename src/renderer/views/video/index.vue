/**
 * @filename: index.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/03 20:26:35 星期二
 */

<template>

  <div class="video-page">

    <xg-player></xg-player>

  </div>

</template>

<script>
// components
import XgPlayer from './package/player.vue'

export default {
  name: 'ns-video-page',
  components: {
    XgPlayer
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

<style lang="scss" scoped>
// 视频相关
.video-page {
  height: 100vh;
  .xg-player {
    // height: 400px;
  }
}
</style>
