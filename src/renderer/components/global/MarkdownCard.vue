/**
 * @filename: MarkdownCard.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2019/11/16 11:03:31 星期六
 */

<template>

  <div class="wrapper-markdown-card" :class="cardOptions.description">

    <div class="color-bar"></div>

    <el-card class="box-card">

      <div slot="header" class="flex-between" >
      
        <span class="header-title">{{ cardOptions.title }}</span>

        <span class="header-desc">{{ cardOptions.description }}</span>
      
      </div>
      
      <slot></slot>
    
    </el-card>

  </div>

</template>

<script>
export default {
  name: 'ns-markdown-card',
  components: {},
  mixins: [],
  watch: {},
  props: {
    // 传递的参数
    params: {
      type: String,
      default: 'card tip 标题'
    }
  },
  data () {
    return {}
  },
  computed: {
    // 传递的字符串信息截取转换成对象形式
    cardOptions () {
      const options = this.params.split(' ')
      const [ , description, title ] = options
      return { title, description }
    }
  },
  methods: {},
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang="stylus" scoped>
.wrapper-markdown-card {
  margin-bottom: 1rem;
  display: flex;
  // 左侧
  .color-bar {
    width: 0.5rem;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  }
  // card
  .box-card {
    flex: 1;
    // 左侧标题
    .header-title {
      font-weight: bold;
      font-size: 1.2rem;
    }
    // 右侧描述
    .header-desc {
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
    }
    // deep
    /deep/ .el-card__header {
      padding: 1rem;
    }
    /deep/ .el-card__body {
      padding: 0 1rem;
    }
  }
  // 左侧标题和右侧类型描述
  .flex-between {
    display: flex;
    justify-content: space-between;
  }
}

// 背景色主题
.tip {
  .color-bar, .header-desc {
    background-color: #42b983;
  }
}
.warning {
  .color-bar, .header-desc {
    background-color: darken(#ffe564, 35%);  
  }
  .box-card {
    color: darken(#ffe564, 70%);
    background-color: rgba(255,229,100,.3);
  }
  .header-title {
    color: darken(#ffe564, 50%);
  }
}
.danger {
  .color-bar, .header-desc {
    background-color: darken(red, 20%);
  }
  .box-card {
    color: darken(red, 70%);
    background-color: #ffe6e6;
  }
  .header-title {
    color: darken(red, 40%);  
  }
}
</style>
