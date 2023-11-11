import { lazy } from 'react';
import { uuidv4 } from '../helpers';

// Place for call widget elements
const RichText = lazy(() => import('./components/rich-text'));
const ImageArea = lazy(() => import('./components/image-area'));

// Export widget components
const components = {
  RichText,
  ImageArea,
};

// Widget component - navigaiton menus
const menus = [
  { _id: uuidv4(), name: 'RichText', label: 'Rich Text', description: '', elements: components },
  { _id: uuidv4(), name: 'ImageArea', label: 'Image', description: '', elements: components },
];

export { components, menus };
