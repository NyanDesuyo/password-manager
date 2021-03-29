import fs from "fs";

import inquirer from "inquirer";
import NodeRSA from "node-rsa";
import { nanoid } from "nanoid";

const keydata = fs.readFileSync("public.key", "utf8");

const key = new NodeRSA();
key.importKey(keydata);

export default function register() {
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
    ])
    .then((answer) => {
      const encrypted_1 = key.encrypt(answer, "base64");
      const encrypted_2 = key.encrypt(nanoid(), "base64");
      fs.writeFileSync("./store/account.txt", encrypted_1);
      fs.writeFileSync("./store/token.txt", encrypted_2);
    });
}

register();
