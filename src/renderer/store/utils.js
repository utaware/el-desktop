// store更新辅助函数
export default {

  update (state, target) {

    Object.entries(target).forEach(item => {

      const [ name, value ] = item

      const isDeep = name.includes('.')

      if (isDeep) {
  
        const keys = name.split('.')
        const len = keys.length
  
        keys.reduce((t, c, i) => {
          
          const isLast = i === len - 1
          
          if (isLast) {
  
            t[c] = value
  
          }
  
          return t[c]
  
        })
  
      } else {
  
        state[name] = value
  
      }

    })

  }

}
