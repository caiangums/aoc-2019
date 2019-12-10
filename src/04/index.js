import { convertStringToNumberList, readFile } from '_utils';

import validatePassword from './validate-password';

const solve = (start, end) => {
  let i,
    count = 0,
    validateRepeatedCounter = true;

  for (i = start; i < end; i++) {
    if (validatePassword(i)) {
      count++;
    }
  }

  console.log('> result 1:', count);

  count = 0;
  for (i = start; i < end; i++) {
    if (validatePassword(i, validateRepeatedCounter)) {
      count++;
    }
  }

  console.log('> result 2:', count);
};

export default () => {
  console.log('--- Day 4: Secure Container ---');

  return readFile('04/input.in')
    .then(data => {
      const [start, end] = convertStringToNumberList({ string: data, separator: '-'});
      solve(start, end);
    })
    .catch(err => {
      console.error('Error:', err);
    });
};
