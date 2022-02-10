import MYHTTP from "@/server/request.js";

export default class Api {
    // 房企股市
    static getHouseStockRank(params) {
        return MYHTTP.get({
            url: "/main/house-stock-rank",
            params: params
        });
    }
}



