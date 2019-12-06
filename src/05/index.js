import { convertStringToNumberList, evaluateProgram, readFile } from '_utils';

const solve = integerList => {
  let memory01 = [...integerList];

  evaluateProgram(memory01);

  console.log('> result 1 was the last output!');

  let memory02 = [...integerList];

  evaluateProgram(memory02);

  console.log('> result 2 was the last output!');
};

export default () => {
  console.log('--- Day 5: Sunny with a Chance of Asteroids ---');

  return readFile('05/input.in')
    .then(data => {
      const integerList = convertStringToNumberList({
        string: data,
        separator: ','
      });

      solve(integerList);
    })
    .catch(err => {
      console.error('Error:', err);
    });
};
