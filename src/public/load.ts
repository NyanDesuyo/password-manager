import inquirer from "inquirer";

import {
  Email,
  Username,
  Bind,
  clear,
  errorLog,
  table,
  defaultLog,
  backToMenu,
  selectedView,
} from "../Components";
import { database } from "../Database";
import { unPack, validateID } from "../Functions";

export function load() {
  clear();
  // showing data to table
  table();
  // User Input
  inquirer
    .prompt([
      {
        type: "input",
        name: "selectedID",
        message: "Copy ID from Table",
        validate: validateID,
      },
      {
        type: "list",
        name: "type",
        message: "Select Actions",
        choices: ["View", "Edit", "Delete"],
      },
    ])
    .then((result) => {
      switch (result.type) {
        case "View":
          View(result.selectedID);
          break;
        case "Edit":
          Edit(result.selectedID);
          break;
        case "Delete":
          Delete(result.selectedID);
          break;
        default:
          break;
      }
    })
    .catch((err) => {
      errorLog(err);
    });
}

function View(selectedID: string) {
  clear();
  // Viewing data from database
  selectedView(selectedID);
  backToMenu();
}
function Edit(selectedID: string) {
  clear();

  const result = database.get("store").find({ id: selectedID }).value();

  switch (unPack(result.type)) {
    case "Email":
      Email(result.type, selectedID);
      break;
    case "Username":
      Username(result.type, selectedID);
      break;
    case "Bind":
      Bind(result.type, selectedID);
      break;
    default:
      break;
  }
}
function Delete(selectedID: string) {
  clear();
  // Delete data from database
  database.get("store").remove({ id: selectedID }).write();

  defaultLog("Data Have been deleted");
  backToMenu();
}
