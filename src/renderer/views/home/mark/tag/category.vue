/**
 * @filename: category.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/12/06 18:35:56 星期五
 */

<template>
  <!-- 标签分类 -->
  <div class="wrapper-tag-category">
    <!-- 标签分类总览 -->
    <ul class="tag-view-list">
      <!-- 单个标签类别容器 -->
      <li class="classify-container" v-for="(item, title) of category" :key="title">
        <!-- 标题和删除按钮容器 -->
        <div class="head-title">
          <!-- 分类名 -->
          <h2 class="category-name">{{ item }}</h2>
          <!-- 操作按钮组 -->
          <el-button-group>
            <!-- 删除 -->
            <el-button class="handle-button" size="mini" type="warning" @click="handleEditTagsType(title)" icon="el-icon-edit-outline"></el-button>
            <!-- 编辑 -->
            <el-button class="handle-button" size="mini" type="warning" @click="handleDeleteTagsType(title)" icon="el-icon-delete"></el-button>

          </el-button-group>

        </div>
        <!-- 分割线 -->
        <hr class="divider-horizontal"/>

      </li>

    </ul>
    <!-- 确认删除模态框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialog.show">
      <!--  -->
      <span slot="footer" class="dialog-footer">

        <el-button @click="handleDialogShowToggle">取 消</el-button>
        <el-button type="primary" @click="handleDialogShowToggle">确 定</el-button>
      
      </span>
    
    </el-dialog>

  </div>

</template>

<script>
// electron
import { remote } from 'electron'

export default {
  name: 'ns-tag-category',
  components: {},
  mixins: [],
  watch: {},
  props: {},
  data () {
    return {
      // 提示模态框
      dialog: {
        show: false,
        type: '',
        cache: {}
      }
    }
  },
  computed: {
    // 当前store存储对象
    store () {
      return remote.app.store.mark
    },
    // store存储的标签对象
    tag () {
      return this.store.get('tag')
    },
    // 分类
    category () {
      return Object.keys(this.tag)
    },
    // 模态框展示的标题
    dialogTitle () {
      return 'this.title'
    }
  },
  methods: {
    // 编辑分类名称
    handleEditTagsType () {},
    // 删除当前分类
    handleDeleteTagsType () {},
    // 新增分类
    handleAddTagsType () {
      this.handleDialogShowToggle(true)
      // this.store.set('tag', name)
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
.wrapper-tag-category {
}
</style>
