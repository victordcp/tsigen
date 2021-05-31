import { IDatabaseRepository } from "../../repositories/IDatabaseRepository";

export class GetStructureUseCase {
  constructor(private dbRepository: IDatabaseRepository) {}

  execute() {
    return this.dbRepository.getTablesStructure();
  }
}