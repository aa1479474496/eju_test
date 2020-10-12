// 1.判断对象的数据类型

// const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target);
// const isArray = isType('Array');
// console.log('isArray:::', isArray([123]));

function isType(type) {
  return function (target) {
    return `[object ${type}]` === Object.prototype.toString.call(target);
  }
}

function isArray(target) {
  return isType('Array')(target);
}

// console.log('isArray:::2', isArray([456]));

//2.循环实现数组 filter 方法
const selfFilter = function (fn, context) {
  let arr = Array.prototype.slice.call(this);
  let filteredArr = [];
  for (let i = 0; i < arr.length; i++) {
    // console.log('arr[i]', arr[i]);
    if (!arr.hasOwnProperty(i)) {
      continue;
    }
    console.log('arr[i]', arr[i]);

    fn.call(context, arr[i], i, this) && filteredArr.push(arr[i]);
  }
  console.log('----filteredArr', filteredArr);
  return filteredArr;
}
let arr = [1,2,3];

let _arr = selfFilter.call(arr, function(item) {
  return item > 2;
});
console.log('test::', _arr);

// Array.prototype.selfFilter = selfFilter;
// let arr = [1,2,3];
// let _arr = arr.selfFilter(function(item) {
//   console.log('item:', item);
//   return item > 1;
// });
// console.log('_arr:::', _arr);
