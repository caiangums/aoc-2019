import { PROGRAM_OPCODE } from '_constants';

import { parse, execute } from './compiler';

const evaluateProgram = integerList => {
  let memory = [...integerList];

  for (let i = 0; i < memory.length; i += 4) {
    const command = parse({
      list: memory,
      index: i
    });

    const { opcode } = command;
    if (opcode === PROGRAM_OPCODE.END_OF_EXECUTION) {
      break;
    }

    memory = execute({ command, memory });
  }
  return memory;
}

export default evaluateProgram;
