// function identity1<T>(arg: T): T {
//   return arg;
// }

// let output1 = identity1<string>("message");
// let output11 = identity1(12);

// function identity2<T>(arg: T[]): T[] {
//   console.log(arg.length);
//   return arg;
// }

// function identity3<T>(arg: Array<T>): Array<T> {
//   console.log(arg.length);
//   return arg;
// }

// interface Lengthwise {
//   length: number;
// }
// function identity4<T extends Lengthwise>(arg: T): T {
//   console.log(arg.length);
//   return arg;
// }
// // identity4(5); // error
// identity4("a");

// function create1<T>(c: { new (): T }): T {
//   return new c();
// }


// class BeeKeeper {
//     hasMark: boolean;
// }

// class ZoomKeeper {
//     nameTag: string;
// }

// class Animal {
//     numLegs: number;
// }

// class Bee extends Animal {
//     keeper: BeeKeeper;
// }

// class Lion extends Animal {
//     keeper: ZoomKeeper;
// }

// function createInstance<A extends Animal>(c: new () => A): A {
//     return new c();
// }
// createInstance(Bee).keeper.hasMark;
// createInstance(Lion).keeper.nameTag;

interface Type1 {
  func1(): void;
  func2(): void;
}

interface Type2 {
  func3(): void;
  func2(): void;
}

class Type1Class implements Type1 {
  func1(): void {
    console.log('func1 run');
  }

  func2(): void {
    console.log('func2 run');
  }
}

class Type2Class implements Type2 {
  func3(): void {
    console.log('func3 run');
  }

  func2(): void {
    console.log('func2 run');
  }
}

function getSomeType(type: string): Type1Class | Type2Class {
  if (type == '1') {
    return new Type1Class();
  }

  if (type == '2') {
    return new Type2Class();
  }
}

// 如果一个值的类型是 A | B，我们能够 确定的是它包含了 A 和 B中共有的成员。 这个例子里， Type1Class具有一个func1成员。 我们不能确定一个 Type1Class | Type2Class类型的变量是否有func1方法。 如果变量在运行时是Type1Class类型，那么调用type.func1()就出错了。

let type = getSomeType('1');
type.func2();
// type.func1(); // error