/*
 * @Descripttion: API地址
 * @Author: wyx
 * @Date: 2021-11-09 17:38:46
 * @LastEditors: wyx
 * @LastEditTime: 2021-11-15 14:30:41
 */

/** mock api  */
export const MOCKAPIURL =
    'http://api.cricwifi.com/server/index.php?g=Web&c=Mock&o=simple&projectID=117&uri='
/** 测试 api  */
export const TESTAPIURL = 'http://finance.dgtest.cricwifi.com/core-app'
/** 线上 api  */
export const PROAPIURL = 'http://www.cricfinance.com/core-app'

let apiPath = PROAPIURL

let filePath = 'https://dfs.cricbigdata.com/view/' //文件系统
let uploadPath = 'http://dfs.cricbigdata.com/file/upload' //上传地址
let downloadPath = 'http://dfs.cricbigdata.com/file/downloadzip' //下载zip地址
let fileUrl = "http://dfs.cricbigdata.com/view"; //文件系统


if (process.env.NODE_ENV == 'development') {
    apiPath = MOCKAPIURL
    apiPath = TESTAPIURL
}
else if (process.env.NODE_ENV == "production") {
    if (process.env.VUE_APP_ENVS == 'test') {
        // 发布到测试服
        apiPath = TESTAPIURL
    }
    else {
        apiPath = PROAPIURL
    }
}

export default {
    apiPath,
    filePath,
    uploadPath,
    downloadPath,
    fileUrl
}