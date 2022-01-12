
import fs from 'fs';
import { parse } from 'json2csv';

function getCurrentDirectoryBase() {
  return path.basename(process.cwd())
}

function directoryExists (filePath) {
  return fs.existsSync(filePath);
} 

function createCSV(response, title = 'result') {
  const fields = Object.keys(response[0])
  const opts = { fields };
  const csv = parse(response, opts);
  fs.writeFile(`${title}.csv`, csv, { flag: 'a+' }, err => {})
}
export { getCurrentDirectoryBase, directoryExists, createCSV };
