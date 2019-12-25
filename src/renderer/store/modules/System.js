// utils
import { update } from '../utils'

export default {

  namespaced: true,

  state: {
    // 顶部拖动栏显示
    topDragBarShow: false,
    // 底部菜单栏显示
    bottomMenuShow: false
    
  },

  mutations: {

    commitUpdate (state, target) {

      update(state, target)

    }

  }

}
