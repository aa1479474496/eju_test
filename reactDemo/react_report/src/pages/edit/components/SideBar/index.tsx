import React, { useState } from 'react';
import cls from 'classnames';

import { SourceDatasType } from '@/models/connect';

import { Tooltip } from 'antd';
import PageSource from './PageSource';
import PageImg from './PageImg';
import PageText from './PageText';

import styles from './index.scss';

import components, { ComponentName } from '@/config/components';


// type SideBarProps = {
//   tables: SourceDatasType
// }

const SideBar = ({tables, maps}: {tables: SourceDatasType[], maps: SourceDatasType[]}) => {
  const [type, setType] = useState<string>('');
  console.log('sidebar', tables);

  const setDrawerType = (componentType:string) => {
    let _type = type == componentType ? '' : componentType;
    setType(_type);
  }

  // 生成侧边按钮栏
  const Options: React.FC = () => {
    let keys: string[] = Object.keys(components);
    let _options = keys.map((key: string) => {
      let current = components[key as ComponentName];
      return (
        <Tooltip key={key} placement="right" title={current.iconText}>
          <div className={cls(styles.option, type == key ? styles.is_active : '')} onClick={() => setDrawerType(key)}>
            <i className={cls("iconfont", current.icon, styles.iconfont)}></i>
          </div>
        </Tooltip>
      )
    });

    return (
      <>
        { _options}
      </>
    )
  }

  // 生成弹出层 header
  const DrawHeader: React.FC = () => {
    let nameMap = {
      chart: '数据源',
      map: '地图数据源',
      pic: '图形',
      image: '图片',
      text: '文本',
    }
    let name = nameMap[type as ComponentName] || '';

    return (
      <div className={styles.drawer_header}>
        <span>{name}</span>
        <i 
          className={cls('iconfont iconguanbi', styles.iconguanbi)}
          onClick={() => setType('')}
        >
        </i>
      </div>
    )
  }

  // 二级弹出层组件
  const DrawerContent = {
    chart: (
      <PageSource 
        datas={tables}
      />
    ),
    image: (
      <PageImg />
    ),
    text: (
      <PageText />
    ),
    map: (
      <PageSource 
        datas={maps}
      />
    ),

  }


  return (
    <div className={styles.side_bar}>

      {/* 组件显示的icon */}
      <div className={styles.option_group}>
        <Options />
      </div>

      {/* 组件弹出层 */}
      <div className={cls(styles.side_drawer, type ? styles.is_open : '')}>
        <DrawHeader />
        {DrawerContent[type as ComponentName]}
      </div>
    </div>
  )
}

export default SideBar;