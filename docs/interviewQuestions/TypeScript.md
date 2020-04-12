# TypeScript

## interface和type区别

### 相同点

#### 都可以描述一个对象或函数

interface

```ts
interface User {
  name: string
  age: number
}

interface SetUser {
  (name: string, age: number): void;
}
```

type

```ts
type User = {
  name: string
  age: number
};

type SetUser = (name: string, age: number)=> void;
```

#### 都允许拓展

interface 和 type 都可以拓展，并且两者并不是相互独立的，也就是说 interface 可以 extends type, type 也可以 extends interface 。 虽然效果差不多，但是两者语法不同。

interface extends interface

```ts
interface Name {
  name: string;
}
interface User extends Name {
  age: number;
}
```

type extends type

```ts
type Name = {
  name: string;
}
type User = Name & { age: number  };
```

且两者可以互相拓展

interface extends type / type extends interface

```ts
type Name1 = {
  name: string;
}

interface User1 extends Name1 {
  age: number;
}

interface Name2 {
  name: string;
}

type User2 = Name2 & { age: number  };
```

### 不同点

#### type 可以声明基本类型别名，联合类型，元组等类型

```ts
// 基本类型别名
type Name = string

// 联合类型
interface Dog {
    wong();
}
interface Cat {
    miao();
}

type Pet = Dog | Cat

// 具体定义数组每个位置的类型
type PetList = [Dog, Pet]
```

#### interface 能够声明合并

```ts
interface User {
  name: string
  age: number
}

interface User {
  sex: string
}

/*
User 接口为 {
  name: string
  age: number
  sex: string
}
*/
```

### 参考文献

- Typescript 中的 interface 和 type 到底有什么区别：[https://juejin.im/post/5c2723635188252d1d34dc7d](https://juejin.im/post/5c2723635188252d1d34dc7d)
