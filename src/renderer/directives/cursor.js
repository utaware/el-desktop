// 自定义鼠标样式
export default {
  // 指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
  bind: function (el, binding) {
    const { value } = binding
    const inherit = el.style.cursor || 'default'
    const exc = [ 'cur' ]
    const url = exc.map(v => {
      return `url("/static/cursor/${value || inherit}.${v}")`
    }).join(',')
    el.style.cursor = `${url}, ${inherit}`
  }
}
