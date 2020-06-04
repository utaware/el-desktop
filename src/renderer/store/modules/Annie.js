// utils
import { update } from '../utils'

export default {

  namespaced: true,

  state: {
    // 基本命令
    baseCommand: 'annie',
    // 媒体地址
    mediaAddress: '',
    // 相关配置
    config: [
      // list
      {
        command: 'p',
        defaultValue: false,
        descript: 'Download playlist',
        value: ''
      },
      {
        command: 'start',
        defaultValue: 1,
        descript: 'Define the starting item of a playlist or a file input',
        value: ''
      },
      {
        command: 'end',
        defaultValue: 0,
        descript: 'Define the ending item of a playlist or a file input',
        value: ''
      },
      {
        command: 'items',
        defaultValue: '',
        descript: 'Define wanted items from a file or playlist. Separated by commas like: 1,5,6,8-10',
        value: ''
      },
      // cookie
      {
        command: 'c',
        defaultValue: '',
        descript: 'Cookie',
        value: ''
      },
      // config
      {
        command: 'f',
        defaultValue: '',
        descript: 'Select specific stream to download',
        value: ''
      },
      {
        command: 'o',
        defaultValue: '',
        descript: 'Specify the output path',
        value: ''
      },
      {
        command: 'O',
        defaultValue: '',
        descript: 'Specify the output file name',
        value: ''
      },
      // proxy
      {
        command: 'x',
        defaultValue: '',
        descript: 'HTTP proxy',
        value: ''
      },
      {
        command: 's',
        defaultValue: '',
        descript: 'SOCKS5 proxy',
        value: ''
      },
      {
        command: 'cs',
        defaultValue: 0,
        descript: 'HTTP chunk size for downloading (in MB)',
        value: ''
      },
      // about
      {
        command: 'd',
        defaultValue: false,
        descript: 'Debug mode',
        value: ''
      },
      {
        command: 'v',
        defaultValue: false,
        descript: 'Show version',
        value: ''
      },
      {
        command: 'i',
        defaultValue: false,
        descript: 'Information only',
        value: ''
      },
      {
        command: 'r',
        defaultValue: '',
        descript: 'Use specified Referrer',
        value: ''
      },
      {
        command: 'j',
        defaultValue: false,
        descript: 'Print extracted data',
        value: ''
      },
      // aria2
      {
        command: 'aria2',
        defaultValue: false,
        descript: 'Use Aria2 RPC to download',
        value: ''
      },
      {
        command: 'aria2token',
        defaultValue: false,
        descript: 'Aria2 RPC Token',
        value: ''
      },
      {
        command: 'aria2addr',
        defaultValue: 'localhost:6800',
        descript: 'Aria2 Address',
        value: ''
      },
      {
        command: 'aria2method',
        defaultValue: 'http',
        descript: 'Aria2 Method',
        value: ''
      },
      // youku
      {
        command: 'ccode',
        defaultValue: '0590',
        descript: 'Youku ccode',
        value: ''
      },
      {
        command: 'ckey',
        defaultValue: '...',
        descript: 'Youku ckey',
        value: ''
      },
      {
        command: 'password',
        defaultValue: '',
        descript: 'Youku password',
        value: ''
      },
      // process
      {
        command: 'n',
        defaultValue: 10,
        descript: 'The number of download thread (only works for multiple-parts video)',
        value: ''
      },
      {
        command: 'F',
        defaultValue: '',
        descript: 'URLs file path',
        value: ''
      },
      {
        command: 'C',
        defaultValue: false,
        descript: 'Download captions',
        value: ''
      },
      {
        command: 'retry',
        defaultValue: 10,
        descript: 'How many times to retry when the download failed',
        value: ''
      },
      // youtube
      {
        command: 'ytb-stream2',
        defaultValue: false,
        descript: 'Use data in url_encoded_fmt_stream_map',
        value: ''
      }
    ],
    // 下载队列
    taskLoop: []
  },

  mutations: {

    commitUpdate (state, target) {

      update(state, target)

    },

    commitAnnieOptions (state, target) {

      state.config.forEach(v => {

        const { command } = v

        if (Reflect.has(target, command)) {

          v.value = target[command]

        }

      })

    }

  },

  getters: {

    getAnnieCommand (state) {

      const { config } = state

      return config.filter(v => v.value).map(v => {

        const { command, value } = v
        
        return `-${command} ${value}`
      
      }).join(' ')

    },

    getAnnieOptions (state) {

      const { config } = state

      return config.reduce((t, c, i) => {

        const { command, value, defaultValue } = c

        t[command] = value || defaultValue
        
        return t

      }, {})

    }

  }

}
