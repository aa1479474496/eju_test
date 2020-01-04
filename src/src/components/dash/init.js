import api from "@/server/api";
bi._dash = {
  // 组件相关内容
  components: {},
  loading: true,
  status: false,
  themes: {}, //主题的通用配制
  amapthemes: {}, //Chart高德地图
  highthemes: {}, //HighChart
  mapStyles: {}, //Dash高德地图
  info: {
    iAutoID: 0,
    iNodeID: 0,
    sName: "",
    iUserID: 0,
    iType: "0", // 0,1 对应普通和高级仪表盘   2 对应大屏
    dbList: []
  },
  data: {
    theme: "default",
    compact: false,
    fullscreen: false,
    css: {},
    layout: [],
    sqldata: [],
    datav: {
      grid: 1, // 大屏格栅数据
      coverImg: "", // 大屏封面图
      w: 1920,
      h: 1000
    }
  },
  currItem: {
    type: "page",
    info: null
  }
};
bi._dash.currItem.info = bi._dash.data;

bi.dash = bi.copy(bi._dash);

// 加载组件
require("@/config/components");
// 取得当前的layout
bi.dash.getLayout = function() {
  let type = this.currItem.type;
  let itemData = this.currItem.info;
  if (type == "tab") {
    return itemData.data.tabs[itemData.data.index].layout;
  } else if (type == "panel") {
    return itemData.data.layout;
  } else {
    return this.data.layout;
  }
};

// 取得高德地图主题
bi.dash.getAmapTheme = function() {
  let _theme = bi.dash.getTheme();
  console.log("_theme:" + _theme);
  return bi.dash.mapStyles[_theme];
};

// 取得主题
bi.dash.getTheme = function() {
  // 优先取APP应用的主题
  let _theme = "";
  if (bi.app && bi.app.data && bi.app.data.sTheme) {
    _theme = bi.app.data.sTheme;
  } else {
    _theme = (bi.dash && bi.dash.data && bi.dash.data.theme) || "default";
  }

  if (bi.isObject(_theme)) {
    _theme = _theme.dash || "default";
  }

  return _theme;
};

// 加载主题
bi.dash.loadTheme = function() {
  let _theme = bi.dash.getTheme();
  console.log("_theme:" + _theme);
  require("@/components/dash/theme/" + _theme + ".js");
};

// 绑定数据格式
bi.dash.formatText = function(_text) {
  let _data = this.data.sqldata;
  _text = _text || "";
  if (_data.length == 0) {
    return _text;
  }

  // 数据处理
  let sources = {};
  if (!bi.isEmpty(this.info.aDfilter)) {
    sources["dfilter"] = this.info.aDfilter;
  }
  for (let k in _data) {
    sources[_data[k]["name"]] = _data[k]["data"];
  }

  // 替换
  let result = _text.match(/\{.+?\..+?\}/g);
  if (result) {
    for (let i = 0; i < result.length; i++) {
      let tmp = result[i].substring(1, result[i].length - 1).split(".");
      if (
        tmp.length == 2 &&
        sources[tmp[0]] &&
        sources[tmp[0]][tmp[1]] != undefined
      ) {
        _text = _text.replace(
          new RegExp(result[i], "g"),
          sources[tmp[0]][tmp[1]]
        );
      }
      // console.log(result[i], sources[tmp[0]][tmp[1]]);
    }
  }

  return _text;
};

bi.dash.loadData =  function(_did, _fun) {
  bi.log("_did:" + _did);
  if (isNaN(_did) || _did <= 0) {
    bi.dash.loading = false;
    return false;
  }

  // 加载数据前，先把状态禁掉
  bi.dash.loading = true;
  bi.dash.status = false;
  // 加载仪表盘数据
  api.dashLoad({ id: _did }).then(res => {
    if (res.status) {
      bi.log("dashLoad:" + _did);

      let _dash = {};
      // 仪表盘数据信息
      if (res.data.aData == null) {
        _dash.data = bi.copy(bi._dash.data);
      } else {
        _dash.data = res.data.aData;
      }

      // 除了data之外的信息
      delete res.data.aData;
      _dash.info = res.data;

      // 二层复制
      Object.assign(this.info, _dash.info);
      Object.assign(this.data, _dash.data);

      // 重置当前item
      this.info.iType == 2
        ? (this.currItem.type = "datavPage")
        : (this.currItem.type = "page");
      this.currItem.info = this.data;

      // 加载主题
      this.loadTheme();

      // 加载状态修改为false
      bi.dash.loading = false;

      // 修改状态
      setTimeout(function() {
        bi.dash.status = true;
      }, 500);
    } else {
      bi.log(res);
    }
  });
};
