/**
 * @filename: player.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/03 21:48:33 星期二
 */

<template>

  <div class="wrapper-player">
    <!-- 西瓜播放器 -->
    <div class="xg-player" id="xgplayer"></div>

  </div>

</template>

<script>
// import
import Player from 'xgplayer'

export default {
  name: 'ns-player',
  components: {},
  mixins: [],
  watch: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  methods: {
    // 初始化播放器
    initPlayer () {
      this.player = new Player({
        id: 'xgplayer',
        url: '/static/test.mp4',
        autoplay: false,
        volume: 0.3,
        poster: '/static/post.png',
        playsinline: true
      })
    }
  },
  filters: {},
  created () {},
  mounted () {
    this.initPlayer()
  }
}
</script>

<style lang="scss" scoped>
.wrapper-player {
  .xg-player {
    margin: 5rem auto;
  }
}
</style>
