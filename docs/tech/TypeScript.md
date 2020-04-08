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

### Pick

### Record

### Exclude

### ReturnType

### ThisType

### NonNullable
