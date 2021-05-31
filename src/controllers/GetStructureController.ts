import { GetStructureUseCase } from "../useCases/getStructure/GetStructureUseCase";

export class GetStructureController {
  constructor(private getStructureUseCase: GetStructureUseCase) { }

  handle() {
    try {
      return this.getStructureUseCase.execute();
    } catch (err) {
      console.error(err.message || 'Unexpected error.');
    }
  }
}