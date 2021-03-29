import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

import { lowDatabase } from "../Constant";

const adapters = new FileSync<lowDatabase>("./store/database.json");
export const database = low(adapters);

database.defaults({ store: [] }).write();
