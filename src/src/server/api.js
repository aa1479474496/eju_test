import fetch from './fetch'
export default {
  // 通用
  fileUpload: () => fetch('/file/upload', param),
  
  // 用户相关
  userLogin: (param) => fetch('/bi/api/user/login', param),
  userInfo: () => fetch('/bi/api/user/info'),

  // 数据查询
  query: (param) => fetch('/bi/api/data/query', param),

  // 工作表
  dataListtbl: () => fetch('/bi/api/data/listtbl'),
  dataTblinfo: (param) => fetch('/bi/api/data/tblinfo', param),

  // 图表操作
  chartLoad: (id, fun) => fetch('/bi/api/chart/load', { id }),
  chartList: () => fetch('/bi/api/chart/list'),
  chartSave: (id, name, data) => fetch('/bi/api/chart/save', { id, name, data }),
  chartCopy: (param) => fetch('/bi/api/chart/copy', param),

  // 仪表盘目录
  nodeAdd: (param) => fetch('/bi/api/node/add', param),
  nodeDelete: (param) => fetch('/bi/api/node/del', param),
  nodeUpdate: (param) => fetch('/bi/api/node/change', param),
  nodelistUpdate: (param) => fetch('/bi/api/datatable/chgname', param),
  nodeParentUpdate: (param) => fetch('/bi/api/node/chgparent', param),
  nodePlaceChange: (param) => fetch('/bi/api/node/chgpos', param),
  

  // 仪表盘操作
  dashList: (param = {}) => fetch('/bi/api/dash/list', param),
  dashLoad: (param) => fetch('/bi/api/dash/load', param),
  dashSave: (param) => fetch('/bi/api/dash/save', param),
  dashDelete: (param) => fetch('/bi/api/dash/delete', param),
  dashRename: (param) => fetch('/bi/api/dash/chgname', param),
  pageData: (param) => fetch('/bi/api/data/pagedata', param),

  // 应用操作
  appList: (param) => fetch('/bi/api/app/list', param),
  appLoad: (param) => fetch('/bi/api/app/load', param),
  appSave: (param) => fetch('/bi/api/app/save', param),
  appDelete: (param) => fetch('/bi/api/app/delete', param), 

  // 工作表操作
  tableList: () => fetch('/bi/api/datatable/list'),
  tableLoad: (param) => fetch('/bi/api/datatable/load', param),
  tableSave: (param) => fetch('/bi/api/datatable/save', param),
  tableDelete: (param) => fetch('/bi/api/datatable/delete', param),
  tableRename: (param) => fetch('/bi/api/datatable/chgname', param),
  tableRefresh: (param) => fetch('/bi/api/datatable/refresh', param),
  tableCreate: (param) => fetch('/bi/api/datatable/create', param),
  tablePreview: (param) => fetch('/bi/api/datatable/preview', param),

  // 数据源操作
  sourceList: (param) => fetch('/bi/api/datasource/list', param),
  sourcelisttbl: (param) => fetch('/bi/api/datasource/listtbl', param),
  sourceLoad: (param) => fetch('/bi/api/datasource/load', param),
  sourceSave: (param) => fetch('/bi/api/datasource/save', param),
  sourceDelete: (param) => fetch('/bi/api/datasource/delete', param),

  //城市数据
  siteGetcity: () => fetch('/bi/api/stat/city'),
  
};