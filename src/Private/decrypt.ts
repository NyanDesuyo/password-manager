import fs from "fs";

import NodeRSA from "node-rsa";

const keydata = fs.readFileSync("private.key", "utf-8");
const test = fs.readFileSync("./store/account.txt", "utf-8");

const key = new NodeRSA();
key.importKey(keydata);

const decrypted = key.decrypt(test, "utf8");

console.log(decrypted);
