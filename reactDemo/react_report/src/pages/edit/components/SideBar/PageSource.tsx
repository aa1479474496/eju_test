import React from 'react';
import cls from 'classnames';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { SourceDatasType } from '@/models/connect';

import styles from './index.scss';

const PageSource = ({ datas }: { datas: SourceDatasType[] }) => {
  // console.log('----', props);
  return (
    <div className={styles.pages_data_container}>
      <div className={styles.bottom_content}>
        <Input placeholder="请输入内容进行快速搜索" prefix={<SearchOutlined />} />
      </div>
      <div className={styles.source_list}>
        {
          datas.map(item => {
            return (
              <div className={styles.item} key={item.name}>
                <span className={styles.left} title={item.name}>{item.name}</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default PageSource;