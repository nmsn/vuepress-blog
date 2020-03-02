# bug解决方案

## ios输入键盘隐藏后，没有正确渲染屏幕的问题

```js
/**
 * iOS 12.1 开始，可能会出现输入键盘隐藏后，没有正确渲染屏幕的问题
 */
document.addEventListener(
  'blur',
  (e) => {
    // 这里加了个类型判断，因为 a 等元素也会触发blur事件
    switch (e.target.tagName) {
      case 'INPUT':
      case 'TEXTAREA':
        document.body.scrollIntoView()
        break
      default:
    }
  },
  true
)
```
