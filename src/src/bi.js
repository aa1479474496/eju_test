import Vue from 'vue'
import env from '@/config/env';

window.bi = {
  user: {},     // 用户信息
  dash: null,   // 仪表盘数据
  chart: null,  // 图表数据
  env: env,     // 环境变量

  isArray(val) {
    return Array.isArray(val);
  },
  isString(val) {
    return typeof val == 'string';
  },
  isObject(val) {
    return typeof val == 'object' && val != null && !Array.isArray(val);
  },
  isEmpty(val) {
    switch (typeof val) {
      case 'string':
        return val.trim() == '' || val.trim() == '0';
        break;
      case 'object':
        let _val = JSON.stringify(val);
        return _val == 'null' || _val == '[]' || _val == '{}';
        break;
      case 'number':
        return val == 0;
        break;
      case 'undefined':
        return true;
        break;
      case 'boolean':
        return val == false;
        break;
      default:
        return false;
    }
  },
  loadJs(url) {
    let hd = document.getElementsByTagName('head')[0],
      js = document.createElement('script');
    js.src = url;
    js.type = "text/JavaScript";
    if (js.addEventListener) {
      js.addEventListener("load", function () {
        
      }, false);
    }
    hd.appendChild(js);
  },
  /**
   * 清除数据
   * @param {*} data 
   */
  clear(data) {
    if (!data) {
      return data;
    }

    if (data instanceof Array) {
      data.length = 0;
      data.push(...[]);
    } else {
      for (let k in data) {
        delete data[k];
      }
    }
  },

  /**
   * 深拷贝
   * @param {*} data 
   */
  copy(data) {
    if (data == undefined) {
      return data;
    }

    // 复制数据
    let _data = JSON.parse(JSON.stringify(data));

    // 复制方法
    for (let k in data) {
      if (typeof data[k] == 'function') {
        _data[k] = data[k];
      }
    }

    return _data;
  },

  cookie: {
    //设置cookie
    set(cname, cvalue, exdays, path = '/') {
      let cstr = cname + "=" + cvalue + '; path=' + path;
      if (exdays) {
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        cstr += "; " + expires
      }
      document.cookie = cstr;
    },
    //获取cookie
    get(cname) {
      let name = cname + "=";
      let ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
      }
      return "";
    },
    //清除cookie
    clear(name) {
      this.set(name, "", -1);
    }
  },

  /**
   * toggle 样式
   */
  toggle() {
    let target = window.event.srcElement;
    if (target.nodeName == 'SPAN') {
      target.parentNode.parentNode.classList.toggle('toggleclass');
      target.classList.toggle('el-icon-arrow-right');
    } else if (target.nodeName == 'DIV') {
      target.parentNode.classList.toggle('toggleclass');
      target.children[0].classList.toggle('el-icon-arrow-right');
    }
  },

  /**
   * 深合并
   * @param {*} obj1 
   * @param {*} obj2 
   */
  deepMerge(obj1, obj2) {
    for (let key in obj2) {
      if (obj1[key] == undefined || obj1[key] == null) {
        //console.log('key:' + key + ' undefined');
        obj1[key] = obj2[key];
      } else if (bi.isArray(obj1[key]) && bi.isObject(obj2[key])) {
        //console.log('key:' + key + ' Array1 loop');
        obj1[key].forEach(item => {
          this.deepMerge(item, obj2[key]);
        });
      } else if (bi.isArray(obj2[key]) && bi.isObject(obj1[key])) {
        //console.log('key:' + key + ' Array2 loop');
        let tmp = obj1[key];
        obj1[key] = obj2[key];
        obj1[key].forEach(item => {
          this.deepMerge(item, tmp);
        });
      } else if (bi.isObject(obj1[key]) && bi.isObject(obj2[key])) {
        //console.log('key:' + key + ' Object');
        this.deepMerge(obj1[key], obj2[key]);
      } else {
        //console.log('key:' + key + ' Assign');
        obj1[key] = obj2[key];
      }
    }
  },

  /**
   * 格式化数据格式
   * @param {*} data 
   * @param {*} type 
   */
  formatType(data, type) {
    switch (type) {
      case 1:
      case 'string':
        return String(data);
      case 2:
      case 'number':
        let _num = Number(data)
        return isNaN(_num) ? 0 : _num;
      case 3:
      case 'boolean':
        return Boolean(data);
      default:
        return data;
    }
  },

  /**
   * 返回格式化数
   * @param {*} data 
   * @param {*} args 
   * formatData(data, 'max', 'field');
   * formatData(data, 'min', 'field');
   * formatData(data, 'col', 'field', type);
   * formatData(data, 'pair', 'filedkey', 'fieldval', val_type);
   * formatData(data, 'group', 'field1', 'field2', 'field3', ...);
   * formatData(data, 'group', ['field1', 1], ['field2', 2], 'field3', ...);
   * formatData(data, 'kv', 'k1', 'v1', 'k2', 'v2', ...);
   * formatData(data, 'kv', ['k1', 'v1', 't1'], ['k2', 'v2', 't2'], ...);
   * formatData(data, 'tree', 'TODO');
   */
  formatData(data, ...args) {
    let type = args[0];
    let ret = [];
    let val, key, keys;
    switch (type) {
      case 'keys':
        var ekeys = args[1] || [];
        for (let k in data) {
          if (ekeys.indexOf(k) == -1) {
            ret.push(k);
          }
        }
        break;
      case 'vals':
        var ekeys = args[1] || [];
        var _type = args[2] || 0;
        for (let k in data) {
          if (ekeys.indexOf(k) == -1) {
            ret.push(this.formatType(data[k], _type));
          }
        }
        break;
      case 'one':
        var k = args[1];
        var _type = args[2] || 0;
        if (Array.isArray(data)) {
          ret = data[0][k] || 0;
        } else {
          ret = data[k] || 0;
        }
        ret = this.formatType(ret, _type);
        break;
      case 'max':
        let maxv = Number.MIN_VALUE;
        keys = args[1];
        if (!Array.isArray(keys)) {
          keys = [keys];
        }
        data.forEach(d => {
          keys.forEach(v => {
            maxv = Math.max(maxv, d[v] || Number.MIN_VALUE);
          })
        });
        ret = maxv;
        break;
      case 'min':
        let minv = Number.MAX_VALUE;
        keys = args[1];
        if (!Array.isArray(keys)) {
          keys = [keys];
        }
        data.forEach(d => {
          keys.forEach(v => {
            minv = Math.min(minv, d[v] || Number.MAX_VALUE);
          })
        });
        ret = minv;
        break;
      case 'col':
        key = args[1];
        var _type = args[2] || 0;
        for (let i = 0; i < data.length; i++) {
          ret.push(this.formatType(data[i][key], _type));
        }
        break;
      case 'pair':
        ret = {};
        key = args[1];
        val = args[2];
        var _type = args[3] || 0;
        for (let i = 0; i < data.length; i++) {
          ret[data[i][key]] = this.formatType(ret[data[i][val]], _type);
        }
        break;
      case 'group':
        keys = args.slice(1);
        for (let i = 0; i < data.length; i++) {
          let row = [];
          for (let j = 0; j < keys.length; j++) {
            if (Array.isArray(keys[j])) {
              //兼容这种模式: formatData(data, 'group', ['field1', 1],['field2',0], ['field3', 1],...);
              row.push(this.formatType(data[i][keys[j][0]], keys[j][1]));
            } else {
              //兼容这种模式: formatData(data, 'group', 'field1', 'field2', 'field3', ...);
              row.push(data[i][keys[j]]);
            }
          }
          ret.push(row);
        }
        break;
      case 'kv':
        keys = args.slice(1);
        for (let i = 0; i < data.length; i++) {
          let row = {};
          if (Array.isArray(keys[0])) {
            //兼容这种模式: formatData(data, 'kv', ['k1', 'v1', 1], ['k2', 'v2', 2], ...);
            for (let j = 0; j < keys.length; j++) {
              row[keys[j][0]] = this.formatType(data[i][keys[j][1]], keys[j][2]);
            }
          } else {
            //兼容这种模式: formatData(data, 'kv', 'k1', 'v1', 'k2', 'v2', ...);
            for (let j = 0; j < keys.length; j += 2) {
              row[keys[j]] = data[i][keys[j + 1]];
            }
          }
          ret.push(row);
        }
        break;
      case 'tree':

        break;
    }

    return ret;
  },

  formatSplit(_min, _max, _len) {
    _min = _max / 10 > _min ? 0 : _min;
    _min = _min > 0 ? 0 : _min;

    let _pow = Math.pow(10, Math.floor(Math.log10(_max)));
    _max = Math.ceil(_max / _pow) * _pow;
    _pow = _pow / 10;
    _min = Math.floor(_min / _pow) * _pow;
    let _split = Math.ceil((_max - _min) / _pow / _len) * _pow;
    _max = _min + _len * _split;
    return { 'min': _min, 'max': _max, 'split': _split, 'len': _len };
  },

  // LOG输出
  log(...args) {
    console.log(...args);
  },
  error(...args) {
    console.error(args);
  },

  //可以存放一些临时测试数据
  temp: {

  },
  /*  
    * Unix时间戳转换成日期格式  FormatDateTime('1497232433000')  
    * @param unixTime Unix时间戳  
    * @return yyyy-MM-dd HH:mm:ss  
    */
  date(format, timestamp) {
    var jsdate, f
    var txtWords = [
      'Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur',
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    var formatChr = /\\?(.?)/gi
    var formatChrCb = function (t, s) {
      return f[t] ? f[t]() : s
    }
    var _pad = function (n, c) {
      n = String(n)
      while (n.length < c) {
        n = '0' + n
      }
      return n
    }
    f = {
      d: function () {
        return _pad(f.j(), 2)
      },
      D: function () {
        return f.l()
          .slice(0, 3)
      },
      j: function () {
        return jsdate.getDate()
      },
      l: function () {
        return txtWords[f.w()] + 'day'
      },
      N: function () {
        return f.w() || 7
      },
      S: function () {
        var j = f.j()
        var i = j % 10
        if (i <= 3 && parseInt((j % 100) / 10, 10) === 1) {
          i = 0
        }
        return ['st', 'nd', 'rd'][i - 1] || 'th'
      },
      w: function () {
        return jsdate.getDay()
      },
      z: function () {
        var a = new Date(f.Y(), f.n() - 1, f.j())
        var b = new Date(f.Y(), 0, 1)
        return Math.round((a - b) / 864e5)
      },

      W: function () {
        var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3)
        var b = new Date(a.getFullYear(), 0, 4)
        return _pad(1 + Math.round((a - b) / 864e5 / 7), 2)
      },

      F: function () {
        return txtWords[6 + f.n()]
      },
      m: function () {
        return _pad(f.n(), 2)
      },
      M: function () {
        return f.F()
          .slice(0, 3)
      },
      n: function () {
        return jsdate.getMonth() + 1
      },
      t: function () {
        return (new Date(f.Y(), f.n(), 0))
          .getDate()
      },

      L: function () {
        var j = f.Y()
        return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0
      },
      o: function () {
        var n = f.n()
        var W = f.W()
        var Y = f.Y()
        return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0)
      },
      Y: function () {
        return jsdate.getFullYear()
      },
      y: function () {
        return f.Y()
          .toString()
          .slice(-2)
      },

      a: function () {
        return jsdate.getHours() > 11 ? 'pm' : 'am'
      },
      A: function () {
        return f.a()
          .toUpperCase()
      },
      B: function () {
        var H = jsdate.getUTCHours() * 36e2
        var i = jsdate.getUTCMinutes() * 60
        var s = jsdate.getUTCSeconds()
        return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3)
      },
      g: function () {
        return f.G() % 12 || 12
      },
      G: function () {
        return jsdate.getHours()
      },
      h: function () {
        return _pad(f.g(), 2)
      },
      H: function () {
        return _pad(f.G(), 2)
      },
      i: function () {
        return _pad(jsdate.getMinutes(), 2)
      },
      s: function () {
        return _pad(jsdate.getSeconds(), 2)
      },
      u: function () {
        return _pad(jsdate.getMilliseconds() * 1000, 6)
      },

      e: function () {
        var msg = 'Not supported (see source code of date() for timezone on how to add support)'
        throw new Error(msg)
      },
      I: function () {
        var a = new Date(f.Y(), 0)
        var c = Date.UTC(f.Y(), 0)
        var b = new Date(f.Y(), 6)
        var d = Date.UTC(f.Y(), 6)
        return ((a - c) !== (b - d)) ? 1 : 0
      },
      O: function () {
        var tzo = jsdate.getTimezoneOffset()
        var a = Math.abs(tzo)
        return (tzo > 0 ? '-' : '+') + _pad(Math.floor(a / 60) * 100 + a % 60, 4)
      },
      P: function () {
        var O = f.O()
        return (O.substr(0, 3) + ':' + O.substr(3, 2))
      },
      T: function () {
        return 'UTC'
      },
      Z: function () {
        return -jsdate.getTimezoneOffset() * 60
      },

      c: function () {
        return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb)
      },
      r: function () {
        return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb)
      },
      U: function () {
        return jsdate / 1000 | 0
      }
    }

    var _date = function (format, timestamp) {
      jsdate = (timestamp === undefined ? new Date() // Not provided
        : (timestamp instanceof Date) ? new Date(timestamp) // JS Date()
          : new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
      )
      console.log(format);
      return format.replace(formatChr, formatChrCb)
    }

    return _date(format, timestamp)
  },
  parseTime(time, cFormat) {
    if (arguments.length === 0) {
      return null;
    }
    const format = cFormat || "y-m-d h:i:s";
    let date;
    if (typeof time === "object") {
      date = time;
    } else {
      if (("" + time).length === 10) time = parseInt(time) * 1000;
      date = new Date(time);
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    };
    const time_str = format.replace(/(y|m|d|h|i|s|a)+/g, (result, key) => {
      let value = formatObj[key];
      if (key === "a")
        return ["一", "二", "三", "四", "五", "六", "日"][value - 1];
      if (result.length > 0 && value < 10) {
        value = "0" + value;
      }
      return value || 0;
    });
    return time_str;
  }
}

export default {
  install() {
    Vue.prototype.$bi = bi;
  }
}