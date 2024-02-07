import { Icon } from '../Icon';

/* eslint-disable max-len, jsx-quotes */
// export const Search = (props) => (
//   <Icon {...props} viewBox='0 0 32 32'>
//     <path d='M11.047 18.992c-1.574-1.997-2.514-4.518-2.514-7.258 0-6.48 5.253-11.733 11.733-11.733s11.733 5.253 11.733 11.733c0 6.48-5.253 11.733-11.733 11.733-2.74 0-5.261-0.939-7.258-2.514l-9.050 9.050c-0.425 0.425-1.095 0.422-1.511 0.006l-0.456-0.456c-0.411-0.411-0.413-1.092 0.006-1.511l9.050-9.050zM20.267 20.693c4.948 0 8.96-4.012 8.96-8.96s-4.012-8.96-8.96-8.96c-4.948 0-8.96 4.012-8.96 8.96s4.012 8.96 8.96 8.96z'></path>
//   </Icon>
// );
// /* eslint-enable max-len, jsx-quotes */

import { Tree } from '../../../../packages/core/lib/NTree';
import { Tags } from '../../../../packages/core/lib/Tags';

/* eslint-disable max-len, jsx-quotes */
// export const Close = (props) => (
//   <Icon {...props} viewBox='0 0 32 32'>
//     <path d='M16 14.037l-12.284-12.279c-0.154-0.154-0.367-0.249-0.603-0.249s-0.448 0.095-0.603 0.249l-0.755 0.755c-0.154 0.154-0.249 0.367-0.249 0.603s0.095 0.448 0.249 0.603l12.284 12.282-12.284 12.284c-0.154 0.154-0.249 0.367-0.249 0.603s0.095 0.448 0.249 0.603l0.755 0.755c0.154 0.154 0.367 0.249 0.603 0.249s0.448-0.095 0.603-0.249l12.284-12.284 12.284 12.284c0.154 0.154 0.367 0.249 0.603 0.249s0.448-0.095 0.603-0.249l0.755-0.755c0.154-0.154 0.249-0.367 0.249-0.603s-0.095-0.448-0.249-0.603l-12.284-12.284 12.284-12.284c0.154-0.154 0.249-0.367 0.249-0.603s-0.095-0.448-0.249-0.603l-0.755-0.755c-0.154-0.154-0.367-0.249-0.603-0.249s-0.448 0.095-0.603 0.249l-12.284 12.284z' />
//   </Icon>
// );

export const Plus = (tree: Tree | Tags, props, key) => {
  const closeElement = tree.tag(
    {
      tagName: 'path',
      attributes: {
        d: 'M17.387 14.613v-9.278c-0.001-0.588-0.477-1.065-1.064-1.069h-0.642c-0.587 0.006-1.061 0.481-1.065 1.068v9.278h-9.28c-0.588 0.001-1.065 0.477-1.069 1.064v0.645c0 0.589 0.491 1.065 1.069 1.065h9.278v9.278c0 0.591 0.482 1.069 1.065 1.069h0.644c0.589 0 1.065-0.491 1.065-1.069v-9.278h9.278c0.588-0.001 1.065-0.477 1.069-1.064v-0.642c-0.006-0.587-0.481-1.061-1.068-1.065h-9.278z',
      },
      child: null,
    },
    `${key}_close`
  );

  return Icon(
    tree,
    {
      ...props,
      viewBox: '0 0 32 32',
      child: closeElement,
    },
    key
  );
};
