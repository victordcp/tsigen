import { GetStructureController } from "./controllers/GetStructureController";
import { PostgresqlProvider } from "./repositories/implementations/PostgresqlProvider";
import { YAMLProvider } from "./repositories/implementations/YAMLProvider";
import { GetStructureUseCase } from "./useCases/getStructure/GetStructureUseCase";

const yamlProvider = new YAMLProvider();
const pgProvider = new PostgresqlProvider(yamlProvider);
const getStructureUseCase = new GetStructureUseCase(pgProvider);
const getStructureController = new GetStructureController(getStructureUseCase);

getStructureController.handle()
