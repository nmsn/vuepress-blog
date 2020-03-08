# Vue

## Vue依赖收集

![vue依赖收集](../.vuepress/public/images/vue.png)

每个组件实例都有相应的 Watcher 实例对象，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新。

- Observe 类主要给响应式对象的属性添加 getter/setter 用于依赖收集与派发更新
- Dep 类用于收集当前响应式对象的依赖关系
- Watcher 类是观察者，实例分为渲染 watcher(render)、计算属性 watcher(computed)、侦听器 watcher(watch)三种

![vue依赖收集](../.vuepress/public/images/vue2.png)

### Observe

Vue中用Observer类来管理上述响应式化Object.defineProperty的过程

这个方法主要用 data 作为参数去实例化一个 Observer 对象实例，Observer 是一个 Class，用于依赖收集和 notify 更新，Observer 的构造函数使用 defineReactive 方法给对象的键响应式化，给对象的属性递归添加 getter/setter ，当data被取值的时候触发 getter 并搜集依赖，当被修改值的时候先触发 getter 再触发 setter 并派发更新

```js
class Observer {
    constructor() {
      // 响应式绑定数据通过方法
      observe(this.data);
    }
}

export function observe (data) {
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
       // 将data中我们定义的每个属性进行响应式绑定
       defineReactive(obj, keys[i]);
    }
}
```

defineReactive

```js
export function defineReactive ( obj: Object, key: string, val: any, customSetter?: ?Function, shallow?: boolean) {
  const dep = new Dep()         // 在每个响应式键值的闭包中定义一个dep对象

  // 如果之前该对象已经预设了getter/setter则将其缓存，新定义的getter/setter中会将其执行
  const getter = property && property.get
  const setter = property && property.set

  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val         // 如果原本对象拥有getter方法则执行
      if (Dep.target) {                    // 如果当前有watcher在读取当前值, Dep.target为全局target属性，暂存watcher
        dep.depend()                       // 那么进行依赖收集，dep.addSub
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val    // 先getter
      if (newVal === value || (newVal !== newVal && value !== value)) {   // 如果跟原来值一样则不管
        return
      }
      if (setter) { setter.call(obj, newVal) }         // 如果原本对象拥有setter方法则执行
      else { val = newVal }
      dep.notify()                                     // 如果发生变更，则通知更新，调用watcher.update()
    }
  })
}
```

### Dep

```js
let uid = 0;
class Dep {
    static target = null;  // 巧妙的设计！
    constructor() {
        this.id = uid++;
        this.subs = [];
    }
    addSub(sub) {
        this.subs.push(sub);
    }
    removeSub(sub) {
        this.subs.$remove(sub);
    }
    depend() {
        Dep.target.addDep(this);
    }
    notify() {
        const subs = this.subs.slice();
        for (let i = 0, l = subs.length; i < l; i++) {
            subs[i].update();
        }
    }
}
```

由于JavaScript是单线程模型，所以虽然有多个观察者函数，但是一个时刻内，就只会有一个观察者函数在执行，那么此刻正在执行的那个观察者函数，所对应的Watcher实例，便会被赋给Dep.target这一类变量，从而只要访问Dep.target就能知道当前的观察者是谁。 在后续的依赖收集工作里，getter里会调用dep.depend()，而setter里则会调用dep.notify()

### Watcher

Watcher订阅者作为Observer和Compile之间通信的桥梁，主要做的事情是:
1、在自身实例化时往属性订阅器(dep)里面添加自己
2、自身必须有一个update()方法
3、待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调，则功成身退。

```js
class Watcher {
  constrcutor(vm, exp, cb) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    // 此处为了触发属性的getter，从而在dep添加自己，结合Observer更易理解
    this.value = this.get();
  }
}
Watcher.prototype = {
    update: function() {
        this.run();    // 属性值变化收到通知
    },
    run: function() {
        var value = this.get(); // 取到最新值
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal); // 执行Compile中绑定的回调，更新视图
        }
    },
    get: function() {
        Dep.target = this;    // 将当前订阅者指向自己
        var value = this.vm[exp];    // 触发getter，添加自己到属性订阅器中
        Dep.target = null;    // 添加完毕，重置
        return value;
    }
};
// 这里再次列出Observer和Dep，方便理解
Object.defineProperty(data, key, {
    get: function() {
        // 由于需要在闭包内添加watcher，所以可以在Dep定义一个全局target属性，暂存watcher, 添加完移除
        Dep.target && dep.addDep(Dep.target);
        return val;
    }
    // ... 省略
});
Dep.prototype = {
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update(); // 调用订阅者的update方法，通知变化
        });
    }
};
```

### initState顺序

```js
// vue/src/core/instance/state.js
export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```

### 参考文献

- Vue源码阅读 - 依赖收集原理：[https://juejin.im/post/5b40c8495188251af3632dfa](https://juejin.im/post/5b40c8495188251af3632dfa)
- Vue响应式原理-理解Observer、Dep、Watcher：[https://juejin.im/post/5cf3cccee51d454fa33b1860](https://juejin.im/post/5cf3cccee51d454fa33b1860)
- Vue源码解读之Dep,Observer和Watcher：[https://segmentfault.com/a/1190000016208088](https://segmentfault.com/a/1190000016208088)
