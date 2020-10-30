import * as React from 'react';

export interface MouseProviderProps {
  x?: number;
  y?: number;
  render: (state: MouseProviderState) => React.ReactNode;
}

interface MouseProviderState {
  readonly x: number;
  readonly y: number;
  readonly name: string;
}

export class MouseProvider extends React.Component<MouseProviderProps, MouseProviderState> {
  constructor(props: MouseProviderProps) {
    super(props);
    const { x = 0, y = 0 } = props;
    console.log('constructor', x, y);
    this.state = {
      x,
      y,
      name: 'mouse'
    };
  }
  readonly state: MouseProviderState;


  handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  };

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    )
  }
}

