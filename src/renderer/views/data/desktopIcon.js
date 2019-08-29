import path from 'path'

const baseUrl = '/static/icon/'

const iconList = [
  'CD Alt.png',
  'Computer On.png',
  'Computer.png',
  'Customize.png',
  'Delete.png',
  'Editor.png',
  'Eject.png',
  'Get Info.png',
  'Heart.png',
  'IPod Off.png',
  'IPod On.png',
  'Music.png',
  'New Folder.png',
  'Pictures.png'
]

export default iconList.map(v => {
  return {
    src: baseUrl + v,
    name: path.parse(v).name
  }
})
