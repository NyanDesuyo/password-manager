import { nanoid } from "nanoid";

import { backToMenu } from "../Components";
import { Form } from "../Constant";
import { database } from "../Database";
import { Pack } from ".";

export function Update(data: Form, type: string, query: string) {
  if (data._password !== null && data._password_confirm !== null) {
    if (data._password === data._password_confirm) {
      database
        .get("store")
        .find({ id: query })
        .assign({
          id: nanoid(),
          iam: Pack(data._iam),
          password: Pack(data._password),
          type: Pack(type),
          reference: Pack(data._reference),
          reference_link: Pack(data._reference_link),
          created: Pack(Date().toString()),
          updated: Pack(Date().toString()),
        })
        .write();
      backToMenu();
    } else {
      // show message for reply save action
    }
  } else {
    database
      .get("store")
      .find({ id: query })
      .assign({
        id: nanoid(),
        iam: Pack(data._iam),
        password: Pack(data._password),
        type: Pack(type),
        reference: Pack(data._reference),
        reference_link: Pack(data._reference_link),
        created: Pack(Date().toString()),
        updated: Pack(Date().toString()),
      })
      .write();
    backToMenu();
  }
}
