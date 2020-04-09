# TypeScript

## TS中的内置类型

### 常用关键字

#### typeof

`typeof`可以获取值的类型

```ts
const obj = { a: '1' };
type Foo = typeof obj; // { a: string }
```

#### keyof

`keyof`可以用来取得一个对象接口的所有`key`值

```ts
interface Person {
  name: string;
  age: number
}
type T = keyof Person // -> "name" | "age"
```

#### in

`in`则可以遍历枚举类型

```ts
interface Person {
  name: string;
  age: number
}
type T = keyof Person // -> "name" | "age"
```

### Partial

Partial 作用是将传入的属性变为可选项

源码如下

```ts
type Keys = "a" | "b"
type Obj =  {
  [p in Keys]: any
} // -> { a: any, b: any }
```

Partial的实例

```ts
interface Person {
    name: string;
    age: number;
}

type NewPerson = Partial<Person>;

// 相当于
interface NewPerson {
    name?: string;
    age?: number;
}
```

但是 Partial 有个局限性，就是只支持处理第一层的属性

### Required

Required 的作用是将传入的属性变为必选项, 源码如下

```ts
type Required<T> = { [P in keyof T]-?: T[P] };
```

我们发现一个有意思的用法 -?, 这里很好理解就是将可选项代表的 ? 去掉, 从而让这个类型变成必选项. 与之对应的还有个+? , 这个含义自然与-?之前相反, 它是用来把属性变成可选项的.

### Mutable (未包含)

类似地, 其实还有对 + 和 -, 这里要说的不是变量的之间的进行加减而是对 readonly 进行加减.
以下代码的作用就是将 T 的所有属性的 readonly 移除,你也可以写一个相反的出来.

```ts
type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}
```

### Readonly

将传入的属性变为只读选项, 源码如下

```ts
type Readonly<T> = { readonly [P in keyof T]: T[P] };
```

### Record

将 K 中所有的属性的值转化为 T 类型

```ts
type Record<K extends keyof any, T> = { [P in K]: T };
```

### Pick

从 T 中取出 一系列 K 的属性

```ts
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
```

### Exclude

Exclude 的作用是从 T 中找出 U 中没有的元素

```ts
type Exclude<T, U> = T extends U ? never : T;
```

### Extract

根据源码我们推断出 Extract 的作用是提取出 T 包含在 U 中的元素, 换种更加贴近语义的说法就是从 T 中提取出 U
源码如下

```ts
type Extract<T, U> = T extends U ? T : never;
```

### Omit (未包含)

用之前的 Pick 和 Exclude 进行组合, 实现忽略对象某些属性功能, 源码如下

```ts
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

// 使用
type Foo = Omit<{name: string, age: number}, 'name'> // -> { age: number }
```

### ReturnType

在阅读源码之前我们需要了解一下 infer 这个关键字, 在条件类型语句中, 我们可以用 infer 声明一个类型变量并且对它进行使用,
我们可以用它获取函数的返回类型， 源码如下

```ts
type ReturnType<T> = T extends (
  ...args: any[]
) => infer R
  ? R
  : any;
```

### ThisType

### NonNullable
