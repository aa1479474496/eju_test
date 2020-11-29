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
  changeTab?:(item: Partial<ItemPropsType>) => void;
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

  // console.log('------', className);
  return (
  <div className={cls(styles.tab_box, className)}>
    {
      list.map(item => {
        return (
          <div 
            className={cls(styles.item, item.value == cur.value ? styles.is_active : '')} 
            key={item.value}
            onClick={() => handleClick(item)}
          >
            <span className={styles.text}>{item.name}</span>
          </div>
        )
      })
    }
    </div>
  )
}
export default Tab;
