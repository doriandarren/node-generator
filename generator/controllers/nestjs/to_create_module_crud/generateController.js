import fs from "fs";
import path from "path";
import { createFolder } from "../../../helpers/helperFile.js";

export const generateController = async (
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
  const filePath = path.join(folderPath, `${pluralNameKebab}.controller.ts`);

  // Asegurar que la carpeta exista
  createFolder(folderPath);

  // Code
  const code = `
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ${pluralName}Service } from './${pluralNameKebab}.service';
import { Create${singularName}Dto } from './dto/create-${singularNameKebab}.dto';
import { Update${singularName}Dto } from './dto/update-${singularNameKebab}.dto';

@Controller('${pluralNameKebab}')
export class ${pluralName}Controller {
  constructor(private readonly ${pluralNameCamel}Service: ${pluralName}Service) {}

  @Post()
  create(@Body() create${singularName}Dto: Create${singularName}Dto) {
    return this.${pluralNameCamel}Service.create(create${singularName}Dto);
  }

  @Get()
  findAll(@Query() query?: any) {
    return this.${pluralNameCamel}Service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.${pluralNameCamel}Service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() update${singularName}Dto: Update${singularName}Dto) {
    return this.${pluralNameCamel}Service.update(id, update${singularName}Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.${pluralNameCamel}Service.remove(id);
  }
}
  `.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }
};
