# ios12 input失焦不回弹问题

```js
document.body.addEventListener('focusin', () => {
    // 软键盘弹出的事件处理
    this.isReset = false
})
document.body.addEventListener('focusout', () => {
    // 软键盘收起的事件处理
    this.isReset = true
    setTimeout(() => {
        // 当焦点在弹出层的输入框之间切换时先不归位
        if (this.isReset) {
          window.scroll(0, 0) // 失焦后强制让页面归位
        }
    }, 300)
})
```
