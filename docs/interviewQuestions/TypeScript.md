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

类可以以相同的方式实现接口或类型别名，但类不能实现使用类型别名定义的联合类型

```ts
interface Point {
  x: number;
  y: number;
}

class SomePoint implements Point {
  x = 1;
  y = 2;
}

type Point2 = {
  x: number;
  y: number;
};

class SomePoint2 implements Point2 {
  x = 1;
  y = 2;
}

type PartialPoint = { x: number; } | { y: number; };

// A class can only implement an object type or 
// intersection of object types with statically known members.
class SomePartialPoint implements PartialPoint { // Error
  x = 1;
  y = 2;
}
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

#### 映射类型定义属性

接口类型定义中由于使用了非字面量或者非唯一 symbol 类型作为属性，会造成 TS1169 错误，但是，在 type 关键字声明的类型别名中，我们却可以使用映射类型定义属性

```ts
interface Obj {
  [key in 'id' | 'name']: any; // TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
};

type Obj = {
  [key in 'id' | 'name']: any;
};
```

### 参考文献

- Typescript 中的 interface 和 type 到底有什么区别：[https://juejin.im/post/5c2723635188252d1d34dc7d](https://juejin.im/post/5c2723635188252d1d34dc7d)

## never 与 void 的差异

void 表示没有任何类型，never 表示永远不存在的值的类型。

当一个函数返回空值时，它的返回值为 void 类型，但是，当一个函数永不返回时（或者总是抛出错误），它的返回值为 never 类型。void 类型可以被赋值（在 strictNulChecking 为 false 时），但是除了 never 本身以外，其他任何类型不能赋值给 never。
