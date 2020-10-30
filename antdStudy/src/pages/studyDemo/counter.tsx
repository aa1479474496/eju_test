import * as React from 'react';
import { render } from 'react-dom';

import { FCCounter } from "@/components/counter/counter";

export default class extends React.Component<{}, { count: number }> {
  state = { count: 0 };

  increment= () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    return (
      <FCCounter 
      label={'counter 测试'} 
      count={this.state.count}
      onIncrement={this.increment}
      />
    )
  }
}