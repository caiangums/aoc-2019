import { evaluateProgram } from '_utils';

let originalMemory;
let originalValue;

const evaluateSingleCycle = ({ i, j }) => {
  let memory = [...originalMemory];

  memory[1] = i;
  memory[2] = j;

  memory = evaluateProgram(memory);

  return memory[0];
}

const findNounAndVerbEvaluation = ({ memory, value }) => {
  let noun, verb, result;

  originalMemory = memory;
  originalValue = value;

  for (let i = 1; i <= 99; i++) {
    for (let j = 1; j <= 99; j++) {
      result = evaluateSingleCycle({ i, j });

      if (result === value) {
        verb = j;
        break;
      }
    }
    if (result === value) {
      noun = i;
      break;
    }
  }

  return { noun, verb };
};

export default findNounAndVerbEvaluation;
