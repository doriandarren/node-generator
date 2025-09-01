import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../helpers/helperFile.js';


export const generateText = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'components', 'Text');
    
    // File
    const filePath = path.join(folderPath, 'ThemedText.jsx');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
export const ThemedText = ({
  className = "",
  type = "normal",
  ...rest
}) => {
  const baseClasses = "text-gray-700 mb-4";

  const typeClasses = {
    normal: "font-bold",
    h1: "text-3xl font-bold",
    h2: "text-2xl font-bold",
    link: "font-normal underline cursor-pointer hover:opacity-80",
  };

  return (
    <span
      className={[baseClasses, typeClasses[type], className].join(" ")}
      {...rest}
    />
  );
};    
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }

}