<!--
 * @Description: fileheader
 * @version: 1.0.0
 * @Author: utaware
 * @Date: 2019-08-14 18:46:22
 * @LastEditors: utaware
 * @LastEditTime: 2019-09-02 16:44:39
 -->

<template>

  <div class="desktop-page">

    <ul class="icon-list">
      
      <li class="icon-item"
        v-for="(item, index) of iconList"
        :key="index"
        @click="handlerClick(item.name)">

        <img class="icon-image" :src="item.src" :alt="item.name">

        <p class="icon-text">{{ item.name }}</p>
      
      </li>

    </ul>

  </div>

</template>

<script>
// iconList
import iconList from './data/desktopIcon.js'

export default {
  name: 'ns-desktop-page',
  components: {},
  mixins: [],
  watch: {},
  props: {},
  data () {
    return {
      iconList,
      srcPath: ''
    }
  },
  computed: {},
  methods: {
    // 图标点击
    handlerClick (name) {
      this.$router.push('/docs')
    },
    // 回调处理
    async handleCallback (emitter, selectPath) {
      console.log(emitter, selectPath)
    }
  },
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang="scss" scoped>
// 桌面页
.desktop-page {
  height: 100vh;
  background: url('/static/images/default-bg.jpg') no-repeat center center;
  // 图标列表
  .icon-list {
    margin-top: 3rem;
    display: flex;
    flex-wrap: wrap;
    .icon-item {
      padding: 1rem;
      min-width: 160px;
      flex-basis: 20%;
      text-align: center;
      border-radius: 1rem;
      .icon-image {
        width: 100px;
      }
      .icon-text {
        margin-top: 1rem;
        font-size: 1.2rem;
      }
      &:hover {
        background: rgb(210,210,210);
        box-shadow: 0px 5px 6px rgb(160,160,160);
        background: linear-gradient(60deg,rgba(250,250,250,1) 25%,rgba(210,210,210,1));
      }
    }
  }
}
</style>
