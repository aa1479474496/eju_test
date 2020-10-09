class Tools {
  static toFixed(num, s) {
    // js自带的toFixed有精度丢失的问题, 如3.15保留一位精度是 3.1， 实际想要的是3.2
    let preNum = num >= 0 ? 0.5 : -0.5;
    let changenum = (parseInt(num * Math.pow(10, s) + preNum) / Math.pow(10, s)).toString();
    let index = changenum.indexOf(".");
    if (index < 0 && s > 0) {
      changenum = changenum + ".";
      for (let i = 0; i < s; i++) {
        changenum = changenum + "0";
      }
    } else {
      index = changenum.length - index;
      for (let i = 0; i < (s - index) + 1; i++) {
        changenum = changenum + "0";
      }
    }
    return changenum;
  }

  static numberFormat(num) {
    return Intl.NumberFormat().format(num);
  }

  static thousandsFormat(num, precision = 'default') {
    if (typeof num == "string" && !num.trim()) {
      return "";
    }
    if (num == undefined) {
      return;
    }

    if (isNaN(num)) {
      return num;
    }

    if (precision == 'default') {
      return Tools.numberFormat(num);
    }

    num = Tools.toFixed(parseFloat(num), precision) + '';

    if (!num.includes(".")) num += ".";
    return num
      .replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
        return $1 + ",";
      })
      .replace(/\.$/, "");


  }

  static nativeTofixed(num, pre) {
    return num.toFixed(pre);
  }
}



let testData = [
  [2.335, 2],
  [2.35, 1],
  [2.455, 1],
  [455, 1],
  [-2.455, 1],
  [-2.455, 2],
  [-2.454, 2],
  [-246.33, 1],
  [-246.36, 1],
  [-2.457, 2]
]

testData.forEach(item => {
  let rewrite = Tools.thousandsFormat(item[0], item[1]);
  let native = Tools.nativeTofixed(item[0], item[1]);
  console.log(item[0] + '-' + item[1], '-|-rewrite', rewrite, ';-|-native', native);
})

