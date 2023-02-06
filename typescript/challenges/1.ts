// 1.实现 TS 内置的 Pick<T, K>，但不可以使用它。
// 从类型 T 中选择出属性 K，构造成一个新的类型。

// 例如：
// interface Todo {
//   title: string
//   description: string
//   completed: boolean
// }
// type MyPick<T, K extends keyof T> = {
//     [P in K]: T[P]
// };
// type TodoPreview = MyPick<Todo, 'title' | 'completed'>

// const todo: TodoPreview = {
//     title: 'Clean room',
//     completed: false,
// }

// end1------------------------------

// 2.实现 Readonly

// interface Todo {
//     title: string
//     description: string
// }

// type MyReadonly<T> = {
//     readonly [P in keyof T]: T[P]
// }

// const todo: MyReadonly<Todo> = {
//     title: "Hey",
//     description: "foobar"
// }
// todo.title = '123'

// end2------------------------------

// 3.元组转换为对象
// const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const;
// type TupleToObject<T extends readonly (number | string | symbol)[]> = {
//     [K in T[number]]: K
// }
// type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

// end3------------------------------

// 4.元组转合集

// type Arr = ['1', '2', '3'];

// type TupleToUnion<T extends any[]> = T[number];

// type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
