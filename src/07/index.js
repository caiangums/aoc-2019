import readlineSync from 'readline-sync';

import { convertStringToNumberList, evaluateProgram, readFile } from '_utils';

const testHighestValue = (value1, value2) =>
  value1 > value2 ? value1 : value2;

const findHighestValue = (integerList, permutations) => {
  let memory01,
    inputValueList,
    outputValueList = [0],
    highestValue = -1;

  permutations.forEach(permutation => {
    inputValueList = permutation.split(',');

    [...'ABCDE'].forEach((amplifier, index) => {
      memory01 = [...integerList];

      evaluateProgram(
        memory01,
        [inputValueList[index], outputValueList[index]],
        outputValueList
      );
    });

    // if (parseInt(outputValueList[5]) > highestValue) {
    //   console.log(
    //     'highestValue',
    //     parseInt(outputValueList[5]),
    //     highestValue,
    //     inputValueList
    //   );
    // }
    highestValue = testHighestValue(highestValue, parseInt(outputValueList[5]));

    outputValueList = [0];
  });

  return highestValue;
};

const findHighestValueUntilStop = (integerList, permutations) => {
  let memory01,
    inputValueList,
    outputValueList = [0],
    outputValue,
    highestValue = -1;

  permutations.forEach(permutation => {
    inputValueList = permutation.split(',').map(item => parseInt(item) + 5);

    [...'ABCDE'].forEach((amplifier, index) => {
      memory01 = [...integerList];

      evaluateProgram(
        memory01,
        [inputValueList[index], outputValueList[index]],
        outputValueList
      );
    });

    const valueIndex = outputValueList.length - 1;
    console.log('highestValue', outputValueList, highestValue, inputValueList);
    outputValue = parseInt(outputValueList[valueIndex]);
    highestValue = testHighestValue(highestValue, outputValue);

    outputValueList = [0];
  });

  return highestValue;
};

const solve = (integerList, permutations) => {
  const highestValue = findHighestValue(integerList, permutations);

  console.log('> result 1:', highestValue);

  const highestValueUntilStop = findHighestValueUntilStop(
    integerList,
    permutations
  );

  console.log('> result 2:', highestValueUntilStop);
};

export default () => {
  console.log('--- Day 7: Amplification Circuit ---');

  return readFile('07/input.in')
    .then(data => {
      const integerList = convertStringToNumberList({
        string: data,
        separator: ','
      });

      return readFile('07/permutations.in')
        .then(permutationData => {
          solve(integerList, permutationData.split('\n'));
        })
        .catch(err => {
          console.error('Error on permutation data:', err);
        });
    })
    .catch(err => {
      console.error('Error:', err);
    });
};
