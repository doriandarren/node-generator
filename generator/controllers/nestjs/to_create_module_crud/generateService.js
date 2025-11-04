import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';


export const generateService = async(
  fullPath, 
  namespace,
  singularName,
  pluralName,
  singularNameKebab,
  pluralNameKebab,
  singularNameSnake,
  pluralNameSnake,
  singularNameCamel,
  pluralNameCamel,
  columns
) => {    

    // Folder
    const folderPath = path.join(fullPath, "src", namespace, pluralNameKebab);

    // File
    const filePath = path.join(folderPath, `${pluralNameKebab}.service.ts`);

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `import { Injectable } from '@nestjs/common';
import { Create${singularName}Dto } from './dto/create-${singularNameKebab}.dto';
import { Update${singularName}Dto } from './dto/update-${singularNameKebab}.dto';

@Injectable()
export class ${pluralName}Service {
  create(create${singularName}Dto: Create${singularName}Dto) {
    return 'This action adds a new item';
  }

  findAll() {
    return \`This action returns all items\`;
  }

  findOne(id: number) {
    return \`This action returns a #\${id} items\`;
  }

  update(id: number, update${singularName}Dto: Update${singularName}Dto) {
    return \`This action updates a #\${id} item\`;
  }

  remove(id: number) {
    return \`This action removes a #\${id} item\`;
  }
}
    
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }

}