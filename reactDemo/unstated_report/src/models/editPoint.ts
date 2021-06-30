import { useState } from 'react';
import { createContainer } from 'unstated-next';

import DeatailsContainer from './details';

export function useEditPoint() {
  let { tables, maps } = DeatailsContainer.useContainer();
  return {
    tables,
    maps
  }
}


