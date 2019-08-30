import cursor from './cursor'

const dorectiveList = {
  cursor
}

export default (Vue) => {
  for (const key in dorectiveList) {
    Vue.directive(key, dorectiveList[key])
  }
}
