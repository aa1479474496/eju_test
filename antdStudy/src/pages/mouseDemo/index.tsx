import * as React from 'react';

import { MouseProvider } from "@/components/configProvider/mouseProvider";

export default () => {
  return (
    <MouseProvider
      x={10}
      y={20}
      render={mouse => (
        <p>The mouse position is { mouse.x}, { mouse.y}</p>
      )}>
    </MouseProvider>
  )
}