import React from 'react';

export interface SpinProps {
  prefixCls?: string;
}

class Spin extends React.Component<SpinProps> {
  static defaultProps = {
    spinning: true
  }

  constructor(props: SpinProps) {
    super(props);
  }

  render() {
    return <p>loading...</p>
  }
}

export default Spin;

