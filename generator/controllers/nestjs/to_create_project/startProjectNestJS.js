import { readInput } from "../../../helpers/inquirer.js";
import { generateClassValidator } from "./generateClassValidator.js";
import { generateCommandLine } from "./generateCommandLine.js";
import { generateServeStatic } from "./generateServeStatic.js";

export const startProjectNestJS = async () => {
  // Ruta predeterminada
  const defaultPath = "/Users/dorian/NodejsProjects";

  const projectName = await readInput("Nombre del proyecto: ");
  let projectPath = await readInput(
    `Ruta para crear el proyecto (por defecto: ${defaultPath}): `,
    true
  );

  // Si no se introduce una ruta, usar la predeterminada
  if (!projectPath) {
    projectPath = defaultPath;
  }

  //Combinar la ruta y el nombre del proyecto
  const fullPath = `${projectPath}/${projectName}`;

  await generateCommandLine(fullPath);
  await generateClassValidator(fullPath);
  await generateServeStatic(fullPath);

  
};
