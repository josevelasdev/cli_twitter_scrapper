
import fs from 'fs';
import { parse } from 'json2csv';

function getCurrentDirectoryBase() {
  return path.basename(process.cwd())
}

function directoryExists (filePath) {
  return fs.existsSync(filePath);
} 

function createCSV(response, fields, title) {
  console.log('response', response)
  const res = response;
  console.log(res)
  // const fields = ['id', 'full_text'];
  const opts = { fields };
  const csv = parse(res, opts);
  fs.writeFile(`${title}`, csv, { flag: 'a+' }, err => {})
}
export { getCurrentDirectoryBase, directoryExists, createCSV };
