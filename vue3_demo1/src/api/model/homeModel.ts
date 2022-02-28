
export interface AItem {
    iAutoID: number;
    iSort: number;
    sName: string;
}

export interface ADataItem {
    sGroup: string;
    aList: AItem[]
}

export interface GetGroupListModel {
    ErrorCode: number;
    ErrorMessage: string;
    Data: {
        iNum: number;
        aData: ADataItem[]
    }
}