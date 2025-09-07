import { runExec, createFolder } from "../../../helpers/helperFile.js";
import fs from 'fs';
import path from 'path';



export const generateCommandLine = async(fullPath, projectName) => {
    
    await createProject(fullPath);
    await installEnv(fullPath);
    await installExpress(fullPath);
    await installBcryptjs(fullPath);
    await installCors(fullPath);
    await installSequalize(fullPath);
    await installJsonwebtoken(fullPath);
    await installFaker(fullPath);
    await installNodemon(fullPath);

    await updatePackageJSON(fullPath, projectName);

}


/**
 * Init Project
 * @param {*} fullPath 
 */
const createProject = async(fullPath) => {
    createFolder(fullPath);
    const cmd = `npm init -y`;
    await runExec(cmd, fullPath);
}



/**
 * Install Env
 * @param {*} fullPath 
 */
const installEnv = async(fullPath) => {
    console.log(`📦 Instalando dependencias Env`);
    const cmd = `npm install dotenv`;
    await runExec(cmd, fullPath);
}


/**
 * Install Express
 * @param {*} fullPath 
 */
const installExpress = async(fullPath) => {
  console.log(`📦 Instalando dependencias Express`);
  const cmd = `npm install express express-validator`;
  await runExec(cmd, fullPath);
}


/**
 * Install Encript password
 * @param {*} fullPath 
 */
const installBcryptjs = async(fullPath) => {
  console.log(`📦 Instalando dependencias bcryptjs`);
  const cmd = `npm install bcryptjs`;
  await runExec(cmd, fullPath);
}



/**
 * Install Cors
 * @param {*} fullPath 
 */
const installCors = async(fullPath) => {
  console.log(`📦 Instalando dependencias cors`);
  const cmd = `npm install cors`;
  await runExec(cmd, fullPath);
}



/**
 * Install Sequalize
 * @param {*} fullPath 
 */
const installSequalize = async(fullPath) => {
  console.log(`📦 Instalando dependencias Sequalize`);
  const cmd = `npm install sequelize mysql2`;
  await runExec(cmd, fullPath);
}


/**
 * Install Jsonwebtoken
 * @param {*} fullPath 
 */
const installJsonwebtoken = async(fullPath) => {
  console.log(`📦 Instalando dependencias Jsonwebtoken`);
  const cmd = `npm install jsonwebtoken`;
  await runExec(cmd, fullPath);
}



/**
 * Install Faker
 * @param {*} fullPath 
 */
const installFaker = async(fullPath) => {
    createFolder(fullPath);
    const cmd = `npm install @faker-js/faker`;
    await runExec(cmd, fullPath);
}


/**
 * Install Faker
 * @param {*} fullPath 
 */
const installNodemon = async(fullPath) => {
    createFolder(fullPath);
    const cmd = `npm i -D nodemon`;
    await runExec(cmd, fullPath);
}



/**
 * Update Package JSON
 * @param {*} fullPath 
 * @param {*} projectName 
 */
const updatePackageJSON = async(fullPath, projectName) => {

    const packagePath = path.join(fullPath, 'package.json');

    try {
      const content = fs.readFileSync(packagePath, 'utf-8');
      const pkg = JSON.parse(content);
  
      pkg.name = projectName;
      pkg.main = "app.js";
      pkg.type = "module";
      pkg.scripts = {
        //...pkg.scripts,
        dev: "nodemon app.js",
        "db:connection": "node src/scripts/dbTestConnection.js",
        "db:migration": "node src/scripts/dbMigration.js",
        "db:reset": "node src/scripts/dbReset.js"
      };
  
      fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
      console.log('✅ package.json actualizado'.green);
    } catch (error) {
      console.error(`❌ Error actualizando package.json: ${error.message}`.red);
    }

}





