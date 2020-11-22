import React from 'react';
import cls from 'classnames';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import styles from './index.scss';

type PageSourceProps = {
  datas: [];
}

const PageSource: React.FC = () => {
  // console.log('----', props);
  return (
    <div className={styles.pages_data_container}>
      <div className={styles.bottom_content}>
        <Input placeholder="请输入内容进行快速搜索" prefix={<SearchOutlined />}/>
      </div>
    </div>
  )
}

export default PageSource;