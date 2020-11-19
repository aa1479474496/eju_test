import React from 'react';
import cls from 'classnames';

import styles from './index.scss';


type DetailHeaderProps = {
  info: {
    name?: string;
  }
}

const DetailHeader: React.FC<DetailHeaderProps> = (props) => {
  console.log('props::', props);
  let { info } = props;
  return (
    <div className={styles.top_header}>
      <div className={styles.left}>
        <div className={styles.logo_box}>
          <i className="iconfont iconlogo-icon"></i>
        </div>

        <div className={styles.fake_input_box}>
          <span className={styles.fake_input}>{info.name }</span>
          <input
            type="text"
            value={info.name}
            maxlength="32"
            className={cls(styles.edit_name ,'inline_block')}
          />
        </div>

        {/* 撤销&重做  */}
        <div className="do_tool">


        </div>

        <div className="save-tips">
          <span>
            <span>正在保存报告</span>
            {/* <template v-else>报告自动保存中…</template> */}
          </span>
          {/* <span v-else>最近保存</span> */}
        </div>


      </div>
    </div>
  )
}

export default DetailHeader;