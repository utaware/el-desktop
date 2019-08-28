export default {
  functional: true,
  props: {
    slotKey: {
      type: String,
      default: 'default'
    },
    required: true
  },
  render (h, { props, slots }) {
    return h('div',
      {
        class: [
          `content__${props.slotKey}`
        ]
      },
      slots()[props.slotKey]
    )
  }
}
