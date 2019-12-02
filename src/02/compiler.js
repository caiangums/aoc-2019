import { PROGRAM_OPCODE } from '_constants';

export const parse = ({ list, index }) => ({
  opcode: list[index],
  reg1: list[index + 1],
  reg2: list[index + 2],
  reg3: list[index + 3]
});

export const execute = ({ command, memory }) => {
  const { opcode, reg1, reg2, reg3 } = command;

  const newMemory = memory;
  if (opcode === PROGRAM_OPCODE.ADD) {
    newMemory[reg3] = memory[reg1] + memory[reg2];
  } else {
    newMemory[reg3] = memory[reg1] * memory[reg2];
  }

  return newMemory;
};
