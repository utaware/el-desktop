<!--
 * @Description: fileheader
 * @version: 1.0.0
 * @Author: utaware
 * @Date: 2019-08-14 18:46:22
 * @LastEditors: utaware
 * @LastEditTime: 2019-12-13 18:00:10
 -->

<template>
  <!-- 桌面 -->
  <div class="desktop-page" :style="styles">
    <!-- 菜单列表 -->
    <ul class="icon-list">
      
      <router-link class="icon-item"
        v-for="(item, index) of iconList"
        tag="li"
        :key="index"
        :to="item.to">

        <img class="icon-image" :src="item.src" :alt="item.name">

        <p class="icon-text">{{ item.text }}</p>
      
      </router-link>

    </ul>

  </div>

</template>

<script>
// iconList
import iconList from './data/icon'

export default {
  name: 'ns-desktop-page',
  components: {},
  mixins: [],
  watch: {},
  props: {},
  data () {
    return {
      iconList,
      // 样式
      styles: {}
    }
  },
  computed: {},
  methods: {
    // 图标点击
    handlerClick (route) {
      this.$router.push({ name: route })
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
  padding: 2rem;
  // 图标列表
  .icon-list {
    margin-top: 0;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
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
        box-shadow: 0px 5px 6px rgb(160,160,160);
        background: linear-gradient(60deg,rgba(250,250,250,1) 25%,rgba(210,210,210,1));
      }
    }
  }
}
</style>