import { solve01, solve02, solve03, solve04, solve05, solve06 } from '_src';

const solveAll = async () => {
  await solve01();
  await solve02();
  // await solve03(); // not implemented
  await solve04();
  await solve05();
  await solve06();
}

export default solveAll();
