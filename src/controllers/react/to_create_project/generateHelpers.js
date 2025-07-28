import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';
import { printMessage } from '../../../helpers/inquirer.js';


export const generateHelpers = async(fullPath) => {    
    createSweetalert2(fullPath)
    createDataFake(fullPath)
    createToast(fullPath)
    createVariantClass(fullPath)
}



const createSweetalert2 = (fullPath) => {
  const helpersDir = path.join(fullPath, "src", "helpers");

  // Crear la carpeta si no existe
  if (!fs.existsSync(helpersDir)) {
    fs.mkdirSync(helpersDir, { recursive: true });
    printMessage(`✅ Carpeta creada: ${helpersDir}`);
  }

  const filePath = path.join(helpersDir, "helperSwal.js");

  const content = `import Swal from "sweetalert2";

/* USE:    
const handleError = () => {
  showErrorAlert("Ocurrió un error inesperado");
};

const handleConfirm = async () => {
  const confirmed = await showConfirmDialog("¿Seguro que quieres continuar?");
  if (confirmed) {
    showSuccessAlert("Acción confirmada");
  }
};
*/

export const showSuccessAlert = (message) => {
  Swal.fire({
    title: "¡Éxito!",
    text: message,
    icon: "success",
    confirmButtonText: "OK",
  });
};

export const showErrorAlert = (message) => {
  Swal.fire({
    title: "¡Error!",
    text: message,
    icon: "error",
    confirmButtonText: "OK",
  });
};

export const showConfirmDialog = async (message) => {
  const result = await Swal.fire({
    title: "¿Estás seguro?",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, continuar",
    cancelButtonText: "Cancelar",
  });
  return result.isConfirmed;
};
`;

  try {
    fs.writeFileSync(filePath, content);
    printMessage(`✅ Archivo generado: ${filePath}`);
  } catch (error) {
    printMessage(`❌ Error al generar el archivo: ${error.message}`, "\x1b[31m");
  }
}


const createDataFake = (fullPath) => {
  const helpersDir = path.join(fullPath, "src", "helpers");

  // Crear carpeta si no existe
  if (!fs.existsSync(helpersDir)) {
    fs.mkdirSync(helpersDir, { recursive: true });
    console.log(`✅ Carpeta creada: ${helpersDir}`);
  }

  const filePath = path.join(helpersDir, "helperDataFake.js");

  const content = `export const dataHeaderFake = [
  { key: "name", label: "Name" },
  { key: "title", label: "Title" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
];

export const dataBodyFake = [
  { id: 1, name: "Amelia Jones", title: "Data Scientist", email: "amelia.jones@example.com", role: "Designer" },
  { id: 2, name: "Ava Williams", title: "Project Manager", email: "ava.williams@example.com", role: "Admin" },
  { id: 3, name: "Harper Moore", title: "Database Administrator", email: "harper.moore@example.com", role: "Member" },
  { id: 4, name: "Ava Hernandez", title: "Back-end Developer", email: "ava.hernandez@example.com", role: "Analyst" },
  { id: 5, name: "Noah Miller", title: "Project Manager", email: "noah.miller@example.com", role: "Tester" }
  // Puedes continuar agregando más registros si lo deseas
];`;

  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo generado: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error al generar el archivo: ${error.message}`);
  }
}


const createToast = (fullPath) => {
  const helpersDir = path.join(fullPath, "src", "helpers");

  // Crear carpeta si no existe
  if (!fs.existsSync(helpersDir)) {
    fs.mkdirSync(helpersDir, { recursive: true });
    console.log(`✅ Carpeta creada: ${helpersDir}`);
  }

  const filePath = path.join(helpersDir, "helperToast.js");

  const content = `import Swal from "sweetalert2";

export const Toast = async (text, icon = 'success') => {
  Swal.fire({
    toast: true,
    icon: icon,
    title: text,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
};`;

  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo generado: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error al generar el archivo: ${error.message}`);
  }
}



const createVariantClass = async (fullPath) => {
  const helpersDir = path.join(fullPath, 'src', 'helpers');
  const filePath = path.join(helpersDir, 'helperVariantClass.js');

  // Crear carpeta si no existe
  createFolder(helpersDir);

  const content = `export const getVariantTextClass = (variant = "neutral") => {
  return (
    {
      neutral: "text-neutral",
      special_price: "text-special-price",
      danger: "text-danger",
      warning: "text-warning",
      success: "text-success",
      info: "text-info",
      primary: "text-primary",
      secondary: "text-secondary",
    }[variant] || "text-neutral"
  );
};

export const getVariantBgClass = (variant = "neutral") => {
  return (
    {
      neutral: "bg-neutral",
      special_price: "bg-special-price",
      danger: "bg-danger",
      warning: "bg-warning",
      success: "bg-success",
      info: "bg-info",
      primary: "bg-primary",
      secondary: "bg-secondary",
    }[variant] || "bg-neutral"
  );
};
`;

  try {
    fs.writeFileSync(filePath, content, 'utf-8');
    printMessage(`✅ Archivo generado: ${filePath}`, 'green');
  } catch (error) {
    printMessage(`❌ Error al generar el archivo ${filePath}: ${error.message}`, 'red');
  }
}