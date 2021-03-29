export interface Collections {
  id: any;
  iam: string;
  password: string;
  type: string;
  reference: string;
  reference_link: string;
  created: string;
  updated: string;
}

export interface lowDatabase {
  store: Array<Collections>;
}

export interface Passport {
  user: string;
  pass: string;
  secret: string;
}

export interface Form {
  _id: any;
  _iam: string;
  _password: string;
  _password_confirm: string;
  _type: string;
  _reference: string;
  _reference_link: string;
}

export interface Passport {
  user: string;
  pass: string;
}
