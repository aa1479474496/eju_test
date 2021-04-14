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
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms || 1));
}

const arr = [];
const stack = [];

// type Middleware<T> = (context: T, next: Koa.Next) => any;
stack.push(async (context, next) => {
  arr.push(1);
  await wait(1);
  await next();
  await wait(1);
  arr.push(6);
});

stack.push(async (context, next) => {
  arr.push(2);
  await wait(1);
  await next();
  await wait(1);
  arr.push(5);
});

stack.push(async (context, next) => {
  arr.push(3);
  await wait(1);
  await next();
  await wait(1);
  arr.push(4);
});

await compose(stack)({});


/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */
function compose(middleware) {
  // 省略部分代码
  return function (context, next) {
    // last called middleware #
    let index = -1;
    return dispatch(0);
    function dispatch(i) {
      if (i <= index)
        return Promise.reject(new Error("next() called multiple times"));
      index = i;
      let fn = middleware[i];
      if (i === middleware.length) fn = next;
      if (!fn) return Promise.resolve();
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
}



