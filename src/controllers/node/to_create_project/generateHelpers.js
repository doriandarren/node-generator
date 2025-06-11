import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';




export const generateHelpers = async(fullPath) => {
    
    await createBaseController(fullPath);
    await createSafeJson(fullPath);
    await createJWT(fullPath);
    await createMessageChannel(fullPath);
    await createBaseRepository(fullPath);
    await createCheckIdExists(fullPath);

}




const createBaseController = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'helpers', 'controllers');
    
    // File
    const filePath = path.join(folderPath, 'baseController.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { safeJson } from "./safeJson.js";


export class BaseController {

  constructor(res) {
    this.res = res;
    this.statusCode = 200;
  }

  // Setter y getter del código HTTP
  setCode(code) {
    this.statusCode = code;
  }

  getCode() {
    return this.statusCode;
  }

  // Método base que devuelve el JSON con el código correcto
  respond(payload) {
    const safePayload = safeJson(payload);
    return this.res.status(this.getCode()).json(safePayload);
  }

  // 200 OK
  respondWithData(message = 'OK', data = null, success = true) {
    this.setCode(200);
    return this.respond({
      data,
      message,
      errors: null,
      success,
      status_code: this.getCode(),
    });
  }

  // 422 o cualquier error
  respondWithError(message = 'KO', errors = null, code = 422) {
    this.setCode(code);
    return this.respond({
      errors: errors ? [errors] : null,
      data: null,
      message,
      success: false,
      status_code: this.getCode(),
    });
  }

  // 400 Bad Request
  respondHttpBadRequest(message = "Bad Request") {
    this.setCode(400);
    return this.respondWithError({ e: message }, message, this.getCode());
  }

  // 401 Unauthorized
  respondHttpUnauthorized(message = "Unauthorized") {
    this.setCode(401);
    return this.respondWithError({ e: message }, message, this.getCode());
  }

  // 403 Forbidden
  respondHttpForbidden(message = "Forbidden") {
    this.setCode(403);
    return this.respondWithError({ e: message }, message, this.getCode());
  }

  // 404 Not Found
  respondHttpNotFound(message = "Resource Not Found") {
    this.setCode(404);
    return this.respondWithError({ e: message }, message, this.getCode());
  }

  // 409 Conflict
  respondHttpConflict(message = "Data Conflict") {
    this.setCode(409);
    return this.respondWithError({ e: message }, message, this.getCode());
  }

  // 422 Unprocessable Entity
  respondUnprocessableEntity(message = "Unprocessable Entity") {
    this.setCode(422);
    return this.respondWithError({ e: message }, message, this.getCode());
  }

  // 500 Internal Server Error
  respondHttpInternalError(message = "Internal Server Error") {
    this.setCode(500);
    return this.respondWithError({ e: message }, message, this.getCode());
  }
}
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}


const createSafeJson = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'helpers', 'controllers');
    
    // File
    const filePath = path.join(folderPath, 'safeJson.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
export function safeJson(data) {
  const seen = new WeakSet();

  return JSON.parse(
    JSON.stringify(data, (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) return "[Circular]";
        seen.add(value);
      }
      return value;
    })
  );
}
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}


const createJWT = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'helpers', 'jwt');
    
    // File
    const filePath = path.join(folderPath, 'generateJWT.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import jwt from 'jsonwebtoken';

export const generateJWT = (uid = '') => {
    
    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if( err ){
                console.log( err );
                reject('No se pudo generar el token');
            }else{
                resolve( token );
            }    
        });

    })

}
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}



const createMessageChannel = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'helpers', 'messages');
    
    // File
    const filePath = path.join(folderPath, 'MessageChannel.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
// src/utils/messageChannel.js
const URL = 'https://discord.com/api/webhooks/1368232013127225436/2gYOCBvVvBHz1gh9HyKTF7IPHRbGMqVTup4EN-9ru5hfcPkr84TLNcOoNaTN2kvCl1zu';


export class MessageChannel {
    
  static async send(text, title = 'Message Channel', isError = false) {
    const appName = process.env.APP_NAME || 'NodeApp';
    const appEnv = process.env.APP_ENV || 'development';
    const finalTitle = \`\${title} \${appName} \${appEnv}\`;

    // Limitar a 500 caracteres
    const limitedText = text.slice(0, 500);

    const payload = {
      embeds: [
        {
          title: finalTitle,
          description: limitedText,
          color: isError ? 0xFF0000 : 0x00FF00,
        },
      ],
    };

    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error(\`Error al enviar mensaje: \${response.status} \${response.statusText}\`);
      }
    } catch (error) {
      console.error('Error al conectar con Discord:', error.message);
    }
  }
}

`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}








const createBaseRepository = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'helpers', 'repositories');
    
    // File
    const filePath = path.join(folderPath, 'baseRepository.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
export class BaseRepository {

    constructor(){
        this.LATEST = ['createdAt', 'DESC'];
    }

}
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}





const createCheckIdExists = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'helpers', 'validators');
    
    // File
    const filePath = path.join(folderPath, 'checkIdExists.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
// src/helpers/validators/checkIdExists.js
export const checkIdExists = (Model) => {
  return async (id) => {
    const record = await Model.findByPk(id);
    if (!record) {
      throw new Error(\`\${Model.name} with ID \${id} not found\`);
    }
  };
};
`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}