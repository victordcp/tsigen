import { BuildInterfaceUseCase } from "../useCases/buildInterface/BuildInterfaceUseCase";
import { IBuildInterfaceDTO } from "../useCases/buildInterface/BuildInterfaceUseCaseDTO";

export class BuildInterfaceController {
  constructor(private buildInterfaceUseCase: BuildInterfaceUseCase) { }

  handle(data: IBuildInterfaceDTO) {
    try {
      return this.buildInterfaceUseCase.execute(data);
    } catch (err) {
      console.error(err.message || 'Unexpected error.');
    }
  }
}