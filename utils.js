// let utils = {
//   arrayUnique(arr, keys) {
//     let obj = {};
//     let newArr = [];
//     function getVal(item, keys) {
//       if (Object.prototype.toString.call(keys) == "[object Array]") {
//         // console.log("qq");
//         let val = [];
//         keys.forEach(key => {
//           val.push(item[key]);
//         });
//         return val.join("|");
//       }
//       return item[keys];
//     }

//     let len = arr.length;
//     console.log("len", len);
//     for (let i = 0; i < len; i++) {
//       let key = getVal(arr[i], keys);
//       console.log("i", i);
//       if (obj[key]) {
//         continue;
//       }
//       obj[key] = true;
//       newArr.push(arr[i]);
//     }
//     return newArr;
//   }
// };

// // let test_arr = [];

// let test_arr = [
//   {
//     field: "BasePrice",
//     title: "出让底价(求和)",
//     rule: "sum",
//     type: "stat",
//     label: "求和",
//     isSegment: 0,
//     segmentType: "",
//     dataType: "number"
//   },
//   {
//     field: "BasePrice",
//     title: "出让底价(求和)",
//     rule: "sum",
//     type: "stat",
//     label: "求和",
//     isSegment: 0,
//     segmentType: "",
//     dataType: "number"
//   },
//   {
//     field: "sCityName",
//     title: "城市",
//     rule: "=",
//     type: "group",
//     label: "",
//     isSegment: 0,
//     segmentType: "",
//     dataType: "string"
//   },
//   {
//     field: "BasePrice",
//     label: "求和",
//     rule: "getStatSum",
//     title: "出让底价(分段)",
//     type: "stat",
//     dataType: "string"
//   },
//   {
//     field: "BasePrice",
//     label: "求和",
//     rule: "getStatSum",
//     title: "求和",
//     type: "stat",
//     dataType: "number"
//   },
//   {
//     title: "id",
//     type: "stat",
//     dataType: "number"
//   }
// ];

// let keys = ["field", "title"];
// let result = utils.arrayUnique(test_arr, keys);
// console.log("result", result.length);


// var Quo = function(string) {
//   this.status = string;
// }
// Quo.prototype.getStatus = function() {
//   return this.status;
// }
// var myQuo = new Quo('test');
// console.log('::::', myQuo.getStatus());


function thousandsFormat(num, precision = 'default') {
  if (typeof num == "string" && !num.trim()) {
    return "";
  }
  if (num == undefined) {
    return;
  }

  num = isNaN(Number(num)) ? num : parseFloat(num);
  if (num.toString().indexOf(".") != -1 && precision == 'default') {
    let n = num.toString().indexOf(".");
    console.log('n:::', num, n);
    let len = num.toString().length;
    // if (precision != 'default') {
    //   precision = len - n - 1;
    // }
    precision = len - n - 1;

  }
  if (precision != 'default') {
    // console.log('test:', num, precision, num.toFixed(precision));
    console.log('test:', num, precision, num.toFixed(precision));
  }
  num = (num.toFixed ? num.toFixed(precision) : num) + "";



  if (!num.includes(".")) num += ".";
  return num;
  // return num
  //   .replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
  //     return $1 + ",";
  //   })
  //   .replace(/\.$/, "");
}
console.log('3.15', thousandsFormat(3.15, 1));
console.log('315', thousandsFormat(315));



// function ToFixed(data,val){
//   var numbers = '';
//   // 保留几位小数后面添加几个0
//   for (var i = 0; i < val; i++) {
//       numbers += '0';
//   }
//   var s = 1 + numbers;
//   // 如果是整数需要添加后面的0
//   var spot = "." + numbers;
//   // Math.round四舍五入
//   //  parseFloat() 函数可解析一个字符串，并返回一个浮点数。
//   var value = Math.round(parseFloat(data) * s) / s;
//   // 从小数点后面进行分割
//   var d = value.toString().split(".");
//   if (d.length == 1) {
//       value = value.toString() + spot;
//       return value;
//   }
//   if (d.length > 1) {
//       if (d[1].length < 2) {
//           value = value.toString() + "0";
//       }
//       return value;
//   }
// }
// console.log('2.335, 2:::',ToFixed(2.335,2)) //2.34 
// console.log('2.35, 1:::',ToFixed(2.35,1)) //2.34 
// console.log('2.455, 1:::',ToFixed(2.455,1)) //2.34 


function ToFixed(num, s) {
  var changenum = (parseInt(num * Math.pow(10, s) + 0.5) / Math.pow(10, s)).toString();
  index = changenum.indexOf(".");
  if (index < 0 && s > 0) {
    changenum = changenum + ".";
    for (i = 0; i < s; i++) {
      changenum = changenum + "0";
    }
  } else {
    index = changenum.length - index;
    for (i = 0; i < (s - index) + 1; i++) {
      changenum = changenum + "0";
    }
  }
  return changenum;
}

console.log('2.335, 2:::', ToFixed(2.335, 2)) //2.34 
console.log('2.35, 1:::', ToFixed(2.35, 1)) //2.4 
console.log('2.455, 1:::', ToFixed(2.455, 1)) //2.5
console.log('455, 1:::', ToFixed(455, 1)) //455.0
console.log('123.5, 0:::', ToFixed(123.5, 0)) //124
console.log('0.005, 2:::', ToFixed(0.005, 2)) //0.01

let stats = ['平均面积', '平均租金'];
// let stats = ['平均面积'];
let quantile = 0.4;
let arr = [
  { 城市: "上海", 平均面积: 80.09, 平均租金: 2807.86 },
  { 城市: "南京", 平均面积: 76.76, 平均租金: 3618.70 },
  { 城市: "武汉", 平均面积: -3618.70, 平均租金: -76.76 }
]
/**
 * 
 * @param {string} rev: 'asc' |  'desc';   升序 | 降序
 * 
 */
function getCenter(arr, quantile, stats, rev = 'asc') {
  let pointArr = [];
  stats.forEach(stat => {
    let _arr = arr.map(item => item[stat]).sort(compare(rev));
    pointArr.push(parseFloat(getPoint(_arr, quantile).toFixed(3)));
  });

  function getPoint(list, quantile) {
    let len = list.length;
    let Y = (len + 1) * quantile;
    let N = Math.floor(Y);
    if (N > len) {
      return list[len - 1];
    }

    if (N < 1) {
      return list[0];
    }
    //  N = N > len ? len : N;
     let nextN = N + 1;
     return list[N] + (Y - N) * (list[nextN] - list[N]);
  }

  function compare(rev) {
    return function(a, b) {
      let aValue = parseFloat(a);
      let bValue = parseFloat(b);
      if (rev == 'asc') {
        return aValue - bValue;
      }
      return bValue - aValue;
    }
  }

  return pointArr;
}

let res = getCenter(arr, quantile, stats);
console.log('res::', res);
// console.log('----arr', arr);



let _arr = [1,2,-3,-10];
let _res = _arr.sort(function(a, b) {
  // return a - b;
  return b - a;
});

console.log('-----', _res);




























