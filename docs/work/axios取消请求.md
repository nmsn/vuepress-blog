# axios取消请求

> XMLHttpRequest 可以通过 xhr.abort() 取消请求，还可以添加 onabort 回调来处理 abort 的情况

axios官方文档中提供cancekToken API用于取消请求

```js
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // handle error
  }
});

axios.post('/user/12345', {
  name: 'new name'
}, {
  cancelToken: source.token
})

// cancel the request (the message parameter is optional)
source.cancel('Operation canceled by the user.');
```

```js
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // An executor function receives a cancel function as a parameter
    cancel = c;
  })
});

// cancel the request
cancel();
```

官方提供个的是单个请求的取消方法，如果说要在切换路由的时候全局取消请求，那么如下配置

```js
// 配置发送请求拦截器

http.interceptors.request.use(config => {
    config.cancelToken = store.source.token
    return config
}, err => {
    return Promise.reject(err)
})

router.beforeEach((to, from, next) => {
    const CancelToken = axios.CancelToken
    store.source.cancel && store.source.cancel()
    store.source = CancelToken.source()
    next()
})

// 全局变量

store = {
    source: {
        token: null,
        cancel: null
  }
}
```

## 参考文献

- Github/axios[https://github.com/axios/axios](https://github.com/axios/axios)
- 路由变化时使用axios取消所有请求：[https://www.jianshu.com/p/37be781dc879](https://www.jianshu.com/p/37be781dc879)
