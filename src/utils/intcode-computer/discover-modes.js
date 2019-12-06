const getRegisterMode = ({ registerModes, registerIndex }) =>
  Math.floor(registerModes / Math.pow(10, registerIndex)) % 2;

const discoverModes = register => {
  const registerModes = Math.floor(register / 100);

  const modes = {
    reg1: getRegisterMode({ registerModes, registerIndex: 0 }),
    reg2: getRegisterMode({ registerModes, registerIndex: 1 }),
    reg3: getRegisterMode({ registerModes, registerIndex: 2 })
  };

  return modes;
};

export default discoverModes;
