import { isValidString } from '_utils';

const convertStringToNumberList = ({ string, separator }) =>
  string
    .split(separator)
    .reduce(
      (acc, strValue) =>
        isValidString(strValue) ? [...acc, parseInt(strValue)] : acc,
      []
    );

export default convertStringToNumberList;
