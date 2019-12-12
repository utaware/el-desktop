/**
 * @filename: 404.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/12 16:48:37 星期四
 */

<template>

  <WallPaper>

    <div class="flex-container">

      <div class="header">
        
        <h1 class="title">404 - Not found</h1>

        <p class="text">对不起，你要找的这个页面突然不见了。不过，放心，一切都在我的掌控之中，不会跑多远！</p>

      </div>

      <div class="group">

        <span class="item" @click="handleReturnLast">返回</span>

        <span class="item" @click="handleReturnHome">主页</span>

      </div>

    </div>

  </WallPaper>

</template>

<script>
// components
import WallPaper from '@/components/common/theme/WallPaper.vue'

export default {
  name: 'ns-not-found-page',
  components: {
    WallPaper
  },
  mixins: [],
  watch: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  methods: {
    handleReturnHome () {
      this.$router.push('/home')
    },
    handleReturnLast () {
      this.$router.go(-1)
    }
  },
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang="stylus" scoped>
.flex-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 4rem 2rem;
  border-radius: 0.4rem;
  box-shadow: 0 0 10px 1px rgba(0,0,0,.6);
  text-align: center;
  color: #fff;
  .header {
    margin-bottom: 4rem;
    .title {
      margin-bottom: 4rem;
    }
  }
  .group {
    display: inline-block;
    border: 1px solid #fff;
    border-radius: 0.25rem;
    .item {
      display: inline-block;
      height: 2.75rem;
      min-width: 7.5rem;
      line-height: 2.75rem;
      cursor: pointer;
      &:hover {
        background: rgba(255, 255, 255, 0.075);
      }
    }
    .item + .item {
      border-left: 1px solid #fff;
    }
  }
}
</style>
