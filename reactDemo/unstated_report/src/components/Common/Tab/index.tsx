import React from 'react';
import cls from 'classnames';
import styles from './index.scss';

export interface ItemPropsType {
  name: string;
  value: string | number;
}

type TabPropsType = {
  list: Partial<ItemPropsType>[];
  cur: Partial<ItemPropsType>;
  changeTab?: (item: Partial<ItemPropsType>) => void;
  className?: string;
}

const Tab = (props: TabPropsType) => {
  const { list, cur, changeTab, className = '' } = props;
  const handleClick = (item: Partial<ItemPropsType>) => {
    if (changeTab) {
      if (item.value == cur.value) {
        return;
      }
      changeTab(item);
    }
  }

  return (
    <div className={cls('gl_tab_box', className)}>
      {
        list.map(item => {
          return (
            <div
              className={cls('item', item.value == cur.value ? 'is_active' : '')}
              key={item.value}
              onClick={() => handleClick(item)}
            >
              <div className='text'>{item.name}</div>
              {/* <span className={cls('text')}>{item.name}</span> */}
            </div>
          )
        })
      }
      <span className={styles.gl_test}>test</span>
    </div>
  )
}
export default Tab;
