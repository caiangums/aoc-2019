import { readFile } from '_utils';

const solve = massList => {
  console.log('solve');
};

export default () => {
  console.log('--- Day 2: 1202 Program Alarm ---');

  return readFile('02/input.in')
    .then(data => {
      const list = data.split(',').filter(mass => mass.length > 0);

      solve(list);
    })
    .catch(err => {
      console.error('Error:', err);
    });
};
