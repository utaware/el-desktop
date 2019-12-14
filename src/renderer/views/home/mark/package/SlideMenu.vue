/**
 * @filename: SlideMenu.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/05 14:33:25 星期四
 */

<template>

  <div class="wrapper-slide-menu">
    <!-- 左侧菜单 -->
    <el-menu 
      class="el-menu" 
      default-active="1"
      :background-color="backgroundColor"
      :text-color="textColor"
      :active-text-color="activeTextColor">
      <!-- 设定菜单 -->
      <el-menu-item 
        class="single-item"
        v-for="(item, index) of menuPannel"
        :key="index"
        :index="item.name"
        @click="handlerTabMenuClick(item.name)">
        <!-- 显示文字 -->
        <el-tooltip :content="item.text" placement="right">
          <!-- 图标 -->
          <i :class="`el-icon-${item.iconClass}`"></i>
        
        </el-tooltip>
      
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
      // 菜单栏配置
      menuPannel: [
        { iconClass: 'back', text: '回到桌面', name: 'desktop' },
        { iconClass: 's-fold', text: '显示列表', name: 'drawer' },
        { iconClass: 'refresh-right', text: '刷新文档', name: 'reload' },
        { iconClass: 'folder-opened', text: '选择目录', name: 'folder' }
      ],
      // 菜单栏背景色 hex
      backgroundColor: '#f9f7f3',
      textColor: '#303133',
      activeTextColor: '#409EFF'
    }
  },
  computed: {},
  methods: {
    // 单个菜单被点击
    handlerTabMenuClick (name) {
      this.$emit('leftMenuClick', name)
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
  flex: 0 0 4rem;
  // element菜单
  .el-menu {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 4rem;
    height: 100%;
    text-align: center;
    box-sizing: border-box;
    .single-item {
      display: flex;
      align-items: center;
      width: 100%;
      flex: 1;
    }
  }
}
</style>
