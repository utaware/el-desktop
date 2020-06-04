/**
 * @filename: list.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2020/01/02 17:51:26 星期四
 */

<template>

  <div class="wrapper-annie-list">

    <el-card class="media-card" v-for="(item, index) of list" :key="index">

      <div slot="header" class="header">

        <span 
          class="title"
          :title="item.site"
          @click="handleOpenMediaAddress(item.url)">
          
          {{ item.title }}
      
        </span>

      </div>

      <div class="body">

        <el-select v-model="item.value" placeholder="请选择">

          <el-option
            v-for="(option, index) in item.options"
            :key="index"
            :label="option.quality"
            :value="option.key">
          </el-option>
        
        </el-select>

        <el-button @click="handleDownloadMedia(item)" :disabled="!item.value">下载</el-button>

      </div>

    </el-card>

  </div>

</template>

<script>
// remote
import { shell } from 'electron'

export default {
  name: 'ns-annie-list',
  components: {},
  mixins: [],
  watch: {
    // 同步list
    mediaList: {
      handler () {
        this.mapMediaListInfo()
      },
      deep: true,
      immediate: true
    }
  },
  props: {
    // 查询的媒体列表
    mediaList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      // 列表数据
      list: []
    }
  },
  computed: {},
  methods: {
    // 打开媒体地址
    handleOpenMediaAddress (url) {
      shell.openExternal(url)
    },
    // 下载
    handleDownloadMedia (item) {
      this.$emit('download', item)
    },
    // 映射下载流信息
    mapMediaStreamsInfo (streams) {
      return Object.entries(streams).map(v => {
        const [ key, value ] = v
        return { key, ...value }
      })
    },
    // 映射媒体信息
    mapMediaListInfo () {
      this.list = this.mediaList.map(v => {
        const { streams, site, url, title, type } = v
        const options = this.mapMediaStreamsInfo(streams)
        return { site, url, title, type, options, streams, value: '' }
      })
    }
  },
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang="stylus" scoped>
.wrapper-annie-list {
  margin-top: 1rem;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      cursor: pointer;
      &:hover {
        color: #0366d6;
      }
    }
  }
  .body {
    display: flex;
    justify-content: space-between;
  }
}
</style>
