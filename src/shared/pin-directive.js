/* eslint-disable func-names */
/* eslint-disable no-param-reassign */

// This will work if its mounted or updated
export default function (element, binding) {
  element.style.position = 'absolute';
  Object.keys(binding.value).forEach((key) => {
    element.style[key] = binding.value[key];
  });
}

// Based on Hook
// export default {
//   mounted: (element, binding) => {
//     element.style.position = 'absolute';
//     Object.keys(binding.value).forEach((key) => {
//       element.style[key] = binding.value[key];
//     });
//   },
// };

// By Key Modifier
// export default {
//   mounted: (element, binding) => {
//     element.style.position = 'absolute';
//     Object.keys(binding.modifiers).forEach((key) => {
//       element.style[key] = '5px';
//     });
//   },
// };
