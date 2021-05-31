import { IConfigRepository } from "./IConfigRepository";

export interface IDatabaseRepository {
  getTablesStructure(): Promise<any>;
}