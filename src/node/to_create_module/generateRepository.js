import fs from 'fs';
import path from 'path';
import { createFolder } from '../../helpers/helperFile.js';


export const generateRepository = async(
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
    const folderPath = path.join(fullPath, 'src', 'repositories', singularNameSnake, );
    
    // File
    const filePath = path.join(folderPath, `${singularNameCamel}Repository.js`);

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { BaseRepository } from '../../helpers/repositories/baseRepository.js';
import ${singularName} from '../../models/${singularName}.js';
import { Op } from 'sequelize'; // Para queries avanzadas si las necesitas


//const WITH = ['roles', 'status'];


export class ${singularName}Repository extends BaseRepository {
  
  // 📌 List
  async list() {
    return await ${singularName}.findAll({
      order: [this.LATEST],
      //include: WITH // relations
    });
  }

  // 📌 Show
  async show(id) {
    return await ${singularName}.findByPk(id, {
      //include: WITH
    });
  }

  // 📌 Find
  async findByEmail(email) {
    return await ${singularName}.findOne({
      where: { email },
      //include: WITH
    });
  }

  // 📌 Store
  async store(data) {
    return await ${singularName}.create(data);
  }

  // 📌 Update
  async update(id, data) {
    const data = await ${singularName}.findByPk(id);
    if (!data) return null;
    return await data.update(data);
  }

  // 📌 Destroy (soft-delete)
  async destroy(id) {
    const data = await ${singularName}.findByPk(id);
    if (!data) return null;
    return await data.destroy();
  }

  // 📌 Restaurar usuario soft-deleted
  async restore(id) {
    const data = await ${singularName}.findByPk(id, { paranoid: false });
    if (!data) return null;
    return await data.restore();
  }

  // 📌 Buscar por nombre o correo
  async search(term) {
    return await ${singularName}.findAll({
        include: WITH,
        where: {
            [Op.or]: [
              { name: { [Op.like]: \`%\${term}%\` } },
              { email: { [Op.like]: \`%\${term}%\` } }
            ]
        }
    });
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