function isEqual(origin, target) {
  // 判断数据有没有发生改变
  if (typeof target !== "object") {
    //target不是对象/数组
    return origin === target; //直接返回全等的比较结果
  }

  if (typeof origin !== "object") {
    //origin不是对象/数组
    return false; //直接返回false
  }

  // console.log("origin", typeof origin, typeof target);
  for (let key of Object.keys(target)) {
    //遍历target的所有自身属性的key
    //   console.log(" Object.keys(target)", Object.keys(target));
    if (!isEqual(origin[key], target[key])) {
      //递归比较key对应的value，
      //value不等，则两对象不等，结束循环，退出函数，返回false
      //   console.log("key", origin[key], target[key]);
      return false;
    }
  }
  //遍历结束，所有value都深度比较相等，则两对象相等
  return true;
}

let arr1 = [{ name: 1 }];
let arr2 = [];
let flag = isEqual(arr1, arr2);
console.log("flag", flag);

// var compareObj = {
//   // 比较两个对象是否相等
//   compare: function(oldData, newData) {
//     // 类型为基本类型时,如果相同,则返回true
//     if (oldData === newData) return true;
//     if (
//       compareObj.isObject(oldData) &&
//       compareObj.isObject(newData) &&
//       Object.keys(oldData).length === Object.keys(newData).length
//     ) {
//       // 类型为对象并且元素个数相同
//       // 遍历所有对象中所有属性,判断元素是否相同
//       for (const key in oldData) {
//         if (oldData.hasOwnProperty(key)) {
//           if (!compareObj.compare(oldData[key], newData[key])) {
//             // 对象中具有不相同属性 返回false
//             return false;
//           }
//         }
//       }
//     } else if (
//       compareObj.isArray(oldData) &&
//       compareObj.isArray(oldData) &&
//       oldData.length === newData.length
//     ) {
//       // 类型为数组并且数组长度相同
//       for (let i = 0, length = oldData.length; i < length; i++) {
//         if (!compareObj.compare(oldData[i], newData[i])) {
//           // 如果数组元素中具有不相同元素,返回false
//           return false;
//         }
//       }
//     } else {
//       // 其它类型,均返回false
//       return false;
//     }
//     // 走到这里,说明数组或者对象中所有元素都相同,返回true
//     return true;
//   },
//   // 判断此类型是否是Array类型
//   isObject: function(obj) {
//     return Object.prototype.toString.call(obj) === "[object Object]";
//   },
//   // 判断此对象是否是Object类型
//   isArray: function(arr) {
//     return Object.prototype.toString.call(arr) === "[object Array]";
//   }
// };

// let arr1 = [{ name: 1 }];
// let arr2 = [];
// let flag = compareObj.compare(arr1, arr2);
// console.log("flag", flag);
