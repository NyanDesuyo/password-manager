import inquirer from "inquirer";

import { defaultLog, clear, errorLog } from "../Components";
import { database } from "../Database";
import { unPack } from "../Functions";
import { Menu } from "../public";

export async function table() {
  const query = database.get("store").filter({}).value();

  const _id: string[] = [];
  const _iam: string[] = [];
  const _reference: string[] = [];

  query.forEach((result) => {
    _id.push(result.id);
    _iam.push(unPack(result.iam));
    _reference.push(unPack(result.reference));
  });

  defaultLog("ID\t\t\tIAM\t\t\tReference");
  for (let a = 0; a < query.length; a++) {
    console.log(`${_id[a]}\t${_iam[a]}\t${_reference[a]}\n`);
  }
}

export function selectedView(selectedID?: string) {
  const _query = database.get("store").find({ id: selectedID }).value();

  defaultLog(`ID             : ${_query.id}`);
  defaultLog(`Type           : ${unPack(_query.type)}`);
  defaultLog(`IAM            : ${unPack(_query.iam)}`);
  defaultLog(`Password       : ${unPack(_query.password)}`);
  defaultLog(`Reference      : ${unPack(_query.reference)}`);
  defaultLog(`Reference Link : ${unPack(_query.reference_link)}`);
  defaultLog(`Created        : ${unPack(_query.created)}`);
  defaultLog(`Updated        : ${unPack(_query.updated)}`);
}

export function backToMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "retry",
        message: "Back to Menu?",
        choices: ["yes", "no"],
      },
    ])
    .then((answer) => {
      switch (answer.retry) {
        case "yes":
          clear();
          Menu();
          break;
        case "no":
          clear();
          process.exit();
        default:
          break;
      }
    })
    .catch((err) => {
      errorLog(err);
    });
}
