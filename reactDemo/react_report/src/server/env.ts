
let apiPath = "http://admindms.cwb.dev.cricwifi.com"; //数据API
let fileUrl = "http://dfs.cricbigdata.com/view"; //图片查看
let uploadUrl = "http://dfs.cricbigdata.com/file/upload"; //上传图片
let exportUrl = "http://ioppt.cricbigdata.com/index/genPPTX"; //导出pptx
if (process.env.NODE_ENV == "development") {
  //exportUrl = "http://172.28.20.156:19081/index/genPPTX";
} else if (process.env.NODE_ENV == "production") {
  if (process.env.VUE_APP_ENVS == 'test') {
    // 发布到测试服
    apiPath = "http://admindms.cwb2.dev.cricwifi.com";
    if (process.env.VUE_APP_DOMAIN == 'cwb') {
      // 链接cwb服务器
      apiPath = "http://admindms.cwb.dev.cricwifi.com";
    }
  }
  else {
    apiPath = "http://apidms.cricbigdata.com";
  }
}

export default {
  apiPath,
  fileUrl,
  uploadUrl,
  exportUrl
};
