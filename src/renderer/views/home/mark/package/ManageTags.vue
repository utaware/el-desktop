/**
 * @filename: ManageTags.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/05 16:24:04 星期四
 */

<template>
  <!-- 标签页 -->
  <div class="wrapper-manage-tags">
    <!-- 头部设置 -->
    <div class="control-pannel">
      <!-- 新增标签 -->
      <el-button>新增分类</el-button>
      <!-- 标签筛选 -->
      <el-select v-model="selectTagType" placeholder="请选择">
      
        <el-option
          v-for="item in canSelectTagOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      
      </el-select>

    </div>
    <!-- 分割线 -->
    <hr class="divider-horizontal"/>
    <!-- 标签种类 -->
    <ul class="tag-view-list">
      <!--  -->
      <li class="classify-container">
        
        <div class="head-title">
          
          <h2>language</h2>

          <el-button class="handle-button" size="mini" type="warning">删除</el-button>

        </div>

        <hr class="divider-horizontal"/>

        <div class="list">

          <el-tag class="tag" v-for="(item, index) of tagList" :key="index">{{ item.name }}</el-tag>

        </div>

      </li>

    </ul>

  </div>

</template>

<script>
export default {
  name: 'ns-manage-tags',
  components: {},
  mixins: [],
  watch: {},
  props: {},
  data () {
    return {
      // 选择的标签分类
      selectTagType: '',
      // 可供选择的标签分类
      canSelectTagOptions: [],
      // 标签列表
      tagList: [
        { name: 'C' },
        { name: 'C++' },
        { name: 'js' },
        { name: 'Nodejs' }
      ]
    }
  },
  computed: {
    // 选择分类标签展示的内容
    selectTagTypeButtonText () {
      return this.selectTagType ? '选择分类' : ''
    },
    // 当前选择的标签分类
    currentSelectTagType () {
      return { name: '' }
    }
  },
  methods: {
    // 选择类别左侧按钮点击的回调
    handleClick () {
      console.log('123')
    }
  },
  filters: {},
  created () {
    console.log(process.cwd())
  },
  mounted () {}
}
</script>

<style lang="stylus" scoped>
// 外层容器
.wrapper-manage-tags {
  padding: 1rem
  flex: 1;
  // 控制面板
  .control-pannel {
    display: flex;
    justify-content: space-between;
  }
  // 分割线
  .divider-horizontal {
    margin: 1rem 0;
    background-color: #dcdfe6;
    height: 1px;
    border: none;
  }
  // 标签展示
  .tag-view-list {
    margin: 0;
    padding: 0 1rem;
    list-style: none;
    // 单个分类展示
    .classify-container {
      .head-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        // 分类删除按钮
        .handle-button {
          height: 2rem;
        }
      }
    }
    .tag + .tag {
      margin-left: 0.5rem;
      cursor: default;
    }
  }
}
</style>
