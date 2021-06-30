import React , { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';

import { useUser } from './user';
import useEditPages from './editPages';

import Api from '@/api/common';
import { getQueryString } from "@/utils/utils";

export interface DetailDataType {
  attr: object;
  pages: Array<object>;
}

export interface SourceDatasType {
  // 数据源类型
  groupfiled?: number;
  groupname?: string;
  id: number;
  name: string;
  type: string;
  types: string[];
  uptime: number;
}

export type ItemDataType = {
  // 每个元素属性
  x: string | number;
  y: string | number;
  w: string | number;
  h: string | number;
  i: string | number;
  css?: any;
  innercss?: any;
  whLock: boolean;
  type: string;
  data?: any;
}

export type PagesType = {
  // 每一页ppt属性
  attr?: string;
  chartSource?: object;
  data: ItemDataType[];
  image: string;
}

export type InfoType = {
  // 报告属性
  name?: string;
  iCanExport?: number;
}

function useDetails() {
  const { user, setUser } = useUser();
  let [activeIndex, setActiveIndex] = useState<number>(0);
  let [theme, setTheme] = useState<string>('light');
  let [attr, setAttr] = useState<object>({});
  let [pages, setPages] = useState<PagesType[]>([]);
  let [info, setInfo] = useState<InfoType>({});
  let [maps, setMaps] = useState<SourceDatasType[]>([]);
  let [tables, setTables] = useState<SourceDatasType[]>([]);

  const changeTheme = (value: string) => {
    setTheme(value);
    document.documentElement.setAttribute("data-theme", value);
  }

  // let [count, setCount] = useEditPages.useContainer();



  useEffect(() => {
    (async function loadData() {
      let id =  getQueryString('id') || 0;
      let res = await Api.loadReport({id});
      if (res.status) {
        let { data, info, maps, tables } = res.data;
        let { attr, pages } = data;
        setAttr(attr);
        setPages(pages);
        setInfo(info);
        setMaps(maps);
        setTables(tables);
      }
    })();

  }, []);

  return {
    user,
    activeIndex, 
    setActiveIndex,
    theme,
    changeTheme,
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