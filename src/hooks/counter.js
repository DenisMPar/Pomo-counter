import { useState } from 'react';

export function getActiveNumberSection(count) {
  let activeNumberSection;
  switch (count) {
    case 0:
      activeNumberSection = [1, 1, 1, 0, 1, 1, 1];
      break;
    case 1:
      activeNumberSection = [1, 1, 0, 0, 0, 0, 0];
      break;
    case 2:
      activeNumberSection = [1, 0, 1, 1, 1, 0, 1];
      break;
    case 3:
      activeNumberSection = [1, 1, 1, 1, 1, 0, 0];
      break;
    case 4:
      activeNumberSection = [1, 1, 0, 1, 0, 1, 0];
      break;
    case 5:
      activeNumberSection = [0, 1, 1, 1, 1, 1, 0];
      break;
    case 6:
      activeNumberSection = [0, 1, 1, 1, 1, 1, 1];
      break;
    case 7:
      activeNumberSection = [1, 1, 1, 0, 0, 0, 0];
      break;
    case 8:
      activeNumberSection = [1, 1, 1, 1, 1, 1, 1];
      break;
    case 9:
      activeNumberSection = [1, 1, 1, 1, 0, 1, 0];
      break;
    default:
      activeNumberSection = [0, 0, 0, 0, 0, 0, 0];
      break;
  }

  return { activeNumberSection };
}
