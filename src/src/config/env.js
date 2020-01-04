/**
 * 配置编译环境和线上环境之间的切换
 * 
 * apiUrl: 域名地址
 * routerMode: 路由模式
 * imgUrl: 图片所在域名地址
 * 
 */

let apiUrl = '';
let imgUrl = '';
let routerMode = 'history';


if (process.env.NODE_ENV == 'development') {
	// apiUrl = "http://127.0.0.1:212";
	apiUrl = "http://120.24.78.234:214";
} else if (process.env.NODE_ENV == 'production') {
	apiUrl = "http://139.196.125.223:213";
}

export default {
	apiUrl,
	routerMode,
	imgUrl,
}