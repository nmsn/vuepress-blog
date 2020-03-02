# axios文件处理

## FormData文件上传

### input标签

```html
<input class="upload" type="file" ref="upload" accept="image/jpeg,image/jpg,image/png" @change="uploadImg($event)" />
```

### 请求头

在axios配置中，我们需要用POST方法，再配置headers,需要这个浏览器才知道是表单。

```js
 headers: {
  'Content-Type': 'multipart/form-data;charset=UTF-8'
}
```

### 请求方法

```js
uploadImg (e) {
// 获取file
  let file = e.target.files[0]
  // 实例化
  let formdata = new FormData()
  formdata.append('file', file)
  upload(formdata).then(res => {
    // ...
    })
}
```

### 数据序列化

由于出现请求参数为空，我们无法发送给后端数据，无法保存成功。遇到这个可以检查一下你的axios请求拦截部分是否对数据进行了处理，我遇到是的axios请求拦截中，multipart/form-data时候，数据直接就被Qs进行序列化了，因为无法序列化FormData的内容，所以返回的data就是一个空的内容，导致最后判断是不是formData对象时出错。解决方法，如果'Content-Type' === 'multipart/form-data;charset=UTF-8'就是直接返回data，不进行序列化。

```js
transformRequest: [function (data, headers) {
    if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      // 把一个参数对象格式化为一个字符串
      return qs.stringify(data)
    } else if (headers['Content-Type'] === 'multipart/form-data;charset=UTF-8') {
      return data
    } else {
      headers['Content-Type'] = 'application/json'
    }
    return JSON.stringify(data)
  }]
```

## 文件上传下载进度

```js
var config = {
  // 上传进度
  onUploadProgress: progressEvent => {
    var complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
  }
  // 下载进度
  onDownloadProgress: progressEvent => {
    var complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
  }
```

### 对应原生事件

XMLHttpRequestEventTarget.onprogress 是在 XMLHttpRequest 完成之前周期性调用的函数。

```js
XMLHttpRequest.onprogress = function (event) {
  event.loaded; // 已传输的数据量
  event.total; //总共的数据量
};
```

## 参考文献

- Github/axios：[https://github.com/axios/axios](https://github.com/axios/axios)
- 前端实现axios以表单方式上传文件，优化上传速度：[https://juejin.im/post/5cff13ab6fb9a07ee1691e82](https://juejin.im/post/5cff13ab6fb9a07ee1691e82)
- XMLHttpRequestEventTarget.onprogress：[https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget/onprogress](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestEventTarget/onprogress)
