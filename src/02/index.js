import { convertStringToNumberList, evaluateProgram, readFile } from '_utils';
import { PROGRAM_OPCODE } from '_constants';

import findNounAndVerbEvaluation from './find-noun-and-verb-evaluation';

const solve = integerList => {
  let memory01 = [...integerList];

  // as described in problem definition
  memory01[1] = 12;
  memory01[2] = 2;

  memory01 = evaluateProgram(memory01);

  console.log('> result 1:', memory01[0]);

  let memory02 = [...integerList];
  const value = 19690720;

  const { noun, verb } = findNounAndVerbEvaluation({ memory: memory02, value });

  const result02 = 100 * noun + verb;

  console.log('> result 2:', result02);
};

export default () => {
  console.log('--- Day 2: 1202 Program Alarm ---');

  return readFile('02/input.in')
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
