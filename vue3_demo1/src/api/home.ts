import MYHTTP from "/@/server/request";

export default class Api {
    // 房企股市
    static getHouseStockRank(params?:any) {
        return MYHTTP.get({
            url: "/main/house-stock-rank",
            params: params
        });
    }

    // ---------- dc测试接口 -----------

    static getGroupList(params?:any):any {
        // 获取所有的企业分组
        return MYHTTP.get({
            url: '/fangqigroup/enterprise',
            params
        })
    }

    static getUserGroupList(params?:any) {
        // 获取用户保存的分组
        return MYHTTP.get({
            url: '/fangqigroup/list',
            params
        })
    }

    static getGroupDetail(params?:any) {
        // 获取用户保存的 单个分组的详情
        return MYHTTP.get({
            url: '/fangqigroup/detail',
            params
        })
    }

    static delGroup(params?:any) {
        // 删除用户保存的 单个分组
        return MYHTTP.post({
            url: '/fangqigroup/del',
            params
        })
    }

    static saveGroup(params?:any) {
        // 保存用户保存的 单个分组
        return MYHTTP.post({
            url: '/fangqigroup/save',
            params
        })
    }
}



