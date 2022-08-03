/**
 * @Description: 确定按钮防止重复点击点击, 使用时v-preventReClick
 */
const preventReClick = {
  mounted(el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        el.style.opacity = '0.5'
        el.style.cursor = 'not-allowed'
        setTimeout(() => {
          el.disabled = false
          el.style.opacity = '1'
          el.style.cursor = ''
        }, binding.value || 1500)
      }
    })
  }
}

export default preventReClick
