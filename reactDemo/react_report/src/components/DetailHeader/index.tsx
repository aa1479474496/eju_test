import React from 'react';
import cls from 'classnames';

import { Tooltip } from 'antd';

import styles from './index.scss';


type DetailHeaderProps = {
  info: {
    name?: string;
  }
}

const DetailHeader: React.FC<DetailHeaderProps> = (props) => {
  console.log('props::', props);
  let { info } = props;

  // 撤销， 重做
  const DoTools: React.FC = () => {
    let undoClass = cls("iconfont iconcontrolbackoutfill mr16", styles.do_item);
    let redoClass = cls("iconfont iconcontrolbackoutfill", styles.do_item, styles.is_flip);
    return (
      <div className={styles.do_tool}>
        <Tooltip placement="bottom" title="撤销">
          <i className={undoClass}></i>
        </Tooltip>
        <Tooltip placement="bottom" title="重做">
          <i className={redoClass}></i>
        </Tooltip>
      </div>
    )
  }



  return (
    <div className={styles.top_header}>
      <div className={styles.left}>
        <div className={styles.logo_box}>
          <i className={cls(styles.iconlgoo_icon, 'iconfont iconlogo-icon')}></i>
        </div>

        <div className={styles.fake_input_box}>
          <span className={styles.fake_input}>{info.name}</span>
          <input
            type="text"
            value={info.name}
            maxlength="32"
            className={cls(styles.edit_name, 'inline_block')}
          />
        </div>

        {/* 撤销&重做  */}
        <DoTools />

        <div className="save-tips">
          <span>正在保存报告</span>

          {/* <span>
            <span>正在保存报告</span>
            <template v-else>报告自动保存中…</template>
          </span> */}
          {/* <span v-else>最近保存</span> */}
        </div>


      </div>
    </div>
  )
}

export default DetailHeader;