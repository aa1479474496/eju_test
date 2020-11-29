import React , { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';

import Api from '@/api/common';
import { getQueryString } from "@/utils/utils";

export interface DetailDataType {
  attr: object;
  pages: Array<object>;
}

export interface SourceDatasType {
  groupfiled?: number;
  groupname?: string;
  id: number;
  name: string;
  type: string;
  types: string[];
  uptime: number;
}

export interface GlobalModelState {
  theme: string;
  data: DetailDataType; // 
  dbs: object;
  info: object;
  maps: SourceDatasType[];
  tables: SourceDatasType[];
  activeKey: number;
}


function useDetails() {
  let [ theme, setTheme ] = useState<string>('light');
  let [ attr, setAttr ] = useState<object>({});
  let [ pages, setPages] = useState<object[]>([]);
  let [ info, setInfo ] = useState<object>({});
  let [ maps, setMaps] = useState<object[]>([]);
  let [ tables, setTables] = useState<object[]>([]);


  useEffect(() => {
    console.log('effffffect');
    let id =  getQueryString('id') || 0;
    Api.loadReport({id}).then(res => {
      if (res.status) {
        console.log('ressss', res);
        let { data, info, maps, tables } = res.data;
        let { attr, pages } = data;
        setAttr(attr);
        setPages(pages);
        setInfo(info);
        setMaps(maps);
        setTables(tables);
      }
    })
  }, []);
  return {
    theme,
    setTheme,
     attr, 
     setAttr ,
     pages, 
     setPages,
     info, 
     setInfo,
     maps, 
     setMaps,
     tables, 
     setTables
  }
}

let Deatails = createContainer(useDetails);
export default Deatails;