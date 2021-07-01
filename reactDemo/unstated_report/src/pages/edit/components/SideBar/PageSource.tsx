import React, { useState } from 'react';
import cls from 'classnames';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { ComponentName } from '@/config/components';

import { SourceDatasType } from '@/models/details';
import { useEditItem } from '@/models/editItem';


import styles from './pageSource.scss';
interface PageSourceProps {
  datas: SourceDatasType[];
  closeDrawer?: () => void;
}

const PageSource = (props: PageSourceProps) => {
  const { datas, closeDrawer } = props;
  const [inputValue, setInputValue] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const { addItem } = useEditItem();

  const localAddItem = (type: ComponentName, id?: number) => {
    addItem(type, id);
    if (closeDrawer) {
      closeDrawer();
    }
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
              <div
                className={styles.item}
                key={item.name}
                onClick={() => localAddItem('chart', item.id)}
              >
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