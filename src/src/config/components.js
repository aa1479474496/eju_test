import api from '@/server/api'

let _full_width = 1000;

bi.dash.components = {
  page: {
  },
  datavPage: {
  },
  text: {
    icon: 'icon-text1',
    iconSize: '18px',
    name: 'TEXT',
    wh: [200, 160, 16],  // wh  第一个参数： width  第二个参数： 高级仪表盘 0 的 默认高度 ； 第三个参数 1： 普通仪表盘的默认高度
    dataV:{
      wh:[400,400], //[宽,高]
      minw:10,
      minh:10,
      sTitle:'文本编辑组件'
    },
    css: {},
    data: {
      text: '',
      href: '',
      isHtml: false,
      isNew: false
    },
    opt: { copy: true, delete: true },
    minH:[1,1]  //第一个参数： 高级仪表盘的 默认最小高度 ； 第二个参数： 普通仪表盘的默认最小高度
  },
  img: {
    icon: 'icon-pic',
    iconSize: '23px',
    name: 'IMAGE',
    wh: [200, 160, 16],
    dataV:{
      wh:[400,400], //[宽,高]
      minw:10,
      minh:10,
      sTitle:'图片编辑组件'
    },
    css: {},
    data: {
      url: '',
      href: '',
      isNew: false,
      isUpload:false,
      uploadImgUrl:''
    },
    opt: { copy: true, delete: true },
    minH:[1,1]
  },
  chart: {
    icon: 'icon-chartbar',
    iconSize: '20px',
    name: 'CHART',
    wh: [400, 420, 18],
    dataV:{
      wh:[400,400], //[宽,高]
      minw:10,
      minh:10,
      sTitle:'图表编辑组件'
    },
    css: {},
    data: {
      cid: 0
    },
    minH:[120,18],
    opt: {
      delete: true,
      async create(itemData, layout, $router) {
        await api.chartSave(0, 0, '', []).then(res => {
          if (res.status) {
            itemData.data.cid = res.data;
            if (bi.isObject(bi.chart)) {
              Object.assign(bi.chart.data, bi.copy(bi._chart.data));
              bi.chart.list.length = 0;
            }
            
            //延迟300毫秒跳转
            setTimeout(function () {
              $router.push({
                path: '/chart/edit/' + res.data
              });
            }, 300);
          }
        });
      },
      copy(newItem, layout) {
        api.chartCopy({
          did: bi.dash.info.iAutoID,
          cid: newItem.data.cid
        }).then(res => {
          if (res.status) {
            newItem.data.cid = res.data;
            layout.push(newItem);
          }
        });
      },
      edit(itemData, $router) {
        let _id = itemData.data.cid;
        $router.push({ path: '/chart/edit/' + _id });
      }
    }
  },
  line: {
    icon: 'icon-move',
    iconSize: '23px',
    name: '分割线',
    wh: [_full_width, 20,12],
    dataV:{
      wh:[400,400], //[宽,高]
      minw:10,
      minh:10,
      sTitle:'分割线编辑组件'
    },
    opt: { copy: true, delete: true },
    css: {},
    data: {},
    minH:[1,1]
  },
  iframe: {
    icon: 'icon-iframe',
    iconSize: '21px',
    name: 'IFRAME',
    wh: [_full_width, 300,12],
    dataV:{
      wh:[400,400], //[宽,高]
      minw:10,
      minh:10,
      sTitle:'IFRAM编辑组件'
    },
    opt: { copy: true, delete: true },
    css: {},
    data: {
      url: ''
    },
    minH:[1,1]
  },
  tab: {
    icon: 'icon-tab1',
    iconSize: '21px',
    name: 'TAB',
    wh: [400, 300,12],
    opt: { copy: true, delete: true },
    dataV:{
      wh:[400,400], //[宽,高]
      minw:10,
      minh:10,
      sTitle:'TAB编辑组件'
    },
    css: {
      'background': 'rgba(255,255,255,1)'
    },
    data: {
      position: 'top',
      type: 'card',
      class: 'white',
      index: '0',
      tabs: [{
        title: 'Tab1',
        layout: []
      }, {
        title: 'Tab2',
        layout: []
      }]
    },
    minH:[1,1]
  },
  // dash: {
  //   icon: 'icon-apps',
  //   iconSize:'20px',
  //   name: '仪表盘',
  //   wh: [400, 320],
  //   opt : {copy: true, delete: true, edit(itemData, $router){
  //     let _id = itemData.data.did;
  //     $router.push({ path: '/dash/edit/' + _id});
  //   }},
  //   css : {},
  //   data: {
  //     did: 0
  //   }
  // },
  panel: {
    icon: 'icon-box',
    iconSize: '16px',
    name: 'PANEL',
    wh: [_full_width, 300,12],
    opt: { copy: true, delete: true },
    dataV:{
      wh:[400,400], //[宽,高]
      minw:10,
      minh:10,
      sTitle:'容器编辑组件'
    },
    css: {},
    data: {
      layout: []
    },
    minH:[1,1]
  },
  mapLocal: {
    icon: 'icon-location',
    dataV:{
      wh:[800,400], //[宽,高]
      minw:10,
      minh:10,
      sTitle:'周边地图编辑组件'
    },
    iconSize: '21px',
    name: 'mapLocal',
    wh: [_full_width, 300,12],
    opt: { copy: true, delete: true },
    css: {},
    data: {},
    minH:[1,1]
  },
  marquee: {
    icon: 'icon-backwardfill',
    iconSize: '24px',
    name: '跑马灯',
    wh: [200, 160, 16],  // wh  第一个参数： width  第二个参数： 高级仪表盘 0 的 默认高度 ； 第三个参数 1： 普通仪表盘的默认高度
    dataV:{
      wh:[400,400], //[宽,高]
      minw:10,
      minh:10,
      sTitle:'文字跑马灯组件'
    },
    css: {},
    data: {
      text: '',
      speed: 3,
      font:''
    },
    opt: { copy: true, delete: true },
    minH:[1,1]  //第一个参数： 高级仪表盘的 默认最小高度 ； 第二个参数： 普通仪表盘的默认最小高度
  },
  countTo: {
    icon: 'icon-shuzi',
    iconSize: '24px',
    name: '数字翻牌',
    wh: [200, 160, 16],  // wh  第一个参数： width  第二个参数： 高级仪表盘 0 的 默认高度 ； 第三个参数 1： 普通仪表盘的默认高度
    dataV:{
      wh:[400,400], //[宽,高]
      minw:10,
      minh:10,
      sTitle:'数字翻牌'
    },
    css: {},
    data: {
      startVal: 0,
      endVal: 2017,
      duration:3000,
      autoplay:true,
      decimals:0,
      decimal:".",
      separator:",",
      prefix:"",
      suffix:"",
      alignItems:"normal"
    },
    opt: { copy: true, delete: true },
    minH:[1,1]  //第一个参数： 高级仪表盘的 默认最小高度 ； 第二个参数： 普通仪表盘的默认最小高度
  },
  time: {
    icon: 'icon-msnui-time-detail',
    iconSize: '24px',
    name: '时间组件',
    wh: [200, 160, 16],  // wh  第一个参数： width  第二个参数： 高级仪表盘 0 的 默认高度 ； 第三个参数 1： 普通仪表盘的默认高度
    dataV:{
      wh:[400,400], //[宽,高]
      minw:10,
      minh:10,
      sTitle:'时间组件'
    },
    css: {},
    data: {
      iconSize:12,
      iconColor:"#5182E4",
      format:"y-m-d h:i:s",
      alignItems:"normal"
    },
    opt: { copy: true, delete: true },
    minH:[1,1]  //第一个参数： 高级仪表盘的 默认最小高度 ； 第二个参数： 普通仪表盘的默认最小高度
  },
  progress:{
    icon: 'icon-jindutiao',
    iconSize: '24px',
    name: '进度条组件',
    wh: [200, 160, 16],  // wh  第一个参数： width  第二个参数： 高级仪表盘 0 的 默认高度 ； 第三个参数 1： 普通仪表盘的默认高度
    dataV:{
      wh:[400,400], //[宽,高]
      minw:10,
      minh:10,
      sTitle:'进度条组件'
    },
    css: {},
    data: {
      percentage:0,
      type:"line",
      strokeWidth:6,
      textInside:false,
      color:"rgb(81, 130, 228)",
      width:126,
      showText:true,
      alignItems:"normal"
    },
    opt: { copy: true, delete: true },
    minH:[1,1]  //第一个参数： 高级仪表盘的 默认最小高度 ； 第二个参数： 普通仪表盘的默认最小高度
  },
  swiper:{
    icon: 'icon-lunboxiaoguo',
    iconSize: '24px',
    name: '轮播图片组件',
    wh: [200, 160, 16],  // wh  第一个参数： width  第二个参数： 高级仪g表盘 0 的 默认高度 ； 第三个参数 1： 普通仪表盘的默认高度
    dataV:{
      wh:[400,400], //[宽,高]
      minw:10,
      minh:10,
      sTitle:'轮播图片组件'
    },
    css: {},
    data: {
      duration:3000,
      fileList:[],
      direction:'horizontal',
      effect:'slide',
      controlBar:'pagination',
      slidesPerView:1
    },
    opt: { copy: true, delete: true },
    minH:[1,1]  //第一个参数： 高级仪表盘的 默认最小高度 ； 第二个参数： 普通仪表盘的默认最小高度
  },
  textSwiper:{
    icon: 'icon-lunbo',
    iconSize: '20px',
    name: '文字滚动组件',
    wh: [200, 160, 16],  // wh  第一个参数： width  第二个参数： 高级仪g表盘 0 的 默认高度 ； 第三个参数 1： 普通仪表盘的默认高度
    dataV:{
      wh:[400,400], //[宽,高]
      minw:10,
      minh:10,
      sTitle:'文字滚动组件'
    },
    css: {},
    data: {
      duration:3000,
      fileList:[],
      direction:'vertical',
      slidesPerView:1
    },
    opt: { copy: true, delete: true },
    minH:[1,1]  //第一个参数： 高级仪表盘的 默认最小高度 ； 第二个参数： 普通仪表盘的默认最小高度
  },
  video: {
    icon: 'icon-video',
    iconSize: '20px',
    name: 'video',
    wh: [200, 160, 16],
    dataV:{
      wh:[400,400], //[宽,高]
      minw:10,
      minh:10,
      sTitle:'视频编辑组件'
    },
    css: {},
    data: {
      src: '',
      type: 'video/mp4',
      poster:'',
      loop:true,
      autoplay:true
    },
    opt: { copy: true, delete: true },
    minH:[1,1]
  },
  timeLine: {
    icon: 'icon-shijianzhou',
    iconSize: '20px',
    name: 'timeLine',
    wh: [200, 160, 16],
    dataV:{
      wh:[400,400], //[宽,高]
      minw:10,
      minh:10,
      sTitle:'时间轴组件'
    },
    css: {},
    data: {
      fileList:[],
      options:{
        fontcolor:"",
        zoom:1
      }
    },
    opt: { copy: true, delete: true },
    minH:[1,1]
  },
  rate: {
    icon: 'icon-favorfill',
    iconSize: '20px',
    name: 'rate',
    wh: [200, 160, 16],
    dataV:{
      wh:[400,400], //[宽,高]
      minw:10,
      minh:10,
      sTitle:'评分组件'
    },
    css: {},
    data: {
      max:5,
      score:0,
      unselectcolor:'',
      selectcolor:'',
      fontcolor:''
    },
    opt: { copy: true, delete: true },
    minH:[1,1]
  }
};