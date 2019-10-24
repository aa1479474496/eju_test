let isDone: boolean = false;
let decLiteral: number = 6;
let octalLiteral: number = 0o744;
let nickName: string ='bob';
let age: number = 17;
let sentence: string = `Hello, my name is ${nickName}. I will be ${age + 1} years old next month!`;
let test: number = age - 1;
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3]; // 泛型

// 元组 tuple
let x: [string, number];
x = ['hello', 10];

// 枚举
enum Color { Red, Green, Blue };
let c: Color = Color.Green;

enum Color2 { Red = 2, Green, Blue };
let c2: Color2 = Color2.Green;

enum Color3 { Red = 1, Green = 2, Blue = 4 };
let c3: Color3 = Color3.Green;
let colorName: string = Color3[2]; // 知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字

console.log(c3);
console.log(colorName);

// any
let notSure: any = 4;
notSure = 'maybe a string instead';
notSure = false;
let listAny: any[] = [1, true, 'list'];
listAny[1] = 'any';

console.log(listAny);

// void
function warnUser(): void {
    console.log('This is my warning message!');
}
warnUser();

// 接口
function printLabel(labelObj: { label: string }) {
    console.log(labelObj.label);
}
let myObj = { size: 10, label: 'Size 10 Object' };
printLabel(myObj);

interface LabelledValue {
    label: string;
}
let myObj2 = { size: 9, label: '12' };
printLabel(myObj2);

interface SquareConfig {
    color?: string;
    width?: number; 
}

function createSqure(config: SquareConfig): { color: string; area: number } {
    let newSqure = { color: 'white', area: 100 };

    if (config.color) {
        newSqure.color = config.color;
    }

    if (config.width) {
        newSqure.area = config.width * config. width;
    }
    return newSqure;
}
let mySqure = createSqure({ color: 'black' });
console.log('squre', mySqure);

// 只读属性
interface Point {
    readonly x: number;
    readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
// p1.x = 5;  // error


let arr1: number[] = [1, 2, 3];
let ro: ReadonlyArray<number> = arr1;
// ro[0] = 12; // error
// ro.push(5); // error
// ro.length = 100; // error
// arr1 = ro;