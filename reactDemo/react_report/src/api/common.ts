import MYHTTP from "@/server/request";

export interface LoadReportParamsType {
  id: string;
  token: string;
}

export default class Api {
  //获取报告
  static loadReport(params: LoadReportParamsType) {
    return MYHTTP.post({
      url: "/bi/report/detail",
      params: params
    });
  }
}
