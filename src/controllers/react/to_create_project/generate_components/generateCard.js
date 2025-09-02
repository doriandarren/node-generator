import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../helpers/helperFile.js';


export const generateCard = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'components', 'Cards');
    
    // File
    const filePath = path.join(folderPath, 'ThemedCard.jsx');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
export const ThemedCard = ({ className = "", variant = "default", children }) => {
  const baseClasses = "mx-auto bg-white rounded-lg shadow-lg p-6";

  const variantClasses = {
    default: "",
    form: "max-w-4xl",       // para create/edit
    info: "border border-gray-200",
    stats: "bg-gradient-to-r from-indigo-500 to-purple-500 text-white",
  };

  return (
    <div className={[baseClasses, variantClasses[variant], className].join(" ")}>
      {children}
    </div>
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