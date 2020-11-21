import React, { useState } from 'react';
import cls from 'classnames';

import { Tooltip } from 'antd';

import styles from './index.scss';

import components, {ComponentName} from '@/config/components';

const SideBar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  }
  const onClose = () => {
    setVisible(false);
  }

  const Options: React.FC = () => {
    let keys:string[] = Object.keys(components);
    let _options = keys.map((key:string) => {
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






  return (
    <div className={styles.side_bar}>

      <div className={styles.option_group}>
        sidebar
        <Options />
      </div>
    </div>
  )
}

export default SideBar;