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
    const code = `import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Create${singularName}Dto } from './dto/create-${singularNameKebab}.dto';
import { Update${singularName}Dto } from './dto/update-${singularNameKebab}.dto';
import { ${singularName} } from './entities/${singularNameKebab}.entity';

@Injectable()
export class ${pluralName}Service {

  private readonly logger = new Logger('${pluralName}Service');

  constructor(
    @InjectRepository(Product)
    private readonly ${singularNameCamel}Repository: Repository<Product>,
  ){}

  async findAll() {
    return await this.productRepository.find({});
  }

  async findOne(id: string) {
    const data = await this.productRepository.findOneBy({ id });
    if( !data )
      throw new NotFoundException(\`Product with id \${id} not found\`);

    return data;
  }

  async create(create${singularName}Dto: Create${singularName}Dto) {
    try {      
      const data = this.${singularNameCamel}Repository.create(createProductDto);
      await this.${singularNameCamel}Repository.save(data);
      return data;

    } catch (error) {
      this.handleDBException(error);
    }
  }

  async update(id: string, update${singularName}Dto: Update${singularName}Dto) {
    return \`This action updates a #\${id} item\`;
  }

  async remove(id: string) {
    const data = await this.findOne(id);
    await this.productRepository.remove(data);
    return \`Delete #\${id}\`;
  }

  // TODO cambiar a un metodo general
  private handleDBException(error: any) {
    if(error.code === '23505')
      throw new BadRequestException(error.detail);
      
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
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