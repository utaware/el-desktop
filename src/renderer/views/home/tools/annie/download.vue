/**
 * @filename: download.vue
 * @desc: vue components file
 * @author: utaware
 * @createTime: 2020/01/03 16:23:55 星期五
 */

<template>

  <div class="wrapper-annie-download">

    <el-card class="task" v-for="(item, index) of taskLoop" :key="index">
      <!-- 标题 -->
      <div slot="header" class="header">

        <span 
          class="title"
          :title="item.site"
          @click="handleOpenMediaAddress(item.url)">
          
          {{ item.title }}
      
        </span>

      </div>
      <!--  -->
      <div class="process">

        <el-progress 
          :text-inside="true" 
          :stroke-width="24" 
          :percentage="item.percentage" 
          status="success">
        </el-progress>

      </div>
      
    </el-card>

  </div>

</template>

<script>
// vuex
import { mapState } from 'vuex'

export default {
  name: 'ns-annie-download',
  components: {},
  mixins: [],
  watch: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    // vuex
    ...mapState('Annie', ['taskLoop'])
  },
  methods: {
    // 转换输出文本的信息
    formatDownloadInfo (text) {
      const splitStream = text.split('   ').map(v => v.split(' '))
      const formatStream = [].concat(...splitStream)
      const [
        hasDownLoadingSize, // 已经下载的内容大小 数字
        hasDownLoadingSizeUnit, // 已经下载的内容大小 单位
        intervalSymbol, // 间隔符
        totalDownloadSize, // 总共所需下载内容大小 - 数字
        totalDownloadSizeUnit, // 总共所需下载内容大小 - 单位
        isDownLoadingProcess, // 当前下载进度 - 百分比
        isDownLoadingSpeed, // 当前下载速度 - 数值
        isDownLoadingSpeedUnit, // 当前下载速度 - 单位
        remainingTime = '00m00s' // 剩余时间
      ] = formatStream
      return {
        hasDownLoadingSize,
        hasDownLoadingSizeUnit,
        intervalSymbol,
        totalDownloadSize,
        totalDownloadSizeUnit,
        isDownLoadingProcess,
        isDownLoadingSpeed,
        isDownLoadingSpeedUnit,
        remainingTime,
        size: formatStream.length
      }
    }
  },
  filters: {},
  created () {},
  mounted () {}
}
</script>

<style lang="stylus" scoped>
.wrapper-annie-download {
}
</style>
