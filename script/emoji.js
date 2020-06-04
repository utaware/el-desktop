// ${已下载文件大小} {文件大小单位} / ${总文件大小} {文件大小单位}   ${文件进度} ${下载速度} ${速度单位} ${剩余时间}
const stdout = '96.93 MiB / 98.40 MiB   98.51% 833.82 KiB/s 00m01s'
// ${已下载文件大小} {文件大小单位} / ${总文件大小} {文件大小单位}
// ${文件进度} ${下载速度} ${速度单位} ${剩余时间}
const splitStream = stdout.split('   ').map(v => v.split(' '))
const formatStream = [].concat(...splitStream)
//  ["96.93", "MiB", "/", "98.40", "MiB", "98.51%", "833.82", "KiB/s", "00m01s"]
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

const formatData = {
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

console.log(formatData)