bi._app = {
  //默认数据
  data: {
    iAutoID: 0,
    aMenu: {
      list: [],
      defaultOpen: {
        actives: "",
        nodes: [""]
      },
      home: ""
    },
    sTheme: "dark",
    sTitle: "",
    sName: "",
    sLogo: "",
    sAlias: "",
    sFooter: ""
  },
  defaultOpen: {
    actives: "",
    nodes: [""]
  }, //界面状态管理以及缓存区域
  status: {
    iSiteSet: true,
    attr: {},
    showAt: false,
    sTheme: "dark",
    isEdit: false
  },
  //动态添加列表数据
  menulist() {
    return {
      name: "new name",
      useIcon: true,
      icon: "icon-home",
      linkType: "dash",
      linkAddr: "",
      dashAddr: "",
      lookType: "current"
    };
  },
  //menu 图标集合
  menuIcon: [
    "icon-settings",
    "icon-bi_nav",
    "icon-bi_nav1",
    "icon-bi_nav2",
    "icon-bi_nav3",
    "icon-bi_nav4",
    "icon-bi_nav5",
    "icon-bi_nav6",
    "icon-bi_nav7",
    "icon-bi_nav8",
    "icon-bi_nav9",
    "icon-bi_nav10",
    "icon-bi_nav11",
    "icon-bi_nav12",
    "icon-bi_nav13",
    "icon-bi_nav14",
  ],
  //menu 暂定主题集合
  theme: {
    white: {
      backgroundColor: "#273142",
      textColor: "#9C9E9F",
      activeTextColor: "#FFFFFF",
      headerBackground: "#1B6ABD",
      headerColor: "#fff",
      bodyColor: "rgba(238,244,249,1)",
      mapStyle:'amap://styles/fresh'
    },
    dark: {
      backgroundColor: "#273142",
      textColor: "#9C9E9F",
      activeTextColor: "#FFFFFF",
      headerBackground: "#202937",
      headerColor: "#FFF",
      bodyColor: "rgba(25,32,43,1)",
      mapStyle:'amap://styles/grey'
    }
  },
  loadingTheme(key) {
    bi.app.data.sTheme = key;
    bi.dash.loadTheme();
  }
};
bi.app = bi.copy(bi._app);
