import fs from "fs";

import NodeRSA from "node-rsa";

const key = new NodeRSA();
key.generateKeyPair();
fs.writeFileSync(`public.key`, key.exportKey(`public`));
fs.writeFileSync(`private.key`, key.exportKey(`private`));

console.clear();
console.log("Private and Public key Generated");
