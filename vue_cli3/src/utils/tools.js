import moment from "moment";
class Tools {
  //是否mac系统
  static isMac() {
    return navigator.platform.includes("Mac");
  }
  static myBrowser() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
      //判断是否Opera浏览器
      return "Opera";
    }
    if (userAgent.indexOf("Firefox") > -1) {
      //判断是否Firefox浏览器
      return "FF";
    }
    if (userAgent.indexOf("Chrome") > -1) {
      return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
      //判断是否Safari浏览器
      return "Safari";
    }
    if (
      userAgent.indexOf("compatible") > -1 &&
      userAgent.indexOf("MSIE") > -1 &&
      !isOpera
    ) {
      //判断是否IE浏览器
      return "IE";
    }
  }

  static getType(obj) {
    let toString = Object.prototype.toString;
    let map = {
      "[object Boolean]": "boolean",
      "[object Number]": "number",
      "[object String]": "string",
      "[object Function]": "function",
      "[object Array]": "array",
      "[object Date]": "date",
      "[object RegExp]": "regExp",
      "[object Undefined]": "undefined",
      "[object Null]": "null",
      "[object Object]": "object"
    };
    if (obj instanceof Element) {
      return "element";
    }
    return map[toString.call(obj)];
  }

  static deepClone(data) {
    let type = this.getType(data);
    let obj;
    if (type === "array") {
      obj = [];
    } else if (type === "object") {
      obj = {};
    } else {
      //不再具有下一层次
      return data;
    }
    if (type === "array") {
      for (let i = 0, len = data.length; i < len; i++) {
        obj.push(this.deepClone(data[i]));
      }
    } else if (type === "object") {
      for (let key in data) {
        obj[key] = this.deepClone(data[key]);
      }
    }
    return obj;
  }

  static isEqual(oldData, newData) {
    if (oldData === newData) return true;

    let oldType = this.getType(oldData);
    let newType = this.getType(newData);
    if (
      oldType === "object" &&
      newType === "object" &&
      Object.keys(oldData).length === Object.keys(newData).length
    ) {
      // 类型为对象并且元素个数相同
      // 遍历所有对象中所有属性,判断元素是否相同
      for (const key in oldData) {
        if (oldData.hasOwnProperty(key)) {
          if (!this.isEqual(oldData[key], newData[key])) {
            // 对象中具有不相同属性 返回false
            return false;
          }
        }
      }
    } else if (
      oldType === "array" &&
      newType === "array" &&
      oldData.length === newData.length
    ) {
      // 类型为数组并且数组长度相同
      for (let i = 0, length = oldData.length; i < length; i++) {
        if (!this.isEqual(oldData[i], newData[i])) {
          // 如果数组元素中具有不相同元素,返回false
          return false;
        }
      }
    } else {
      // 其它类型,均返回false
      return false;
    }
    // 走到这里,说明数组或者对象中所有元素都相同,返回true
    return true;
  }

  /**
   * 格式化日期,可根据自己的需要自定义想要的日期格式
   * 1:yyyy年mm月dd日
   * 2:yyyy-mm-dd
   * 3:yyyy/mm/dd
   * 4:yyyy.mm.dd
   */
  static formatDate(date, fmt) {
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return fmt;
  }

  static formatPicker(date, fmt = "/") {
    return moment(date).format(`YYYY${fmt}MM${fmt}DD`);
  }

  static supportStorage() {
    const ALLOW_STORAGE = "ALLOW_STORAGE";

    return (
        window.localStorage &&
        (window.localStorage.setItem(ALLOW_STORAGE, ALLOW_STORAGE),
        window.localStorage.getItem(ALLOW_STORAGE) == ALLOW_STORAGE)
      );
  }

  /**
   * 将对象转为css style格式
   let obj = {
    fontSize: '15px',
    color: '#f00'
  }
  转换结果为 fontSize:15px;color:#f00;
   */

  static formatStyle(obj) {
    let str = '';
    Object.keys(obj).forEach(k => {
      let v = obj[k];
      str += `${k}:${v};`
    });
    return str;
  }
}

export default Tools;
