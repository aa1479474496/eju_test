import React, { useState } from 'react';
import cls from 'classnames';

import { SourceDatasType } from '@/models/connect';

import { Tooltip } from 'antd';
import PageSource from './PageSource';

import styles from './index.scss';

import components, { ComponentName } from '@/config/components';


// type SideBarProps = {
//   tables: SourceDatasType
// }

const SideBar = ({tables}: {tables: SourceDatasType[]}) => {
  const [type, setType] = useState('chart');
  console.log('sidebar', tables);

  // 生成侧边按钮栏
  const Options: React.FC = () => {
    let keys: string[] = Object.keys(components);
    let _options = keys.map((key: string) => {
      let current = components[key as ComponentName];
      return (
        <Tooltip key={key} placement="right" title={current.iconText}>
          <div className={styles.option}>
            <i className={cls("iconfont", current.icon)}></i>
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
    let name = '';
    if (type == 'chart') {
      name = '数据源';
    }
    else if (type == 'map') {
      name = '地图数据源';
    }
    else if (type == 'pic') {
      name = '图形';
    }
    else if (type == 'img') {
      name = '图片';
    }

    return (
      <div className={styles.drawer_header}>
        <span>{name}</span>
        <i className={cls('iconfont iconguanbi', styles.iconguanbi)}></i>
      </div>
    )
  }


  return (
    <div className={styles.side_bar}>

      {/* 组件显示的icon */}
      <div className={styles.option_group}>
        <Options />
      </div>

      {/* 组件弹出层 */}
      <div className={styles.side_drawer}>
        <DrawHeader />
        <PageSource datas={tables}/>
      </div>



    </div>
  )
}

export default SideBar;