import inquirer from "inquirer";

import { clear, errorLog } from "./Components";
import { validateUser, validatePass } from "./Functions";
import { Menu } from "./public";

function Main() {
  clear();

  // User Input
  inquirer
    .prompt([
      {
        type: "password",
        name: "user",
        message: "Username:",
        validate: validateUser,
      },
      {
        type: "password",
        name: "pass",
        message: "Password:",
        validate: validatePass,
      },
    ])
    .then(() => {
      Menu();
    })
    .catch((err) => {
      errorLog(err);
    });
}

Main();
