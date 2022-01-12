import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import { getCurrentDirectoryBase, directoryExists, createCSV } from "./lib/files.mjs";
import { getDataByParameterTwitter } from "./lib/inquirer.mjs";
import { authenticateClient, getDataTwitterByQuery } from "./lib/fetch.mjs";
 

const getDataByParameterTwitterRsp = async () => {
    const query_twt = await getDataByParameterTwitter();
    const token = await authenticateClient(query_twt?.api_key, query_twt?.api_secret);
    const response = await decodeDataQuery(token, query_twt);
    createCSV(response)
}

clear();

const decodeDataQuery = async (token_auth, query_twt) => await getDataTwitterByQuery(token_auth, query_twt);


if (directoryExists(".git")) {
  console.log(
    chalk.red(figlet.textSync("do you want to delete this analysis? ", { horizontalLayout: "full" }))
  );
  process.exit();
}

console.log(
  chalk.yellow(figlet.textSync("TwitterAnalytic", { horizontalLayout: "full" }))
);

getDataByParameterTwitterRsp();