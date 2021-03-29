import fs from "fs";

import NodeRSA from "node-rsa";
import CryptoJS from "crypto-js";

import { Passport } from "../Constant";
import { database } from "../Database";

const keydata = fs.readFileSync("private.key", "utf8");
const test = fs.readFileSync("./store/account.txt", "utf8");
const secret = fs.readFileSync("./store/token.txt", "utf8");

const key = new NodeRSA();
key.importKey(keydata);

const decrypt = key.decrypt(test, "utf8");
const decrypt2 = key.decrypt(secret, "utf8");

const _sourceOfTruth: Passport = JSON.parse(decrypt);
const _token = decrypt2.toString();

export function validateUser(user: string) {
  if (_sourceOfTruth.user === user) {
    return true;
  } else {
    return "Invalid Username";
  }
}

export function validatePass(pass: string) {
  if (_sourceOfTruth.pass === pass) {
    return true;
  } else {
    return "Invalid Password";
  }
}

export function noSpace(param: string) {
  const expresion = new RegExp(/^[\S]+$/);

  if (expresion.test(param)) {
    return true;
  } else {
    return "Cannot Use Space";
  }
}

export function required(params: string) {
  if (params !== null) {
    return true;
  } else {
    return "Please Fill this section";
  }
}

export function validateEmail(param: string) {
  const expresion = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/);

  if (expresion.test(param.toString())) {
    return true;
  } else {
    return "Invalid Email";
  }
}

export function validateReferenceLink(params: string) {
  const expresion = new RegExp(
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
  );

  if (expresion.test(params.toString())) {
    return true;
  } else {
    return "Invalid Reference Link";
  }
}

export function validateID(params: string) {
  const _query = database.get("store").find({ id: params }).value();
  if (_query === undefined) {
    return "Invalid ID, Try Again";
  } else {
    if (_query.id === params) {
      return true;
    } else {
      return "Invalid ID, Try Again";
    }
  }
}

export function Pack(param: any) {
  const encrypt = CryptoJS.AES.encrypt(param, _token).toString();
  return encrypt;
}

export function unPack(param: any) {
  const bytes = CryptoJS.AES.decrypt(param, _token);
  const decrypt = bytes.toString(CryptoJS.enc.Utf8);
  return decrypt;
}
