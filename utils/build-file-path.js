import path from 'path';

const buildFilePath = relativeFilePath =>
  path.join(__dirname.replace('/utils', ''), relativeFilePath);

export default buildFilePath;
