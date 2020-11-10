import * as React from 'react';
import classNames from 'classnames';
import './style/index.less';

import Title, { SkeletonTitleProps } from './Title';
import Avatar from 'antd/es/avatar/avatar';

export interface SkeletonProps {
  active?: boolean;
  loading?: boolean;
  prefixCls?: string;
  className?: string;
  // children?: any;
  children?: React.ReactNode;
  title?: SkeletonTitleProps | Boolean;
}

function getPrefix(suffixCls?: string, customizePrefixCls?: string) {
  if (customizePrefixCls) {
    return customizePrefixCls;
  }
  return suffixCls ? `ant-${suffixCls}` : 'ant';
}


function getTitleBasicProps(hasAvatar: boolean, hasParagraph: boolean): SkeletonTitleProps {
  if (!hasAvatar && hasParagraph) {
    return { width: '38%' };
  }

  if (hasAvatar && hasParagraph) {
    return { width: '50%' };
  }

  return {}
}

const Skeleton = (props: SkeletonProps) => {
  const { 
    prefixCls: customizePrefixCls, 
    loading, 
    // className,
    children,
    // title,
    // active 
  } = props;

  const prefixCls = getPrefix('skeleton', customizePrefixCls);

  if (loading || !('loading' in props)) {
    const hasAvatar = false;
    const hasParagraph = false;
    // const hasTitle = !!title;
    const hasTitle = true;

    let $title;
    if (hasTitle) {
      const titleProps: SkeletonTitleProps = {
        prefixCls: `${prefixCls}-title`,
        ...getTitleBasicProps(hasAvatar, hasParagraph)
      }
      $title = <Title {...titleProps} />
    }

    return (
      <div>
        {$title}
      </div>
    )
  }

  return <>{children}</>;
}

export default Skeleton;

