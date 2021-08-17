import { Container } from "inversify";
import IBusiness from "./business/IBusiness";
import Business from "./business";
import IDb from "./db/IDb";
import Db from "./db";
import DbConnectionManager from "./db/dbConnectionManager";
import { TYPES } from "./constants/types";

const container = new Container();
container.bind<IBusiness>(TYPES.IBusiness).to(Business);
container.bind<IDb>(TYPES.IDb).to(Db);
container.bind<DbConnectionManager>(TYPES.IDbConnectionManager).to(DbConnectionManager);

export default container;