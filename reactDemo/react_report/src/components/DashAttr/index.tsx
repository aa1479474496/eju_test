import React, { useState } from 'react';
import styles from './index.scss';

import Tab from '@/components/Common/Tab';
const tablist = [
  { name: "目录", value: "dir"},
  { name: "设置", value: "setting" }
]


const DashAttr = () => {
  const [curtab, setCurTab] = useState(tablist[0]);
  const changeTab = (item: typeof curtab) => {
    console.log('changeTab', item);
    setCurTab(item);
  }
  return (
    <div className={styles.dash_attr}>
      dash_attr
      <Tab 
        list={tablist} 
        cur={curtab}
        changeTab={changeTab}
      />
    </div>
  )
}

export default DashAttr;