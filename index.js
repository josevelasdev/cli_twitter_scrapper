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
  // const token = await authenticateClient();
  try {
    const query_twt = await getDataByParameterTwitter();
    const response = await getDataTwitterByQuery(query_twt);
    if (response){
      createCSV(response);
      console.log(
        chalk.yellow(
          figlet.textSync("complete!", {
            horizontalLayout: "full",
          })
        )
      );
    } 
  } catch (error) {
    console.log(
      chalk.red(
        figlet.textSync('error in app', {
          verticalLayout: "default",
          width: 80,
        })
      )
    );
    // getDataByParameterTwitterRsp();
  }
};

clear();
console.log(
  chalk.yellow(figlet.textSync("TwitterAnalytic", { horizontalLayout: "full" }))
);
getDataByParameterTwitterRsp();
