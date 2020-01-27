import { PROGRAM_OPCODE } from '_constants';

import { parse, execute } from './compiler';

const countInstruction = ({ opcode, infos, IP }) => {
  // in case of instructions with just two parameterw
  if (
    [PROGRAM_OPCODE.JUMP_IF_TRUE, PROGRAM_OPCODE.JUMP_IF_FALSE].includes(opcode)
  ) {
    return infos && infos.newIP ? infos.newIP : IP + 3;
    // in case of instructions with just one parameter
  } else if ([PROGRAM_OPCODE.OUTPUT, PROGRAM_OPCODE.INPUT].includes(opcode)) {
    return IP + 2;
  }

  return IP + 4;
};

const evaluateProgram = (
  integerList,
  inputValueList = undefined,
  outputValueList = undefined
) => {
  let memory = [...integerList],
    IP,
    reg3Index;

  // IP is the (I)nstruction (P)ointer
  for (IP = 0; IP < memory.length; ) {
    const command = parse({ memory, IP });

    const { opcode } = command;
    if (opcode === PROGRAM_OPCODE.END_OF_EXECUTION) {
      break;
    }

    const infos = execute({
      command,
      memory,
      IP,
      inputValueList,
      outputValueList
    });

    IP = countInstruction({ opcode, infos, IP });
  }

  return memory;
};

export default evaluateProgram;
