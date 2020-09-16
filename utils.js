let utils = {
  arrayUnique(arr, keys) {
    let obj = {};
    let newArr = [];
    function getVal(item, keys) {
      if (Object.prototype.toString.call(keys) == "[object Array]") {
        // console.log("qq");
        let val = [];
        keys.forEach(key => {
          val.push(item[key]);
        });
        return val.join("|");
      }
      return item[keys];
    }

    let len = arr.length;
    console.log("len", len);
    for (let i = 0; i < len; i++) {
      let key = getVal(arr[i], keys);
      console.log("i", i);
      if (obj[key]) {
        continue;
      }
      obj[key] = true;
      newArr.push(arr[i]);
    }
    return newArr;
  }
};

// let test_arr = [];

let test_arr = [
  {
    field: "BasePrice",
    title: "出让底价(求和)",
    rule: "sum",
    type: "stat",
    label: "求和",
    isSegment: 0,
    segmentType: "",
    dataType: "number"
  },
  {
    field: "BasePrice",
    title: "出让底价(求和)",
    rule: "sum",
    type: "stat",
    label: "求和",
    isSegment: 0,
    segmentType: "",
    dataType: "number"
  },
  {
    field: "sCityName",
    title: "城市",
    rule: "=",
    type: "group",
    label: "",
    isSegment: 0,
    segmentType: "",
    dataType: "string"
  },
  {
    field: "BasePrice",
    label: "求和",
    rule: "getStatSum",
    title: "出让底价(分段)",
    type: "stat",
    dataType: "string"
  },
  {
    field: "BasePrice",
    label: "求和",
    rule: "getStatSum",
    title: "求和",
    type: "stat",
    dataType: "number"
  },
  {
    title: "id",
    type: "stat",
    dataType: "number"
  }
];

let keys = ["field", "title"];
let result = utils.arrayUnique(test_arr, keys);
console.log("result", result.length);


var Quo = function(string) {
  this.status = string;
}
Quo.prototype.getStatus = function() {
  return this.status;
}
var myQuo = new Quo('test');
console.log('::::', myQuo.getStatus());
