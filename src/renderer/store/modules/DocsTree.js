export default {

  namespaced: true,

  state: {

    folderPath: ''

  },

  mutations: {

    commitFolderPath (state, path) {

      state.folderPath = path

    }

  }

}
