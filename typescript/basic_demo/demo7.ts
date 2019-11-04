function identity1<T>(arg: T): T {
  return arg;
}

let output1 = identity1<string>("message");
let output11 = identity1(12);

function identity2<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}

function identity3<T>(arg: Array<T>): Array<T> {
  console.log(arg.length);
  return arg;
}

interface Lengthwise {
  length: number;
}
function identity4<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
// identity4(5); // error
identity4("a");

function create1<T>(c: { new (): T }): T {
  return new c();
}


class BeeKeeper {
    hasMark: boolean;
}

class ZoomKeeper {
    nameTag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZoomKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}
createInstance(Bee).keeper.hasMark;
createInstance(Lion).keeper.nameTag;
