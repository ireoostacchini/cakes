import { Container } from "inversify";
import IBusiness from "./business/IBusiness";
import Business from "./business";
import IDb from "./db/IDb";
import Db from "./db";
import DbConnectionManager from "./db/dbConnectionManager";
import { TypeNames } from "./constants/TypeNames";


const container = new Container();
container.bind<IBusiness>(TypeNames.IBusiness).to(Business);
container.bind<IDb>(TypeNames.IDb).to(Db);
container.bind<DbConnectionManager>(TypeNames.IDbConnectionManager).to(DbConnectionManager);

export default container;