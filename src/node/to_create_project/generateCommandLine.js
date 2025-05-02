import { runExec, createFolder } from "../../helpers/helperFile.js";
import fs from 'fs';
import path from 'path';



export const generateCommandLine = async(fullPath) => {
    
    await createProject(fullPath);
    await installExpress(fullPath);
    await updatePackageJSON(fullPath);

}




const createProject = async(fullPath) => {
    createFolder(fullPath);
    const cmd = `npm init -y`;
    await runExec(cmd, fullPath);
}



const installExpress = async(fullPath) => {
    console.log(`📦 Instalando dependencias en: ${fullPath}`);
    const cmd = `npm install express dotenv`;
    await runExec(cmd, fullPath);
}



const updatePackageJSON = async(fullPath) => {

    const packagePath = path.join(fullPath, 'package.json');

    try {
      const content = fs.readFileSync(packagePath, 'utf-8');
      const pkg = JSON.parse(content);
  
      pkg.type = "module";
      pkg.scripts = {
        //...pkg.scripts,
        dev: "nodemon app.js"
      };
  
      fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
      console.log('✅ package.json actualizado'.green);
    } catch (error) {
      console.error(`❌ Error actualizando package.json: ${error.message}`.red);
    }

}





