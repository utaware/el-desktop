
const baseUrl = '/static/icon/'

const iconList = [
  {
    src: 'Editor.png',
    text: '文档',
    to: '/docs'
  },
  {
    src: 'Customize.png',
    text: '工具',
    to: '/tools'
  },
  {
    src: 'Music.png',
    text: '音乐',
    to: '/music'
  },
  {
    src: 'Pictures.png',
    text: '图片',
    to: '/video'
  }
]

export default iconList.map(v => {
  v.src = baseUrl + v.src
  return v
})
