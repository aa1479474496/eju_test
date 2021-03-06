import * as React from 'react';
import classNames from 'classnames';

export interface SkeletonTitleProps {
  prefixCls?: string;
  className?: string;
  style?: object;
  width?: number | string;
}

const Title = ({ prefixCls, className, width, style }: SkeletonTitleProps) => (
  <h3 className={classNames(prefixCls, className)} style={{width, ...style}}></h3>
);

export default Title;