import { Container } from "inversify";
import IBusiness from "./business/IBusiness";
import Business from "./business";
import IDb from "./db/IDb";
import Db from "./db";
import DbConnectionManager from "./db/dbConnectionManager";
import { Types } from "./constants/Types";


const container = new Container();
container.bind<IBusiness>(Types.IBusiness).to(Business);
container.bind<IDb>(Types.IDb).to(Db);
container.bind<DbConnectionManager>(Types.IDbConnectionManager).to(DbConnectionManager);

export default container;