import MYHTTP from "@/server/request";

export default class Api {
    // 房企股市
    static getHouseStockRank(params?:any) {
        return MYHTTP.get({
            url: "/main/house-stock-rank",
            params: params
        });
    }
}



