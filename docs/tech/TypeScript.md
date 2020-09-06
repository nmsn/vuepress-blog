# TypeScript

## TS中的内置类型

### 常用关键字

#### typeof

`typeof`可以获取值的类型

```ts
const obj = { a: '1' };
type Foo = typeof obj; // { a: string }
```

eg:

```ts
interface Person {
  name: string;
  age: number;
}

const sem: Person = { name: 'semlinker', age: 30 };
type Sem= typeof sem; // -> Person

function toArray(x: number): Array<number> {
  return [x];
}

type Func = typeof toArray; // -> (x: number) => number[]
```

#### keyof

`keyof`可以用来取得一个对象接口的所有`key`值

eg:

```ts
interface Person {
    name: string;
    age: number;
}

type K1 = keyof Person; // "name" | "age"
type K2 = keyof Person[]; // "length" | "toString" | "pop" | "push" | "concat" | "join" 
type K3 = keyof { [x: string]: Person };  // string | number
```

#### in

`in` 则可以遍历枚举类型

```ts
type Keys = "a" | "b"
type Obj =  {
  [p in Keys]: any
} // -> { a: any, b: any }
```

上面 `in` 遍历 `Keys`，并为每个值赋予 `any` 类型。

eg:

```ts
interface Admin {
  name: string;
  privileges: string[];
}

interface Employee {
  name: string;
  startDate: Date;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}
```

#### infer

在条件类型语句中, 可以用 infer 声明一个类型变量并且对它进行使用，

我们可以用它获取函数的返回类型， 源码如下：

```ts
type ReturnType<T> = T extends (
  ...args: any[]
) => infer R
  ? R
  : any;
```

其实这里的 `infer R` 就是声明一个变量来承载传入函数签名的返回值类型, 简单说就是用它取到函数返回值的类型方便之后使用。

### Partial

Partial 作用是将传入的属性变为可选项

源码如下

```ts
type Partial<T> = {
    [P in keyof T]?: T[P];
};
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

其中 `-?` 是代表移除 `?` 这个 `modifier` 的标识。
与之对应的还有个 `+?` , 这个含义自然与 `-?` 之前相反, 它是用来把属性变成可选项的，`+` 可省略，见 `Partial`。
再拓展一下，除了可以应用于 `?` 这个 `modifiers` ，还有应用在 `readonly` ，比如 `Readonly`.

### Readonly

将传入的属性变为只读选项，源码如下

```ts
type Readonly<T> = { readonly [P in keyof T]: T[P] };
```

给子属性添加 `readonly` 的标识，如果将上面的 `readonly` 改成 `-readonly`， 就是移除子属性的 `readonly` 标识。

### Record

将 `K` 中所有的属性的值转化为 `T` 类型，源码如下

```ts
type Record<K extends keyof any, T> = { [P in K]: T };
```

可以根据 `K` 中的所有可能值来设置 `key`，以及 `value` 的类型，举个例子：

```ts
type T11 = Record<'a' | 'b' | 'c', Person>; // -> { a: Person; b: Person; c: Person; }
```

### Pick

这个类型则可以将某个类型中的子属性挑出来，变成包含这个类型部分属性的子类型。


从 `T` 中取出 一系列 `K` 的属性, 源码试下如下

```ts
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
```

从源码可以看到 `K` 必须是 `T` 的 key，然后用 `in` 进行遍历, 将值赋给 `P`, 最后 `T[P]` 取得相应属性的值

### Exclude

Exclude 的作用是从 `T` 中找出 `U` 中没有的元素

```ts
type Exclude<T, U> = T extends U ? never : T;
```

以上语句的意思就是 如果 `T` 能赋值给 `U` 类型的话，那么就会返回 `never` 类型，否则返回 `T`，最终结果是将 `T` 中的某些属于 `U` 的类型移除掉，举个例子：

```ts
type T00 = Exclude<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>;  // -> 'b' | 'd'
```

可以看到 T 是 `'a' | 'b' | 'c' | 'd'` ，然后 `U` 是 `'a' | 'c' | 'f'` ，返回的新类型就可以将 `U` 中的类型给移除掉，也就是 `'b' | 'd'` 了。

### Extract

Extract 的作用是提取出 `T` 包含在 `U` 中的元素, 换种更加贴近语义的说法就是从 `T` 中提取出 `U`
源码如下

```ts
type Extract<T, U> = T extends U ? T : never;
```

以上语句的意思就是 如果 `T` 能赋值给 `U` 类型的话，那么就会返回 `T` 类型，否则返回 `never`，最终结果是将 `T` 和 `U` 中共有的属性提取出来，举个例子：

```ts
type T01 = Extract<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'>;  // -> 'a' | 'c'
```

可以看到 `T` 是 `'a' | 'b' | 'c' | 'd'` ，然后 `U` 是 `'a' | 'c' | 'f'` ，返回的新类型就可以将 `T` 和 `U` 中共有的属性提取出来，也就是 `'a' | 'c'` 了。

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

实际使用的话，就可以通过 `ReturnType` 拿到函数的返回类型，如下的示例：

```ts
function foo(x: number): Array<number> {
  return [x];
}

type fn = ReturnType<typeof foo>; // -> number[]
```

### ThisType

用于指定上下文对象类型的

```ts
interface Person {
    name: string;
    age: number;
}

const obj: ThisType<Person> = {
  dosth() {
    this.name // string
  }
}

// 这样的话，就可以指定 obj 里的所有方法里的上下文对象改成 Person 这个类型了
const obj = {
  dosth(this: Person) {
    this.name // string
  }
}
```

### InstanceType

该类型的作用是获取构造函数类型的实例类型。

```ts
type InstanceType<T extends new (...args: any[]) => any> = T extends new (...args: any[]) => infer R ? R : any;
```

### NonNullable

这个类型可以用来过滤类型中的 null 及 undefined 类型

```ts
type NonNullable<T> = T extends null | undefined ? never : T;
```

```ts
type T22 = string | number | null;
type T23 = NonNullable<T22>; // -> string | number;
```

### Parameters

该类型可以获得函数的参数类型组成的元组类型。

```ts
type Parameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never;
```

```ts
function foo(x: number): Array<number> {
  return [x];
}

type P = Parameters<typeof foo>; // -> [number]
```

此时 `P` 的真实类型就是 `foo` 的参数组成的元组类型 `[number]`。

### ConstructorParameters

该类型的作用是获得类的参数类型组成的元组类型，源码如下

```ts
type ConstructorParameters<T extends new (...args: any[]) => any> = T extends new (...args: infer P) => any ? P : never;
```

```ts
class Person {
  private firstName: string;
  private lastName: string;
  
  constructor(firstName: string, lastName: string) {
      this.firstName = firstName;
      this.lastName = lastName;
  }
}

type P = ConstructorParameters<typeof Person>; // -> [string, string]
```

此时 `P` 就是 `Person` 中 `constructor` 的参数 `firstName` 和 `lastName` 的类型所组成的元组类型 `[string, string]`。

## 自定义类型别名

下面是一些可能会经常用到，但是 TS 没有内置的一些类型别名：

### Omit

有时候我们想要继承某个接口，但是又需要在新接口中将某个属性给 overwrite 掉，这时候通过 Pick 和 Exclude 就可以组合出来 Omit，用来忽略对象某些属性功能：

```ts
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

// 使用
type Foo = Omit<{name: string, age: number}, 'name'> // -> { age: number }
```

### Mutable

将 `T` 的所有属性的 `readonly` 移除：

```ts
type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}
```

### PowerPartial

内置的 Partial 有个局限性，就是只支持处理第一层的属性，如果是嵌套多层的就没有效果了，不过可以如下自定义：

```ts
type PowerPartial<T> = {
    // 如果是 object，则递归类型
    [U in keyof T]?: T[U] extends object
      ? PowerPartial<T[U]>
      : T[U]
};
```

### Deferred

相同的属性名称，但使值是一个 Promise，而不是一个具体的值：

```ts
type Deferred<T> = {
    [P in keyof T]: Promise<T[P]>;
};
```

### 参考文献

- TS 中的内置类型简述：[https://github.com/whxaxes/blog/issues/14](https://github.com/whxaxes/blog/issues/14)
- TypeScript 强大的类型别名[https://juejin.im/post/5c2f87ce5188252593122c98](https://juejin.im/post/5c2f87ce5188252593122c98)


## 装饰器

### 类装饰器

```ts
declare type ClassDecorator = <TFunction extends Function>(
  target: TFunction
) => TFunction | void;
```

eg1: 

```ts
function Greeter(target: Function): void {
  target.prototype.greet = function (): void {
    console.log("Hello Semlinker!");
  };
}

@Greeter
class Greeting {
  constructor() {
    // 内部实现
  }
}

let myGreeting = new Greeting();
myGreeting.greet(); // console output: 'Hello Semlinker!';
```

eg2:

```ts
function Greeter(greeting: string) {
  return function (target: Function) {
    target.prototype.greet = function (): void {
      console.log(greeting);
    };
  };
}

@Greeter("Hello TS!")
class Greeting {
  constructor() {
    // 内部实现
  }
}

let myGreeting = new Greeting();
myGreeting.greet(); // console output: 'Hello TS!';
```
