import React, { useState } from 'react';
import cls from 'classnames';

import { Tooltip } from 'antd';

import styles from './index.scss';

import components, { ComponentName } from '@/config/components';

const SideBar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('chart');
  const showDrawer = () => {
    setVisible(true);
  }
  const onClose = () => {
    setVisible(false);
  }

  // 生成侧边按钮栏
  const Options: React.FC = () => {
    let keys: string[] = Object.keys(components);
    let _options = keys.map((key: string) => {
      let current = components[key as ComponentName];
      return (
        <Tooltip placement="right" title={current.iconText}>
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
      </div>



    </div>
  )
}

export default SideBar;