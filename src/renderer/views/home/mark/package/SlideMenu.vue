/**
 * @filename: SlideMenu.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/05 14:33:25 星期四
 */

<template>
  <!-- 左侧菜单 -->
  <div class="wrapper-slide-menu">
    <!-- element -->
    <el-menu 
      class="el-menu" 
      default-active="1"
      @select="handleSelect"
      :background-color="backgroundColor"
      :text-color="textColor"
      :active-text-color="activeTextColor"
      :hide-timeout="8000"
      :collapse="isCollapse">
      
      <!-- 折叠按钮 -->
      <el-menu-item index="collapse">
        
        <i :class="menuIsCollapseIconClass"></i>
        
        <span slot="title">{{ menuIsCollapseSpanText }}</span>
      
      </el-menu-item>

      <!-- 设定菜单 -->
      <el-menu-item v-for="(item, index) of menuPannel" :key="index" :index="item.name">
        
        <i :class="`el-icon-${item.iconClass}`"></i>
        
        <span slot="title">{{ item.text }}</span>
      
      </el-menu-item>
    
    </el-menu>

  </div>

</template>

<script>
export default {
  name: 'ns-slide-menu',
  components: {},
  mixins: [],
  watch: {},
  props: {},
  data () {
    return {
      // 是否折叠
      isCollapse: true,
      // 菜单栏配置
      menuPannel: [
        { iconClass: 'star-off', text: '主题', name: 'theme' },
        { iconClass: 'menu', text: '菜单', name: 'menu' },
        { iconClass: 'price-tag', text: '标签', name: 'tag' },
        { iconClass: 'document', text: '文档', name: 'view' },
        { iconClass: 'setting', text: '配置', name: 'config' }
      ],
      // 菜单栏背景色 hex
      backgroundColor: '#f9f7f3',
      textColor: '#303133',
      activeTextColor: '#409EFF'
    }
  },
  computed: {
    // 折叠按钮图标样式
    menuIsCollapseIconClass () {
      const base = 'el-icon-s-'
      const name = this.isCollapse ? 'unfold' : 'fold'
      return base + name
    },
    menuIsCollapseSpanText () {
      return this.isCollapse ? '打开' : '关闭'
    }
  },
  methods: {
    handleSelect (key) {
      if (key === 'collapse') {
        this.isCollapse = !this.isCollapse
      } else {
        this.$router.push(`/docs/${key}`)
      }
    }
  },
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang="stylus" scoped>
// 左侧菜单栏样式
.wrapper-slide-menu {
  // element菜单
  height: 100%;
  .el-menu {
    // position: fixed;
    // left: 0;
    // top: 0;
    // height: 100%;
    &:not(.el-menu--collapse) {
      width: 12rem;
    }
    // 右间距
    [class^="el-icon"] {
      margin-right: 2rem;
    }
  }
}
</style>
