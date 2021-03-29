import inquirer from "inquirer";

import { save, load, configure } from "./index";
import { clear, errorLog } from "../Components";

export function Menu() {
  clear();
  // User Input
  inquirer
    .prompt([
      {
        type: "list",
        name: "select",
        message: "Select Menu:",
        choices: ["Save", "Load", "Configure", "Exit"],
      },
    ])
    .then((option) => {
      switch (option.select) {
        case "Save":
          save();
          break;
        case "Load":
          load();
          break;
        case "Configure":
          configure();
          break;
        case "Exit":
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
