import citygeo from '@/config/citygeo';

export default {
  type: "",
  data: {},
  setting: {},
  list: [],
  groups: [],
  fields1: [],
  fields2: [],
  option: {},
  chartInfo: {},
  ftitles: [],
  ftitles1: [],
  ftitles2: [],
  gtitles: [],
  gvalues1: [],
  debug: false,
  setInfo(chartInfo) {
    let _chartInfo = bi.copy(chartInfo);
    this.type = _chartInfo.data.type;
    this.groups = _chartInfo.data.query.group;
    this.fields1 = _chartInfo.data.query.fields1;
    this.fields2 = _chartInfo.data.query.fields2;
    this.fields = [];
    this.fields1.forEach(item => {
      item.chart = _chartInfo.data.axis1;
      item.axis = 0;
      this.fields.push(item);
    });
    this.fields2.forEach(item => {
      item.chart = _chartInfo.data.axis2;
      item.axis = 1;
      this.fields.push(item);
    });
    this.data = _chartInfo.data;
    this.list = _chartInfo.list;
    this.setting = _chartInfo.data.setting && _chartInfo.data.setting[this.type] || {};

    this.gtitles = bi.formatData(this.groups, 'col', 'title', 'string');
    if (this.gtitles.length > 0) {
      this.gvalues1 = bi.formatData(this.list, 'col', this.groups[0].title, 'string');
    } else {
      this.gvalues1 = [];
    }
    this.ftitles = bi.formatData(this.fields, 'col', 'title', 'string');
    this.ftitles1 = bi.formatData(this.fields1, 'col', 'title', 'string');
    this.ftitles2 = bi.formatData(this.fields2, 'col', 'title', 'string');
  },

  keywords: [
    [/\$legend/gi, "_this.ftitles"],
    [/\$category/gi, "_this.gvalues1"],
    [/\$fields1\(/gi, "_this.loop(_this.fields1,"],
    [/\$fields2\(/gi, "_this.loop(_this.fields2,"],
    [/\$fields\(/gi, "_this.loop(_this.fields,"],
    [/\$groups\(/gi, "_this.loop(_this.groups,"],
    [/\$list\(/gi, "_this.loop(_this.list,"],
    [/\$title/gi, "item.title"],
    [/\$one\(/gi, "bi.formatData(_this.list,'one',"],
    [/\$col\(/gi, "bi.formatData(_this.list,'col',"],
    [/\$pair\(/gi, "bi.formatData(_this.list,'pair',"],
    [/\$max\(/gi, "bi.formatData(_this.list,'max',"],
    [/\$min\(/gi, "bi.formatData(_this.list,'min',"],
    [/\$gp\(/gi, "bi.formatData(_this.list,'group',"],
    [/\$kv\(/gi, "bi.formatData(_this.list,'kv',"],

    //二维转一维
    [/\$rowkey\(/gi, "bi.formatData(_this.list[0],'keys',_this.gtitles"],
    [/\$rowval\(/gi, "bi.formatData(item,'vals',_this.gtitles"],

    //地图转换
    [/\$map\(/gi, "_this.map(_this.list"],
    [/\$split\(/gi, "_this.split("],

    //$f1, $f2, $f3, $f4 ...
    [/\$f(\d+)/gi, "_this.fields[$1].title"],
    [/\$fs(\d+)/gi, "_this.ftitles$1"],
    [/\$fall/gi, "_this.ftitles"],

    //$g1, $g2, $g3, $g4 ...
    [/\$g(\d+)/gi, "_this.groups[$1].title"],
    [/\$gall/gi, "_this.gtitles"],

    //$r1, $r2, $r3, $r4 ...
    [/\$r(\d+)/gi, "_this.list[$1]"]
  ],

  // 地图数据[{iLat, iLng, value},...]
  map(arr) {
    let _list = [];
    arr.forEach(item => {
      let _city = item[this.groups[0].title];
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
    let _min = bi.formatData(this.list, 'min', fs);
    let _max = bi.formatData(this.list, 'max', fs);
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
    bi.temp.compile = this;
    if (this.groups.length == 0 && this.fields.length == 0) {
      return false;
    }
    if (bi.isObject(this.option)) {
      bi.temp.option = this.option;
      return this.option;
    }

    let _code = this.option;
    if (bi.dash) {
      _code = bi.dash.formatText(_code);
    }
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
      bi.temp.code = _code;
      eval(_code);
      if (this.data.design != 1) {
        bi.deepMerge(option, this.setting);
      } else {
        bi.deepMerge(this.setting, option);
        option = this.setting;
      }
      bi.temp.option = option;
      bi.temp.setting = this.setting;
      return option;
    } catch (e) {
      console.log(_code);
      bi.error(_code, e)
    }

    return {};
  },

  // 编译
  run(chartInfo) {
    this.setInfo(chartInfo);
    this.option = chartInfo.data.option[this.type];// || bi.copy(chartInfo.components[this.type]["option"]);
    return this.compile();
  },

  // 测试代码是否可运行
  check(chartInfo, option) {
    this.setInfo(chartInfo);
    this.option = option;
    this.debug = true;
    return this.compile();
  },

  // 修改选项
  change(chartInfo, key, val) {
    let _option = chartInfo.data.option[chartInfo.data.type];
    bi.o = _option;
    let _text = JSON.stringify(val, '', 2);
    _option = _option.replace(new RegExp(key + ':[\\d\\D]+?\},', 'gm'), key + ': ' + _text + ',');
    let _newOption = this.check(chartInfo, _option);
    if (bi.isEmpty(_newOption)) {
      return false;
    }

    chartInfo.data.option[chartInfo.data.type] = _option;
    // console.log(chartInfo.data.option[chartInfo.data.type])
    return true;
  }
}