import React, { useState } from 'react';
import cls from 'classnames';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { SourceDatasType } from '@/models/details';

import styles from './pageSource.scss';

const PageSource = ({ datas }: { datas: SourceDatasType[] }) => {
  // console.log('----', props);
  const [inputValue, setInputValue] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  let _datas = datas.filter(item => {
    return item.name.indexOf(inputValue) != -1;
  });
  return (
    <div className={styles.pages_data_container}>
      <div className={styles.bottom_content}>
        <Input 
          value={inputValue} 
          onChange={handleChange} 
          placeholder="请输入内容进行快速搜索" 
          allowClear
          prefix={<SearchOutlined />} 
        />
      </div>
      <div className={styles.source_list}>
        {
          _datas.map(item => {
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