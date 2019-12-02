import fs from 'fs';
import buildFilePath from './build-file-path';

const readFile = relativePath =>
  new Promise((resolve, reject) => {
    const filePath = buildFilePath(relativePath);

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        const { code, path } = err;
        reject(`readFile() =>\n  file path: ${path}\n  code: ${code}`);
      }
      resolve(data);
    });
  });

export default readFile;
