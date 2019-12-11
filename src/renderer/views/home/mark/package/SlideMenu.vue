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
      :router="true"
      :active-text-color="activeTextColor">
      <!-- 设定菜单 -->
      <el-menu-item class="menu-item" v-for="(item, index) of menuPannel" :key="index" :index="'/docs/' + item.name">
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
  computed: {},
  methods: {},
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
    width: 4rem;
    height: 100%;
    text-align: center;
  }
}
</style>
