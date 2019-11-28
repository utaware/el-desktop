export default {

  namespaced: true,

  state: {
    // 文档路径
    folderPath: '',
    // 布局展示
    layoutShow: {
      // 控制左侧目录树展示
      tree: true,
      // 控制左侧目录路径展示
      folder: true,
      // 控制右侧mark文档展示
      mark: true
    }
  },

  mutations: {

    commitFolderPath (state, path) {
      state.folderPath = path
    },
    commitLayoutShow (state, name) {
      state.layoutShow[name] = !state.layoutShow[name]
    }

  }

}
