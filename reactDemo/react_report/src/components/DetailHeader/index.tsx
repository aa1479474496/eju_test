import React, { useContext, useMemo } from 'react';
import cls from 'classnames';

import { Tooltip } from 'antd';
import { InfoContext, InfoContextType } from '@/pages/edit';

import styles from './index.scss';


// type DetailHeaderProps = {
//   info: {
//     name?: string;
//   }
// }

const DetailHeader: React.FC = () => {
  const { info, changeInfo } = useContext(InfoContext);

  const changeName: React.ReactEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    changeInfo({ name: target.value });
  }

  // logo
  const Logo: React.FC = () => {
    return (
      <div className={styles.logo_box}>
        <i className={cls(styles.iconlgoo_icon, 'iconfont iconlogo-icon')}></i>
      </div>
    )
  }

  //报告名修改区域， show页面不可以修改
  const ReportName = useMemo(() => {
    let maxLength = 32;
    return (
      <div className={styles.fake_input_box}>
        <span className={styles.fake_input}>{info.name}</span>
        <input
          type="text"
          value={info.name}
          maxLength={maxLength}
          onChange={changeName}
          className={cls(styles.edit_name, 'inline_block')}
        />
      </div>
    )
  }, [info.name]);


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
        <Logo />
        {ReportName}
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