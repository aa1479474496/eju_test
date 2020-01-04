import api from '@/server/api';
bi._chart = {      //图表初始数据
  id: -1,           //图表ID
  name: '',         //图表名称
  tables: [],       //可选的源表
  list: [],         //图表数据
  lasttime: 0,      //数据最后更新时间
  status: false,    //为true才做保存
  components: [],   //组件配制
  chgnumbers: {     //数量变化
    group: 0,
    fields1: 0,
    fields2: 0
  },

  data: {           //需要保存到服务端的数据
    query: {        //数据更新条件
      db: '',       //DB
      tbl: '',      //表名
      tblname: '',  //表显示名
      group: [],    //维度字段
      fields1: [],  //主轴字段
      fields2: [],  //次轴字段
      filters1: '', //设计师输入条件
      filters2: {}, //用户下拉筛选(这儿存的是用户选了的值)
      filters3: [], //下钻？
      filters4: [], //联动？
      filters5: [], //待定？
      receives: '', //接收过滤字段
      order: '',    //排序
      limit: 200    //限取条数
    },
    updatetime: 36000,//多久更新一次
    fields: [],       //table fields{'fun','title', 'field','comment','add','type'}
    filters2: [],     //用户下拉筛选(这儿存的是原字段)
    class: 'hcharts', //图表技术(echarts,hcharts,amap)
    design: 0,        //设计模式(0=普通模式,1=高级模式)
    type: 'table',    //图表类型
    axis1: 'line',    //主轴类型
    axis2: 'line',    //次轴类型 
    theme: 'default', //图表主题
    themelock: false, //主题锁定
    qoption: [],      //指标参数
    qovalue: '',      //指标值
    option: {         //图表参数
    },
    setting: {         //图表配置
    }
  }
};

// 加载组件配置
require('@/config/chart');
bi.chart = bi.copy(bi._chart);

// 计算变动开始
bi.chart.startdrag = function () {
  this.chgnumbers.group = this.data.query.group.length;
  this.chgnumbers.fields1 = this.data.query.fields1.length;
  this.chgnumbers.fields2 = this.data.query.fields2.length;
}

// 计算变动结束
bi.chart.enddrag = function (item) {
  if (this.data.query.group.length > this.chgnumbers.group) {
    if (item.type != 'date') {
      item.fun = '';
    } else {
      item.fun = 'date';
    }
    return 'group';
  } else if (this.data.query.fields1.length > this.chgnumbers.fields1
    || this.data.query.fields2.length > this.chgnumbers.fields2
  ) {
    if (item.type == 'string') {
      item.fun = '';
    } else if (item.type == 'number') {
      item.fun = 'sum';
    } else {
      item.fun = 'date';
    }
    return 'field';
  }
}

// 获取模式
bi.chart.getDesign = function () {
  return bi.chart.data.design || 0;
}

// hcharts的tooltip
bi.chart.htooltip = function (t) {
  let _html = '<div style="text-align:center">';
  _html += '<span>' + this.y + '</span>';
  if (this.point) {
    this.points = [this.point];
  }
  this.points.forEach(item => {
    
  });
  _html += '';
  _html += '</div>';
}

// 加载数据
bi.chart.loadData = function (_cid, _fun) {
  bi.log("api.chartLoad:" + _cid);
  api.chartLoad(_cid).then(res => {
    if (res.status) {
      let _chartInfo = {};
      if (res.data.aData != null) {
        _chartInfo.data = res.data.aData;
      }
      if (res.data.aList != null) {
        _chartInfo.list = res.data.aList;
      }
      _chartInfo.lasttime = res.data.iLastTime;
      _chartInfo.name = res.data.sName;
      _chartInfo.id = _cid;

      _fun(_chartInfo);
    } else {
      bi.log("api.chartLoad error:" + res.data);
    }
  });
}

// 修改图表类型
bi.chart.changeType = function (_vue, _type) {
  let _oldOption = bi.chart.data.option[_type];
  let _item = bi.chart.components[_type];
  if (_oldOption == undefined) {
    let _newOption = '';
    if (bi.isString(_item.option)) {
      _newOption = _item.option;
    } else {
      _newOption = 'option = ' + JSON.stringify(_item.option, '', 2);
    }
    //bi.chart.data.option[_type] = _newOption;
    _vue.$set(bi.chart.data.option, _type, _newOption);
  }

  _vue.$set(bi.chart.data.setting, _type, _item.setting);
  bi.chart.data.type = _type;
}

// 获取配置
bi.chart.getSetting = function (keys, defval = '') {
  let _ctype = bi.chart.data.type;
  let _setting = bi.chart.data.setting[_ctype];
  let _keys = keys.split('.');
  for (let i = 0; i < _keys.length; i++) {
    if (_setting[_keys[i]] == undefined) {
      return defval;
    } else {
      _setting = _setting[_keys[i]];
    }
  }

  return _setting;
}

// 修改配置
bi.chart.setSetting = function (keys, val, _vue, vtype = 'string', defval = undefined) {
  let _ctype = bi.chart.data.type;
  let _setting = bi.chart.data.setting[_ctype];

  if (vtype == 'number') {
    val = Number(val);
  } else if (vtype == 'boolean') {
    val = Boolean(val);
  }

  if (val === 0 || val === "0" || val === "") {
    val = defval;
  }

  let _keys = keys.split('.');
  for (let i = 0; i < _keys.length - 1; i++) {
    if (_setting[_keys[i]] == undefined || !bi.isObject(_setting[_keys[i]])) {
      _vue.$set(_setting, _keys[i], {});
    }

    _setting = _setting[_keys[i]];
  }

  _vue.$set(_setting, _keys[_keys.length - 1], val);
}