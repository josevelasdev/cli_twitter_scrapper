import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import {
  getCurrentDirectoryBase,
  directoryExists,
  createCSV,
} from "./lib/files.mjs";
import { getDataByParameterTwitter } from "./lib/inquirer.mjs";
import { authenticateClient, getDataTwitterByQuery } from "./lib/fetch.mjs";

const getDataByParameterTwitterRsp = async () => {
  const query_twt = await getDataByParameterTwitter();
  const token = await authenticateClient();
  const response = await getDataTwitterByQuery(token, query_twt);
  createCSV(response);
};

clear();
console.log(
  chalk.yellow(figlet.textSync("TwitterAnalytic", { horizontalLayout: "full" }))
);
getDataByParameterTwitterRsp();
