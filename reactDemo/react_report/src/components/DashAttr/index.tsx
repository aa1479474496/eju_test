import React, { useState } from 'react';
import styles from './index.scss';

import Tab, { ItemPropsType } from '@/components/Common/Tab';
const tablist = [
  { name: "目录", value: "dir", test:1111},
  { name: "设置", value: "setting" }
]


const DashAttr = () => {
  const [curtab, setCurTab] = useState<Partial<ItemPropsType>>(tablist[0]);
  const changeTab = (item: Partial<ItemPropsType>) => {
    // console.log('changeTab', item);
    setCurTab(item);
  }
  return (
    <div className={styles.dash_attr}>
      <Tab 
        list={tablist} 
        cur={curtab}
        changeTab={changeTab}
      />
    </div>
  )
}

export default DashAttr;