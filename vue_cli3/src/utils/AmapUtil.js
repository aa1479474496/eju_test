import Tools from "@/utils/tools.js";
const KEY = "ea0f1aa1d5ac2376b33df517a344d3cd";

const AMapUtil = function (Amap = window.Amap) {
  this._overlays = []; //地图覆盖物集合
  this._map = null; //地图对象
  this.currentOverlay = null; //当前对象
  this.defaultRichTemps = []; //默认的模板集合,占位，
  (this.dragMarkList = []), //可拖拽mark对象集合
    (this.panelSize = { width: 60, height: 18 }); //拖拽框尺寸
};

AMapUtil.prototype = {
  //加载高德地图
  loadAMap() {
    return new Promise((resolve, reject) => {
      var script = document.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.setAttribute(
        "src",
        `https://webapi.amap.com/maps?v=1.4.15&key=${KEY}`
      );
      document.body.appendChild(script);
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        reject(false);
      };
    });
  },

  //拿到map
  getMap() {
    return this._map;
  },

  // 设置zoom和中心点
  setZoomAndCenter(lng, lat, zoom) {
    this._map.setZoomAndCenter(zoom, [Number(lng), Number(lat)]);
  },

  //获取所有的覆盖物
  getOverlays() {
    return this._overlays;
  },

  //初始化地图
  async init(el, config = {}) {
    if (!el) {
      throw new Error("必须有点");
    }
    if (!window.AMap) {
      let hasLoad = await this.loadAMap();
      console.log(hasLoad);
      this.createMap(el, config);
    } else {
      this.createMap(el, config);
    }
  },

  //创建地图
  createMap(el, config = {}) {
    let defaultConfig = {
      zoom: 10, //设置地图显示的缩放级别
      center: [113.198632, 23.12537], //设置地图中心点坐标
      mapStyle: "amap://styles/whitesmoke", //设置地图的显示样式
      viewMode: "2D", //设置地图模式
      lang: "zh_cn", //设置地图语言类型
    };

    let cfg = {
      ...defaultConfig,
      ...config
    };

    this._map = new AMap.Map(el, cfg);
  },

  // 销毁地图
  destroyMap() {
    this._map && this._map.destroy();
    console.log('地图已销毁');
  },

  //清除覆盖物
  removeOverlay(overlay) {
    this._overlays.forEach((_overlay, index) => {
      if (overlay == _overlay.item) {
        this._map.remove(overlay);
        this._overlays.splice(index, 1);
      }
    });
  },

  //清除对应type的overlay
  /**
   *
   * @param {string} type 'richMark|mark|polygon|stationPoint_richMark|station_richMark(地铁首末)|metro_polyline(地铁线)'
   */
  removeOverLaysByType(type) {
    let i = this._overlays.length;
    while (i--) {
      if (this._overlays[i].type == type) {
        this._map.remove(this._overlays[i].item);
        this._overlays.splice(i, 1);
      }
    }
  },

  //生成Amap点
  makeAMapPoint(pointArr) {
    return new AMap.LngLat(pointArr[0], pointArr[1]);
  },

  //绘制热力图
  async drawHeatmap(config) {
    var heatmap;
    let defaultConfig = {
      type: "heatmap",
      data: [],
      radius: 25, //给定半径
      // opacity: [0, 1],
      gradient: {
        0.25: "rgb(0,255,162)",
        0.55: "rgb(0,255,0)",
        0.85: "yellow",
        1.0: "rgb(255,0,0)"
      },
      max: 100
      // position: new AMap.LngLat(116.39, 39.9),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      // title: '北京'
    };
    let cfg = {
      ...defaultConfig,
      ...config
    };

    await new Promise((resolve) => {
      this._map.plugin(["AMap.Heatmap"], () => {
        heatmap = new AMap.Heatmap(this._map, {
          ...cfg
        });
        resolve()
      });
    });

    heatmap.setDataSet({
      data: cfg.data,
      max: cfg.max
    });

    let markObj = {
      type: cfg.type,
      item: heatmap,
      config: cfg
      // new BMap.Polygon(aryP, styleConfig),
    };
    this._map.add(markObj.item);
    this._overlays.push(markObj);

    return markObj;
  },

  //绘制覆盖物
  drawMark(config) {
    let defaultConfig = {
      type: "mark",
      events: {}
      // position: new AMap.LngLat(116.39, 39.9),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      // title: '北京'
    };

    let cfg = {
      ...defaultConfig,
      ...config
    };
    let markObj = {
      type: cfg.type,
      item: new AMap.Marker(cfg),
      config: cfg
      // new BMap.Polygon(aryP, styleConfig),
    };

    this._map.add(markObj.item);

    this._overlays.push(markObj);

    let eventsConfig = Object.assign(
      {},
      {
        click: null,
        mouseover: null,
        mouseout: null,
        dblclick: null
      },
      cfg.events
    );

    let keys = Object.keys(eventsConfig);
    //绑定事件
    keys.forEach(keyName => {
      let event = eventsConfig[keyName];
      if (event) {
        markObj.item.on(keyName, e => {
          eventsConfig[keyName](markObj.item, cfg, e);
        });
      }
    });
    return {
      item: markObj.item,
      config: cfg
    };
  },

  //自动缩放视野
  setFitView() {
    this._map.setFitView();
  },

  /**
   *
   * @param {_MAP} map
   * @param {string} boundary :'1223.2,32323.2;133232.4,3432432.6;'
   * @param {*Object} param2 选填  {styles:{...}||events:{...} }
   */
  drawPolygon(
    boundary,
    { styles, events, type = "polygon" } = {},
    map = this._map
  ) {
    if (!boundary) return;

    let draw = aryP => {
      //样式
      let styleConfig = Object.assign(
        {},
        {
          fillColor: "#000",
          fillOpacity: 0.4,
          strokeOpacity: 0.6,
          strokeWeight: 1,
          strokeColor: "#000",
          draggable: false
        },
        styles
      );

      let eventsConfig = Object.assign(
        {},
        {
          click: null,
          mouseover: overlay => {
            overlay.setOptions({
              ...styleConfig,
              ...{
                fillOpacity: 0.8
              }
            });
          },
          mouseout: overlay => {
            overlay.setOptions({
              ...styleConfig
            });
          },
          dblclick: null
        },
        events
      );

      let polygonObj = {
        type: type,
        item: new AMap.Polygon({
          ...styleConfig,
          ...{
            path: aryP
          }
        })
      };

      this._overlays.push(polygonObj);

      let keys = Object.keys(eventsConfig);
      //绑定事件

      keys.forEach(keyName => {
        let event = eventsConfig[keyName];
        if (event) {
          polygonObj.item.on(keyName, e => {
            eventsConfig[keyName](polygonObj.item, styleConfig, e);
          });
        }
      });

      map.add(polygonObj.item);

      return {
        item: polygonObj.item,
        config: styleConfig,
        point: aryP
      };
    };

    if (Array.isArray(boundary)) {
      let list = [];
      boundary.forEach((item, index) => {
        let aryPoint = item.split(";");
        let aryP = pointUtil(aryPoint);
        list.push(draw(aryP));
      });
      return list;
    } else if (typeof boundary == "string") {
      let aryPoint = boundary.split(";");
      let aryP = pointUtil(aryPoint);
      return draw(aryP);
    }

    function pointUtil(points) {
      let aryP = [];

      points.forEach((item, index) => {
        let arr = item.split(',');
        if (!Number(arr[0]) && !Number(arr[1])) {
          return;
        }

        let point = new AMap.LngLat(arr[0], arr[1]);
        aryP.push(point);
      });
      return aryP;
    }
  },

  // 经纬度坐标转成容器像素坐标
  lnglat2container(position) {
    let lnglat = this.makeAMapPoint(position);
    let pixel = this._map.lngLatToContainer(lnglat);
    return pixel.round();
  },
  // 容器像素坐标转成经纬度坐标
  container2lnglat(position) {
    let pixel = new AMap.Pixel(position[0], position[1]);
    let lnglat = this._map.containerToLngLat(pixel);
    let result = [lnglat.lng, lnglat.lat];
    return result;
  },

  //交通
  //实时路况图层

  doTraffic() {
    let defaultConfig = {
      zIndex: 9999,
      autoRefresh: true, //是否自动刷新，默认为false
      interval: 10
    };
    // setTimeout(() => {
    var trafficLayer = new AMap.TileLayer.Traffic(defaultConfig);
    trafficLayer.setMap(this._map);
    return trafficLayer;

    // }, 200)
  },

  //根据类型获取overlays
  /**
   *
   * @param {*} type 'richMark|mark|polygon|stationPoint_richMark|station_richMark(地铁首末)|metro_polyline(地铁线)'
   */
  getOverlaysByType(type) {
    let overLays = [];
    this._overlays.forEach((_overLay, index) => {
      if (_overLay.type == type) {
        overLays.push(_overLay);
      }
    });
    return overLays;
  },

  //清除所有overlays
  clearAllOverlays() {
    this._overlays.forEach(_overLay => {
      if (this._map && _overLay && _overLay.item) {
        this._map.remove(_overLay.item);
      }
    });
  },

  // 5.7 新增
  // 绘制散点图， 地图上的图标加文字
  drawPointHtml({ config = {} }) {
    let { iconStyle = {}, txtStyle = {} } = config;
    let defaultStyle = {
      iconType: "",
      txt: "",
      showTxt: true,
      showIcon: true,
      iconStyle: {
        "font-size": "16px",
        color: "#0071E7"
      },
      txtStyle: {
        "font-size": "14px",
        color: "#0071E7"
      },
      iconClass: '',
      txtClass: ''
    };

    let _style = {
      ...defaultStyle,
      ...config
    };

    _style.iconStyle = {
      ...defaultStyle.iconStyle,
      ...iconStyle
    };

    _style.txtStyle = {
      ...defaultStyle.txtStyle,
      ...txtStyle
    };

    let _iconStyle = Tools.formatStyle(_style.iconStyle);
    let _txtStyle = Tools.formatStyle(_style.txtStyle);

    let iconHtml = "";
    if (_style.showIcon && _style.iconType) {
      iconHtml = `
          <i class="${_style.iconType} iconfont point_icon ${_style.iconClass}" style="${_iconStyle}"></i>
          `;
    }

    let txtHtml = "";
    if (_style.showTxt && _style.txt) {
      let ml = (_style.showIcon && _style.iconType) ? 'ml4' : ''
      txtHtml = `
        <span class="txt ${ml} ${_style.txtClass}" style="${_txtStyle}">${_style.txt}</span>
        `;
    }

    let html = `
        <div class="panel_block">
          ${iconHtml}
          ${txtHtml}
        </div>
      `;

    return html;
  },

  //  绘制气泡图，圆形中间的文字
  // drawCircleHtml(style = {}) {
  drawCircleHtml({ config = {} }) {
    let { bubbleStyle = {}, txtStyle = {}, words = [] } = config;
    let defaultBubbleStyle = {
      background: "rgba(0,113,231,0.69)"
    };

    let defaultTxtStyle = {
      "font-size": "14px",
      color: "#fff"
    };

    let _bubbleStyle = {
      ...defaultBubbleStyle,
      ...bubbleStyle
    };

    let _txtStyle = {
      ...defaultTxtStyle,
      ...txtStyle
    };

    if (!words.length) {
      return "";
    }

    let _bubbleStyleStr = Tools.formatStyle(_bubbleStyle);
    let _txtStyleStr = Tools.formatStyle(_txtStyle);

    let txtHtml = "";
    words.forEach(word => {
      txtHtml += `<span style="${_txtStyleStr}">${word}</span>`;
    });

    return `
      <div class="panel_circle" style="${_bubbleStyleStr}">
         ${txtHtml}
      </div>
      `;
  },

  /**
   * 初始化信息框位置
   * @param {原始中心点} center
   * @param {弹出框的宽度} panelWidth
   * @param {弹出框的高度} panelHeight
   */
  setInfoBoxPosition(center, panelWidth, panelHeight) {
    let Pixel = {};
    Pixel = this.lnglat2container(center); //转成容器像素坐标
    //下面的常量均可视具体情况更改，或者日后重新优化
    let offset = {
      x: -panelWidth - 50,
      y: -panelHeight + 50
    };
    if (Pixel.x < Math.abs(offset.x)) {
      offset.x = 100;
    }
    if (Pixel.y < Math.abs(offset.y)) {
      offset.y = 10;
    }
    return offset;
  },
  //修改生成坐标start 
  newDrawDragMark(content, center, item, panelId, cb) {
    // 原始中心点的像素位置
    let originCenter = this.lnglat2container(item.position);
    
    let marker = this.drawMark({
      position: center,
      content,
      zIndex: 101,
      offset: new AMap.Pixel(0, 0),
      draggable: true,
      type: 'panel'
    }).item;

    // marker 对象挂到item下面
    item.marker = marker;
    let markerPx= {
      x: originCenter.x,
      y: originCenter.y
    };
    marker.on("mousedown", e => {
      if (typeof cb == 'function') {
        cb();
      }
    });

    marker.on("dragging", e => {
      let newCenter = this.lnglat2container(item.position);
       let markerLocation = [
        e.target.getPosition().lng,
        e.target.getPosition().lat
      ];
      markerPx = this.lnglat2container(markerLocation);
      item.marker.markerPx = markerPx;
      this.newDrawLine(newCenter, markerPx, panelId);
    });
  },

  newDrawLine(originCenter, markerPx, panelId) {
    let panelHtml = document.getElementById(panelId);
    if (!panelHtml) {
      return false;
    }
    let el = $("#" + panelId);
    let panelineDom = el.find(".u_paneline");
    let domHeight = el.width();
    let domWidth = el.height();
    // 更新dom的宽高
    if (domHeight) {
      this.panelSize.height = domHeight;
    }
    if (domWidth) {
      this.panelSize.width = domWidth;
    }

    let _angle = Tools.getAngle(originCenter, markerPx);
    let _distance = Tools.getDistance(originCenter, markerPx);

    let _orgX = originCenter.x;
    let _orgY = originCenter.y;

    let _markX = markerPx.x;
    let _markY = markerPx.y;

    if (_markX >= _orgX && _markY <= _orgY) {
      // console.log('右上角');
    }
    else if (_markX >= _orgX && _markY > _orgY) {
      // console.log('右下角');
    }
    else if (_markX < _orgX && _markY > _orgY) {
      // console.log('左下角');
      _angle = (parseFloat(_angle) + 180).toFixed(2);
    }
    else if (_markX < _orgX && _markY <= _orgY) {
      // console.log('左上');
      _angle = (parseFloat(_angle) - 180).toFixed(2);
    }
    let transform = `rotate(${_angle}deg)`;
    let width = `${_distance}px`;
    let left = `-${_distance}px`;

    let lineStyle = {
      transform,
      width,
      left
    }
    let _setStyle = panelineDom.attr('data-style');
    if (_setStyle) {
      // 设置的样式存放在 data-style
      _setStyle = JSON.parse(_setStyle);
      Object.assign(lineStyle, _setStyle);
    }
    let _lineStyle = Tools.formatStyle(lineStyle);
    panelineDom.attr("style", _lineStyle);
  },

  // 修改生成坐标end 

  /**
   * 画可拖拽信息框
   * @param {信息框dom} content
   * @param {原始中心点} center
   * @param {item} item
   */
  drawDragMark(content, center, item, panelId, cb) {
    // 设置可拖拽信息框偏移位置，用于之后设置可拖拽信息框的坐标，即之后的_infoCenter
    let _offset = this.setInfoBoxPosition(
      center,
      this.panelSize.width,
      this.panelSize.height
    );

    // 将传入的mark坐标转成像素坐标，用于再此基础上计算info坐标
    let _center = this.lnglat2container(center);

    // 设置info的中心点：所属mark点的中心点和设置的偏移量计算所得的新的中心点
    let _infoCenter = this.container2lnglat([
      _center.x + _offset.x,
      _center.y + _offset.y
    ]);

    let marker = this.drawMark({
      position: _infoCenter,
      content,
      zIndex: 101,
      draggable: true,
      type: 'panel'
    }).item;

    // 首次画线
    let markerCenter = {
      x: _center.x + _offset.x,
      y: _center.y + _offset.y
    };
    setTimeout(() => {
      // 画线
      this.drawLine(_center, markerCenter, this.panelSize, panelId);
    }, 500);

    //拖拽后的位置（像素坐标）
    let markerLocation = markerCenter; // 拖拽前值为初始值，下面拖拽后进行更新
    marker.on("mousedown", e => {
      if (typeof cb == 'function') {
        cb();
      }
    });

    // 添加拖拽事件和地图缩放事件，用于画连接线
    marker.on("dragging", e => {
      markerLocation = this.lnglat2container([
        e.target.getPosition().lng,
        e.target.getPosition().lat
      ]);
      let centerLocation = this.lnglat2container(center);
      _infoCenter = this.container2lnglat([markerLocation.x, markerLocation.y]);
      this.drawLine(centerLocation, markerLocation, this.panelSize, panelId);
    });
    this._map.on("zoomchange", e => {
      let newCenter = this.lnglat2container(center);
      let markerCenter = this.lnglat2container(_infoCenter); //使用这个坐标，拖拽框经纬度坐标不变，使用markerLocation，像素坐标不变
      marker.setPosition(
        this.container2lnglat([markerLocation.x, markerLocation.y])
      );
      setTimeout(() => {
        this.drawLine(newCenter, markerLocation, this.panelSize, panelId);
      });
    });
  },
  /**
   * 画线（此处传入的坐标为像素坐标）
   * @param {中心点的坐标} center
   * @param {拖拽信息框的坐标} markerCenter
   * @param {拖拽框尺寸} panelSize
   * @param {拖拽框id} panelId
   */
  drawLine(center, markerCenter, panelSize, panelId) {
    let panelHtml = document.getElementById(panelId);
    if (!panelHtml) {
      return false;
    }
    let el = $("#" + panelId);
    let panelinebDom = el.find(".u-panelineb");
    let panelineaDom = el.find(".u-panelinea");

    let domHeight = el.width();
    let domWidth = el.height();
    // 更新dom的宽高
    if (domHeight) {
      panelSize.height = domHeight;
    }
    if (domWidth) {
      panelSize.width = domWidth;
    }
    let xData = markerCenter.x - center.x - 10;
    let yData = markerCenter.y - center.y - 30;

    // console.log('markerCenter', markerCenter.x, center.x );

    // console.log('xxxxx', xData, yData);
    let lineaHeight = Math.abs(yData) - panelSize.height / 2 + "px";
    let linebWidth = Math.abs(xData) - panelSize.width / 2 + "px";
    let baseDatax = xData + panelSize.width / 2;
    let linebStyle = {
      width: linebWidth
    };
    let lineaStyle = {
      height: lineaHeight
    };

    if (baseDatax > 0 && yData < 0) {
      //右上
      // console.log("右上");
      Object.assign(lineaStyle, {
        top: "50%"
      });
      let linebWidth = baseDatax + "px";
      let linebLeft = "-" + baseDatax + "px";
      let linebTop = Math.abs(yData) - panelSize.height / 2 + "px";
      Object.assign(linebStyle, {
        width: linebWidth,
        left: linebLeft,
        top: linebTop
      });
    } else if (baseDatax > 0 && yData > 0) {
      //右下
      // console.log("右下");

      let lineaTop = -Math.abs(yData) + "px";
      let lineaHeight = panelSize.height / 2 + Math.abs(yData) + "px";
      let linebLeft = "-" + baseDatax + "px";
      let linebTop = 0;
      let linebWidth = baseDatax + "px";

      Object.assign(lineaStyle, {
        top: lineaTop,
        height: lineaHeight
      });

      Object.assign(linebStyle, {
        left: linebLeft,
        top: linebTop,
        width: linebWidth
      });
    } else if (baseDatax < 0 && yData > 0) {
      //左下
      // console.log("左下");
      let lineaTop = -Math.abs(yData) + "px";
      let lineaHeight = panelSize.height / 2 + Math.abs(yData) + "px";
      let linebLeft = 0;
      let linebTop = 0;

      Object.assign(lineaStyle, {
        top: lineaTop,
        height: lineaHeight
      });

      Object.assign(linebStyle, {
        left: linebLeft,
        top: linebTop
      });
    } else if (baseDatax < 0 && yData < 0) {
      //左上
      // console.log("左上");
      let lineaTop = "50%";
      let linebLeft = 0;
      let linebTop = Math.abs(yData) - panelSize.height / 2 + "px";
      Object.assign(lineaStyle, {
        top: lineaTop
      });

      Object.assign(linebStyle, {
        left: linebLeft,
        top: linebTop
      });
    }

    let _lineaStyle = Tools.formatStyle(lineaStyle);
    let _linebStyle = Tools.formatStyle(linebStyle);
    panelinebDom.attr("style", _linebStyle);
    panelineaDom.attr("style", _lineaStyle);
  }
};

export default AMapUtil;
