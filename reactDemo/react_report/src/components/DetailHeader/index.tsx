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
    let value = info.name || '';
    return (
      <div className={styles.fake_input_box}>
        <span className={styles.fake_input}>{info.name}</span>
        <input
          type="text"
          value={value}
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

  // 右侧 按钮组 

  const RoleBtns: React.FC = () => {
    let mode = 'edit';
    let { iCanExport = 0 } = info;
    let exportText = iCanExport == 1 ? "导出" : "后台处理中,完成后可导出";
    let btns = [
      { icon: "iconinterfacesavefill", text: "保存", type: "icon", role: ["edit"], cls: "mr16" },
      { icon: "iconinterfacedemofill", text: "预览", type: "icon", role: ["edit"], cls: "mr16" },
      { icon: "iconinterfaceexportfill", text: exportText, type: "icon", role: ["edit", "show"], cls: "" },
      { icon: "", text: "分享查看", type: "text", role: ["edit"], cls: "share_btn" },
    ]
    let roleBtns = btns.filter(btn => btn.role.includes(mode));
    let items = roleBtns.map((roleBtn, index) => {
      
      let content = (
        <span>{roleBtn.text}</span>
      );
      if (roleBtn.type == 'icon') {
        content = (
          <Tooltip placement="bottom" title={roleBtn.text}>
            <i className={cls('iconfont', roleBtn.icon, styles.iconfont)}></i>
          </Tooltip>
        );
      }

      return (
        <span key={index} className={cls('cur_pointer btn_role', roleBtn.type == 'icon' ? roleBtn.cls : styles[roleBtn.cls], styles.btn_role)}>
          {content}
        </span>
      )
    });
    return (
      <>
        {items}
      </>
    )
  }

  return (
    <div className={styles.top_header}>
      <div className={styles.left}>
        <Logo />
        {ReportName}
        <DoTools />

        <div className={styles.save_tips}>
          <span>正在保存报告</span>

          {/* <span>
            <span>正在保存报告</span>
            <template v-else>报告自动保存中…</template>
          </span> */}
          {/* <span v-else>最近保存</span> */}
        </div>
      </div>


      <div className={styles.right}>
        <div className={styles.btn_groups}>
          <RoleBtns />
        </div>
      </div>
    </div>
  )
}

export default DetailHeader;