import inquirer from "inquirer";

import { selectedView, errorLog } from "../Components";
import { Form } from "../Constant";
import {
  noSpace,
  Update,
  Save,
  validateReferenceLink,
  required,
} from "../Functions";

export function Email(type: string, query?: string) {
  query ? selectedView(query) : null;
  // User Input
  inquirer
    .prompt([
      {
        type: "input",
        name: "_iam",
        message: "Input Email:",
        validate: noSpace,
      },
      {
        type: "password",
        name: "_password",
        message: "Input Password:",
        validate: noSpace,
      },
      {
        type: "password",
        name: "_password_confirm",
        message: "Re-Type Password:",
        validate: noSpace,
      },
      {
        type: "input",
        name: "_reference",
        message: "Input Reference:",
        validate: required,
      },
      {
        type: "input",
        name: "_reference_link",
        message: "Input Reference Link:",
        validate: validateReferenceLink,
      },
    ])
    .then((response: Form) => {
      query ? Update(response, type, query) : Save(response, type);
    })
    .catch((err) => {
      errorLog(err);
    });
}

export function Username(type: string, query?: string) {
  query ? selectedView(query) : null;
  // User Input
  inquirer
    .prompt([
      {
        type: "input",
        name: "_iam",
        message: "Input Username:",
        validate: noSpace,
      },
      {
        type: "password",
        name: "_password",
        message: "Input Password:",
        validate: noSpace,
      },
      {
        type: "password",
        name: "_password_confirm",
        message: "Re-Type Password:",
        validate: noSpace,
      },
      {
        type: "input",
        name: "_reference",
        message: "Input Reference:",
        validate: required,
      },
      {
        type: "input",
        name: "_reference_link",
        message: "Input Reference Link:",
        validate: validateReferenceLink,
      },
    ])
    .then((response: Form) => {
      query ? Update(response, type, query) : Save(response, type);
    })
    .catch((err) => {
      errorLog(err);
    });
}

export function Bind(type: string, query?: string) {
  query ? selectedView(query) : null;
  // User Input
  inquirer
    .prompt([
      {
        type: "input",
        name: "_iam",
        message: "From:",
      },
      {
        type: "input",
        name: "_reference",
        message: "To:",
      },
      {
        type: "input",
        name: "_reference_link",
        message: "Input Bind Link:",
        validate: required,
      },
    ])
    .then((response: Form) => {
      query ? Update(response, type, query) : Save(response, type);
    })
    .catch((err) => {
      errorLog(err);
    });
}
