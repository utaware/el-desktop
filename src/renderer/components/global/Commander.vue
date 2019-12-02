/**
 * @filename: Comander.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/11/12 17:02:16 星期二
 */

<template>

  <div class="wrapper-comander">
    <!-- 设置额外参数 -->
    <div class="other-options">

      <el-select v-model="language" filterable placeholder="请选择">
      
        <el-option v-for="(item,index) of languageList" :label="item.label" :value="item.value" :key="index"></el-option>
      
      </el-select>

      <el-button icon="el-icon-search" @click="handleClick"></el-button>

    </div>
    <!-- 主要执行命令 -->
    <el-input placeholder="请输入内容" v-model="execCommand" class="input-with-select"></el-input>

    <!-- 返回结果内容 -->
    <div class="exec-result">

      <pre class="pre-tag">{{ execResult }}</pre>

    </div>

  </div>

</template>

<script>
// ipc
import { ipcEventsHandler } from '@/message/ipcRendererHandle'

export default {
  name: 'ns-comander',
  components: {},
  mixins: [],
  watch: {},
  props: {},
  data () {
    return {
      // 执行命令
      execCommand: 'ipconfig',
      // 执行语言
      language: 'node',
      // 语言列表
      languageList: [
        { label: 'NODE', value: 'node' },
        { label: 'JS', value: 'js' },
        { label: 'DOC', value: 'doc' }
      ],
      // 执行结果
      execResult: ''
    }
  },
  computed: {},
  methods: {
    // 执行
    handleClick () {
      const { execCommand } = this
      ipcEventsHandler({
        send: 'executeCommand',
        command: execCommand,
        options: { encoding: 'binary' },
        callback: (event, result) => {
          this.execResult = result
        }
      })
    }
  },
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang="scss" scoped>
.wrapper-comander {
  // 额外设置
  margin: 1rem 0;
  // 包裹设置
  .other-options {
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
  }
  // 执行结果
  .exec-result {
    .pre-tag {
      margin: 0;
      font-family: inherit;
    }
  }
}
</style>
