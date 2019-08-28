import { ipcRenderer } from 'electron'

/**
 * @description
 * @author utaware
 * @date 2019-08-27
 * @export
 * @param {*} {type = 'openDirectory | openFile', callback}
 */

export function openDirectoryDialog ({type = 'openDirectory', call}) {
  ipcRenderer.send('open-directory-dialog', type)
  ipcRenderer.on('selectedItem', call)
}
