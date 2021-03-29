import fs from "fs";

import inquirer from "inquirer";
import NodeRSA from "node-rsa";
import { nanoid } from "nanoid";

import { clear, defaultLog } from "../Components";
import { Menu } from "./index";

const keydata = fs.readFileSync("public.key", "utf8");

const key = new NodeRSA();
key.importKey(keydata);

export function configure() {
  clear();
  inquirer
    .prompt([
      {
        type: "list",
        name: "selection",
        message: "Select Option",
        choices: [
          "Change Username and Password",
          "Re-generate new Secret",
          "Back",
        ],
      },
    ])
    .then((response) => {
      switch (response.selection) {
        case "Change Username and Password":
          changeUserPass();
          break;
        case "Re-generate new Secret":
          generateSecret();
          break;
        case "Back":
          Menu();
          break;
        default:
          break;
      }
    });
}

function changeUserPass() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "user",
        message: "Input username",
      },
      {
        type: "input",
        name: "pass",
        message: "Input password",
      },
      {
        type: "confirm",
        name: "choise",
        message: "Are You Sure?",
      },
    ])
    .then((answer) => {
      if (answer.choise === true) {
        const encrypted = key.encrypt(answer, "base64");
        fs.writeFileSync("./store/account.txt", encrypted);
        process.exit();
      } else {
        configure();
      }
    });
}

function generateSecret() {
  defaultLog("Warning\nIf you do this, you can't retrive any data you store");
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "generate",
        message: "Are You Sure?",
        default: false,
      },
    ])
    .then((answer) => {
      if (answer.generate === true) {
        const encrypted = key.encrypt(nanoid(), "base64");
        fs.writeFileSync("./store/token.txt", encrypted);
      } else {
        configure();
      }
    });
}
