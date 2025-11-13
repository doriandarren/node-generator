import { readInput } from "../../../helpers/inquirer.js";
import { generateLinesMainTS } from "./generateLinesMainTS.js";
import { generateClassValidator } from "./generateClassValidator.js";
import { generateCommandLine } from "./generateCommandLine.js";
import { generateCommon } from "./generateCommon.js";
import { generateDockerComposeYaml } from "./generateDockerComposeYaml.js";
import { generateEnv } from "./generateEnv.js";
import { generateGitignore } from "./generateGitignore.js";
import { generateReadme } from "./generateReadme.js";
import { generateServeStatic } from "./generateServeStatic.js";
import { generateTypeORM } from "./generateTypeORM.js";
import { generateUUID } from "./generateUUID.js";
import { generateMappedTypes } from "./generateMappedTypes.js";
import { generateHttp } from "./generateHttp.js";
import { generateSeeder } from "./generateSeeder.js";
import { generateShared } from "./generateShared.js";
import { generateMulter } from "./generateMulter.js";

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

  await generateUUID(fullPath);

  await generateMappedTypes(fullPath);

  await generateLinesMainTS(fullPath);

  await generateClassValidator(fullPath);

  await generateEnv(fullPath);

  await generateServeStatic(fullPath);

  await generateGitignore(fullPath);

  await generateDockerComposeYaml(fullPath);

  await generateReadme(fullPath);

  await generateTypeORM(fullPath);

  await generateCommon(fullPath);

  await generateHttp(fullPath);

  await generateSeeder(fullPath);

  await generateMulter(fullPath);

  //await generateShared(fullPath);

  //TODO falta Correo y Crones


};
