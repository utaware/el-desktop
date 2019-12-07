
<template>
  <!-- 标签页 -->
  <div class="wrapper-manage-tags">

    <el-tabs type="border-card">
      <!-- 类别 -->
      <el-tab-pane label="类别">
        
        <TagCategory></TagCategory>
      
      </el-tab-pane>
      <!-- 标签 -->
      <el-tab-pane label="标签">配置管理</el-tab-pane>
    
    </el-tabs>

  </div>

</template>

<script>
// electron
import { remote } from 'electron'
// components
import TagCategory from './category.vue'

export default {
  name: 'ns-manage-tags',
  components: {
    TagCategory
  },
  mixins: [],
  watch: {},
  props: {},
  data () {
    return {
      // 选择的标签分类
      selectTagType: 'all',
      // 提示模态框
      dialog: {
        show: false,
        type: '',
        cache: {}
      }
    }
  },
  computed: {
    // 选择分类标签展示的内容
    selectTagTypeButtonText () {
      return this.selectTagType ? '选择分类' : ''
    },
    // 当前store存储对象
    store () {
      return remote.app.store.mark
    },
    // 所有的标签分类列表
    allTagList () {
      return this.store.get('tag')
    },
    // 可供选择的标签分类
    canSelectTagOptions () {
      const tag = this.allTagList
      return Object.keys(tag).map(v => {
        return { label: v, value: v }
      })
    },
    // 模态框展示的标题
    dialogTitle () {
      return 'this.title'
    }
  },
  methods: {
    // 清空所有标签
    handleClearAllTags () {
      this.store.set('tag', {})
    },
    // 新增分类
    handleAddTagsType () {
      this.handleDialogShowToggle(true)
      // this.store.set('tag', name)
    },
    // 恢复默认值
    handleResetTagsList () {
      this.store.reset('tag')
    },
    // 删除当前所属标签分类
    handleDeleteTagsType (name) {
      if (this.store.has(name)) {
        this.store.delete(name)
      } else {
        this.$message.warning('当前删除的标签类别不存在')
      }
    },
    // 切换模态框展示状态
    handleDialogShowToggle (isShow = false) {
      this.dialog.show = isShow
    },
    // 确认关闭模态框
    hanlerEnterDialogClose () {
      const { type, cache } = this.dialog
      switch (type) {
        // 新增 A 删除 D 编辑 E
        case 'A':
          return false
        case 'D':
          return false
        case 'E':
          return cache
        default:
          break
      }
    }
  },
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang="stylus" scoped>
// 外层容器
.wrapper-manage-tags {
  flex: 1;
  // 控制面板
  .control-pannel {
    display: flex;
    justify-content: space-between;
  }
  // 标签展示
  .tag-view-list {
    margin: 0;
    padding: 0 1rem;
    list-style: none;
    // 单个分类展示
    .classify-container {
      // 标题设置
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
    // 标签间距
    .tag {
      margin: 0.5rem;
      cursor: default;
    }
  }
}
</style>
