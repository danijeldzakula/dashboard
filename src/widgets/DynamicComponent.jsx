import React from 'react';
import { components } from './index';

function DymanicComponent({ componentName, props }) {
  const Components = components[componentName];

  return <Components {...props} />;
}

export default React.memo(DymanicComponent);
