bi.compile = {
  id: 0,
  name: "",
  type: "",
  setting: {},
  list: [],
  groups: [],
  fields1: [],
  fields2: [],
  option: {},
  ftitles: [],
  ftitles1: [],
  ftitles2: [],
  gtitles: [],
  gvalues1: [],
  debug: false,

  setInfo(data) {
    this.id = data.id;
    this.type = data.type;
    this.name = data.name;
    this.groups = data.groups;
    this.fields1 = data.fields1 || [];
    this.fields2 = data.fields2 || [];
    this.chart = data.chart;
    this.shownum = data.shownum;
    this.data = data.data;

    // 事件
    var resizeTimer = null;
    $(window).resize(function(){
        if (resizeTimer) {
            clearTimeout(resizeTimer)
        }
        resizeTimer = setTimeout(function(){
            data.chart.resize();
        }, 200);
    });

    this.fields = [];
    this.fields1.forEach(item => {
      item.chart = 'line';
      item.axis = 0;
      var tmp = this.split(item.title, 5);
      item.min = tmp.min;
      item.max = tmp.max;
      item.int = true;
      this.fields.push(item);
    });
    this.fields2.forEach(item => {
      item.chart = 'bar';
      item.axis = 1;
      var tmp = this.split(item.title, 5);
      item.min = tmp.min;
      item.max = tmp.max;
      item.int = true;
      this.fields.push(item);
    });

    this.gtitles = bi.formatData(this.groups, 'col', 'title', 'string');
    if (this.gtitles.length > 0) {
      this.gvalues1 = bi.formatData(this.data, 'col', this.groups[0].title, 'string');
    } else {
      this.gvalues1 = [];
    }
    this.ftitles = bi.formatData(this.fields, 'col', 'title', 'string');
    this.ftitles1 = bi.formatData(this.fields1, 'col', 'title', 'string');
    this.ftitles2 = bi.formatData(this.fields2, 'col', 'title', 'string');
  },

  keywords: [
    [/\$id/gi, "_this.id"],
    [/\$legend/gi, "_this.ftitles"],
    [/\$category/gi, "_this.gvalues1"],
    [/\$fields1\(/gi, "_this.loop(_this.fields1,"],
    [/\$fields2\(/gi, "_this.loop(_this.fields2,"],
    [/\$fields\(/gi, "_this.loop(_this.fields,"],
    [/\$groups\(/gi, "_this.loop(_this.groups,"],
    [/\$list\(/gi, "_this.loop(_this.data,"],
    [/\$title/gi, "item.title"],
    [/\$one\(/gi, "bi.formatData(_this.data,'one',"],
    [/\$col\(/gi, "bi.formatData(_this.data,'col',"],
    [/\$pair\(/gi, "bi.formatData(_this.data,'pair',"],
    [/\$max\(/gi, "bi.formatData(_this.data,'max',"],
    [/\$min\(/gi, "bi.formatData(_this.data,'min',"],
    [/\$gp\(/gi, "bi.formatData(_this.data,'group',"],
    [/\$kv\(/gi, "bi.formatData(_this.data,'kv',"],

    //二维转一维
    [/\$rowkey\(/gi, "bi.formatData(_this.data[0],'keys',_this.gtitles"],
    [/\$rowval\(/gi, "bi.formatData(item,'vals',_this.gtitles"],

    //地图转换
    [/\$map\(/gi, "_this.map(_this.data"],
    [/\$split\(/gi, "_this.split("],

    //$f1, $f2, $f3, $f4 ...
    [/\$f(\d+)/gi, "_this.fields[$1].title"],
    [/\$fs(\d+)/gi, "_this.ftitles$1"],
    [/\$fall/gi, "_this.ftitles"],

    //$g1, $g2, $g3, $g4 ...
    [/\$g(\d+)/gi, "_this.groups[$1].title"],
    [/\$gall/gi, "_this.gtitles"],

    //$r1, $r2, $r3, $r4 ...
    [/\$r(\d+)/gi, "_this.data[$1]"]
  ],

  getField(name) {
    var ret = null;
    this.groups.forEach(item => {
      if (item.title == name) {
        ret = item;
      }
    });

    this.fields.forEach(item => {
      if (item.title == name) {
        ret = item;
      }
    });

    return ret;
  },

  // 地图数据[{iLat, iLng, value},...]
  map(arr) {
    let _list = [];
    arr.forEach(item => {
      let _city = item[this.groups[0].title].split('市')[0].split('省')[0];
      let _geo = citygeo[_city] || [0, 0];
      _list.push({
        name: _city,
        value: [..._geo, item[this.fields[0].title]]
      })
    });
    return _list;
  },

  // Y轴数值分隔
  split(fs, num = 5) {
    let _min = bi.formatData(this.data, 'min', fs);
    let _max = bi.formatData(this.data, 'max', fs);
    let _tmp = bi.formatSplit(_min, _max, num);
    return { splitNumber: num, min: _tmp.min, max: _tmp.max, interval: _tmp.split };
  },

  // 遍历
  loop(arr, _text) {
    // 如果传入的是object则处理一下
    if (typeof _text == "object") {
      _text = JSON.stringify(_text);
      _text = _text.replace(/"(item\.[a-z]+)"/gi, "$1");
    }

    let _series = [];
    var _this = this;
    arr.forEach(item => {
      try {
        //bi.log(_text);
        var obj = "";
        eval("obj=" + _text);
        _series.push(obj);
      } catch (e) {
        bi.error(e);
      }
    });
    return _series;
  },

  // 编译
  compile() {
    if (this.groups.length == 0 && this.fields.length == 0) {
      return false;
    }
    if (bi.isObject(this.option)) {
      return this.option;
    }

    let _code = this.option;
    if (_code == undefined) {
      _code = '';
    }
    this.keywords.forEach(kv => {
      _code = _code.replace(kv[0], kv[1]);
    });
    
    return this.runCode(_code);
  },

  // eval
  runCode(_code) {
    try {
      var option = "";
      var _this = this;
      eval(_code);
      //console.log(this.setting);
      bi.deepMerge(option, this.setting);

      let _cid = this.id;
      // 对tips显示进行格式化
      if (!this.type.includes('radar')){
        option.tooltip = option.tooltip || {};
        option.tooltip.formatter = option.tooltip.formatter || function(params, ticket, callback){
          return _this.tooltipFormatter(params, _cid);
        }
      }

      // 如果设置了才进行格式化
      if (bi.isset(option, 'legend')) {
        option.legend.formatter = option.legend.formatter || function(name) {
          return _this.legendFormatter(name, _cid);
        }
      }

      // 是否显示数值
      if (this.shownum && option.series) {
        if (Array.isArray(option.series)) {
          for (var i = 0; i < option.series.length; i++) {
            option.series[i].label = {
              normal: {
                show: true,
                position: 'top'
              },
              formatter: function(params, ticket, callback){
                return 'xxxxxxxxxxx';
                //return _this.showFormatter(params, _cid);
              }
            };
          }
        } else {
          option.series.label = {
            normal: {
              show: true,
              position: 'top'
            },
            formatter: function(params, ticket, callback){
              console.log(params, ticket);
              return 'xxxxxxxxxxx';
              //return _this.showFormatter(params, _cid);
            }
          };
        }
      }

      this.chart.setOption(option);
    } catch (e) {
      bi.error(_code, e)
    }

    return {};
  },

  // 编译
  run(data) {
    this.setInfo(data);
    this.setos();
    return this.compile();
  },

  setos() {
    this.option = bi.copy(bi.echarts[this.type]["option"]);
    this.setting = bi.copy(bi.echarts[this.type]["setting"]);
    if (! Object.keys(this.setting).includes('title')) {
      this.setting.title = {};
    }
    this.setting.title.text = this.name;
    this.setting.title.show = false
  },

  // 测试代码是否可运行
  check(data, option) {
    this.setInfo(data);
    this.option = option;
    this.debug = true;
    
    return this.compile();
  },

  // 修改图表类型
  changeType(_type) {
    this.type = _type;
    this.setos();
    
    let _axis = this.option.axis || 1;
    if (_axis == 1 && this.fields2.length > 0) {
      this.fields2.length = 0;
    }

    return this.compile();
  },

  // 获取配置
  getSetting(keys, defval = '') {
    let _keys = keys.split('.');
    for (let i = 0; i < _keys.length; i++) {
      if (this.setting[_keys[i]] == undefined) {
        return defval;
      } else {
        this.setting = this.setting[_keys[i]];
      }
    }

    return this.setting;
  },

  // 修改配置
  setSetting(keys, val, vtype = '', defval = undefined) {
    if (vtype == 'number') {
      val = Number(val);
    } else if (vtype == 'boolean') {
      val = Boolean(val);
    }

    if (val === 0 || val === "0" || val === "") {
      val = defval;
    }

    let _keys = keys.split('.');
    let _setting = this.setting;
    for (let i = 0; i < _keys.length - 1; i++) {
      _setting = _setting[_keys[i]];
    }
  },

  dataFormat(val, key, cid) {
    // console.log("dataFormat:", val, key, cid, this);
    let item = this.getField(key);
    if (item) {
      val = this.numerFormatter(val, item['min'], item['max'], item['int']);
      if (item['unit']) { //计数时不加单位
        if (false == ['count','countdistinct'].includes(item['fun'])) {
          val += item['unit'];
          val = val.replace(/万万/gi, "亿");
        }
      }
    }

    return val;
  },

  numerFormatter(val, minv, maxv, isint = false) {
    // console.log("numerFormatter:", val, minv, maxv, isint);
    if (isint && minv < 10000) {
      return val;
    }

    minv = Number(minv);
    maxv = Number(maxv);
    val = isNaN(Number(val)) ? 0 : Number(val);

    if (minv < 100) {
      val = val.toFixed(2);
    } else if (minv < 1000) {
      val = val.toFixed(1)
    } else if (minv < 10000) {
      val = val.toFixed(0);
    } else if (minv < 1000000) {
      val = (val/10000).toFixed(2)  + "万";
    } else if (minv < 100000000) {
      val = (val/10000).toFixed(0)  + "万";
    } else {
      val = (val/100000000).toFixed(2)  + "亿";
    }

    //console.log(val);
    return val;
  },

  tooltipFormatter(params, cid) {
    //console.log("tooltipFormatter:", params, cid);
    if (!Array.isArray(params)) {
      params = [params];
    }
    
    let tips = [];
    let names = [];
    let index = 0;
    for (let i = 0; i < params.length; i++) {
      let seriesName = params[i].seriesName;
      if (params[i].componentSubType == 'scatter' && params[i].value.length == 2) {
        let tmp = seriesName.split(',');
        tips.push(tmp[0] + ': ' + params[i].value[0]);
        tips.push(tmp[1] + ': ' + params[i].value[1]);
      } else {
        let val = 0;
        if (Array.isArray(params[i].value)) {
          val = params[i].value[params[i].value.length-1];
        } else {
          val = params[i].value;
        }
        val = this.dataFormat(val, seriesName, cid);

        let key = seriesName;
        let types = ['scatter', 'radar'];
        if (types.includes(params[i].componentSubType)) {
          key = params[i].name;
        }
        //key = this.legendFormatter(key, cid);
        index = params[i].dataIndex || 0;

        let _color = '<span style="font-size:10px;margin-top:-3px;margin-right:5px;vertical-align:middle;width:15px;height:15px;border-radius:15px;display:inline-block;background-color:'+params[i].color+'"></span>';
        if(key.includes('series')){
          tips.push(_color + val);
        }else{
          tips.push(_color + key + ': ' + val);
        }
      }
    }
    
    this.groups.forEach(item => {
      names.push(this.data[index][item.title]);
    });

    //console.log(vals.join("<br>"));
    //return '<span style="color:'+params[0].color+'">' + vals.join("<br>") + '</span>';
    return '<span>' + names.join(' - ') + '</span><br>' + tips.join("<br>");
  },

  legendFormatter(name, cid) {
    //console.log('legendFormatter', name, cid, this);
    let item = this.getField(name);
    if (item && item.unit) {
      name += '(' + item['unit'] + ')';
    }

    return name;
  },

  titleFormatter(title, fun) {
    // console.log(title, fun, this);
    if(!title){
        return false ;
    }
    let funs = {    
      max: "最大值",
      min: "最小值",
      sum: "求和",
      avg: "平均数",
      mid: "中位数",
      count: "计数",
      none: '',
    };
    let fname = funs[fun] || '';
    if (fname != '') {
      fname = '(' + fname + ')';
    }
    if (!title.includes(fname)) {
      title += fname;
    }

    //console.log(title);
    return title;
  }
}