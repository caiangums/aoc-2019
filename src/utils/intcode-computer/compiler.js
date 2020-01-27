import readlineSync from 'readline-sync';

import { PROGRAM_OPCODE, PROGRAM_MODE } from '_constants';

import discoverModes from './discover-modes';

// LOGGER
const LOG = false;

export const parse = ({ memory, IP }) => {
  const register0 = memory[IP];

  // const opcode = register0 % 100 === 99 ? 99 : register0 % 10;
  const opcode = register0 % 100;

  const modes = discoverModes(register0);

  return {
    opcode,
    reg1: memory[IP + 1],
    reg2: memory[IP + 2],
    reg3: memory[IP + 3],
    modes
  };
};

const executeOperation = ({ command, memory, IP }) => {
  const { opcode, reg1, reg2, reg3, modes } = command;
  LOG &&
    console.log(
      `\n${opcode}, memory[${reg1}]=${memory[reg1]}(${modes.reg1}), memory[${reg2}]=${memory[reg2]}(${modes.reg2}), memory[${reg3}]=${memory[reg3]}(${modes.reg3})\n`
    );

  const value1 = modes.reg1 === PROGRAM_MODE.POSITION ? memory[reg1] : reg1;
  const value2 = modes.reg2 === PROGRAM_MODE.POSITION ? memory[reg2] : reg2;
  const position = modes.reg3 === PROGRAM_MODE.POSITION ? reg3 : IP + 4;

  switch (opcode) {
    case PROGRAM_OPCODE.ADD:
      memory[position] = value1 + value2;
      LOG &&
        console.log(
          `ADD        memory[${position}] -> ${memory[position]} = ${value1} + ${value2}`
        );
      return;
    case PROGRAM_OPCODE.MULTIPLY:
      memory[position] = value1 * value2;
      LOG &&
        console.log(
          `MUL        memory[${position}] -> ${memory[position]} = ${value1} * ${value2}`
        );
      return;
    case PROGRAM_OPCODE.JUMP_IF_TRUE:
      LOG &&
        console.log(`JIT        IP -> ${IP} to ${value2} if ${value1} !== 0`);
      if (value1 !== 0) {
        return { jumped: true, newIP: value2 };
      }
      return;
    case PROGRAM_OPCODE.JUMP_IF_FALSE:
      LOG &&
        console.log(`JIF        IP -> ${IP} to ${value2} if ${value1} === 0`);
      if (value1 === 0) {
        return { jumped: true, newIP: value2 };
      }
      return;
    case PROGRAM_OPCODE.LESS_THAN:
      memory[position] = value1 < value2 ? 1 : 0;
      LOG &&
        console.log(
          `LTN        memory[${position}] -> ${memory[position]} = ${value1 <
            value2}`
        );
      return;
    case PROGRAM_OPCODE.EQUAL:
      memory[position] = value1 === value2 ? 1 : 0;
      LOG &&
        console.log(
          `EQL        memory[${position}] -> ${memory[position]} = ${value1 ===
            value2}`
        );
      return;
    default:
      return;
  }
};

export const execute = ({
  command,
  memory,
  IP,
  inputValueList,
  outputValueList
}) => {
  const { opcode, reg1 } = command;

  if (opcode === PROGRAM_OPCODE.OUTPUT) {
    // in case of output sent by program
    if (outputValueList !== undefined) {
      outputValueList.push(memory[reg1].toString());
      inputValueList.push(memory[reg1].toString());
      return;
    }
    console.log('> output', memory[reg1]);
    return;
  }

  if (opcode === PROGRAM_OPCODE.INPUT) {
    // in case of input sent by program
    if (inputValueList !== undefined && inputValueList.length > 0) {
      memory[reg1] = parseInt(inputValueList.shift());
      return;
    }
    const input = readlineSync.question('Insert your Input > ');
    LOG && console.log('input', memory[reg1], reg1, input, parseInt(input));
    memory[reg1] = parseInt(input);
    return;
  }

  return executeOperation({ command, memory, IP });
};
