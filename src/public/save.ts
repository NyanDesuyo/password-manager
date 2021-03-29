import inquirer from "inquirer";

import { Email, Username, Bind, clear, errorLog } from "../Components";

export function save() {
  clear();
  // User Input
  inquirer
    .prompt([
      {
        type: "list",
        name: "type",
        message: "Select Login Methond",
        choices: ["Email", "Username", "Bind"],
      },
    ])
    .then((result) => {
      switch (result.type) {
        case "Email":
          Email(result.type);
          break;
        case "Username":
          Username(result.type);
          break;
        case "Bind":
          Bind(result.type);
          break;
        default:
          break;
      }
    })
    .catch((err) => {
      errorLog(err);
    });
}
