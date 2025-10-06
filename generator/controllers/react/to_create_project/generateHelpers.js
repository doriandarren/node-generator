import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';
import { printMessage } from '../../../helpers/inquirer.js';


export const generateHelpers = async(fullPath) => {    
    await createSweetalert2(fullPath);
    await createDataFake(fullPath);
    await createToast(fullPath);
    await createVariantClass(fullPath);
    await createHelperDate(fullPath);
    await createHelperURL(fullPath);
    await createHelperNumber(fullPath);
}



const createSweetalert2 = async (fullPath) => {
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


const createDataFake = async (fullPath) => {
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


const createToast = async (fullPath) => {
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





const createHelperDate = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'helpers');
    
    // File
    const filePath = path.join(folderPath, 'helperDate.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
/**
 * Retorna hoy
 * @returns {string} ex: "AAAA-MM-DD"
 */
export const getTodayDate = (byHTML = false ) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0
  const dd = String(today.getDate()).padStart(2, '0');

  if(byHTML){
    return \`\${dd}-\${mm}-\${yyyy}\`;
  }else{
    return \`\${yyyy}-\${mm}-\${dd}\`;
  }
};



/**
 * Retorna la hora actual en formato HH:mm (24h)
 * @returns {string} Ejemplo: "08:42"
 */
export const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};


/**
 * Return Month
 */
export const getCurrentMonth = () => {
  const date = new Date();
  return date.getMonth() + 1; // Enero es 0, por eso se suma 1
};


/**
 * Return Year
 */
export const getCurrentYear = () => {
  const date = new Date();
  return date.getFullYear(); // Ej: 2025
};


/**
 * Retorna la fecha en formato DD-MM-AAAA. Ejemplo "2025-12-15" -> "25-12-2025"
 * @param {*} dateStr 
 * @returns 
 */
export function formatDateToDDMMYYYY(dateStr) {
  if (!dateStr) return "";

  const [year, month, day] = dateStr.split("-");
  return \`\${day}-\${month}-\${year}\`;
}


/**
 * Convierte un string ISO (ej: "2025-07-31T14:47:44.000000Z")
 * en formato "DD-MM-YYYY HH:mm"
 */
export function formatDateTimeToDDMMYYYYHHmm(dateStr) {
  if (!dateStr) return "";

  const date = new Date(dateStr); // crea objeto Date

  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();

  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');

  return \`\${dd}-\${mm}-\${yyyy} \${hh}:\${min}\`;
}   
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }

}



const createHelperURL = async (fullPath) => {
  const helpersDir = path.join(fullPath, 'src', 'helpers');
  const filePath = path.join(helpersDir, 'helperURL.js');

  // Crear carpeta si no existe
  createFolder(helpersDir);

  const content = `
// helpers/helperURL.js
/**
 * Crea el query string ignorando valores vacíos (null/undefined/"").
 */
export const buildQuery = (filters = {}, allowed = []) => {
  const qs = new URLSearchParams();
  const keys = allowed.length ? allowed : Object.keys(filters);

  for (const k of keys) {
    const v = filters[k];
    if (v !== undefined && v !== null) {
      const s = String(v).trim();
      if (s !== "") qs.set(k, s);
    }
  }
  const s = qs.toString();
  return s ? \`?${s}\` : "";
};

/**
 * Devuelve basePath + query ya montado.
 */
export const buildURL = (basePath, filters = {}, allowed = []) =>
  \`${basePath}${buildQuery(filters, allowed)}\`;
`;

  try {
    fs.writeFileSync(filePath, content, 'utf-8');
    printMessage(`✅ Archivo generado: ${filePath}`, 'green');
  } catch (error) {
    printMessage(`❌ Error al generar el archivo ${filePath}: ${error.message}`, 'red');
  }
}



const createHelperNumber = async (fullPath) => {
  const helpersDir = path.join(fullPath, 'src', 'helpers');
  const filePath = path.join(helpersDir, 'helperNumber.js');

  // Crear carpeta si no existe
  createFolder(helpersDir);

  const content = `
// helpers/helperNumber.js
/**
 * Formatea un número a formato europeo con decimales y símbolo de moneda.
 *
 * @param {number|string} value - El número a formatear.
 * @param {Object} options - Opciones opcionales (mínimo de decimales, etc.).
 * @param {boolean} withCurrency - Si se incluye el símbolo de €.
 * @returns {string} - Número formateado.
 */
export const formatNumber = (
  value,
  withCurrency = true,
  options = { minimumFractionDigits: 2, maximumFractionDigits: 2 }
) => {
  const numericValue = Number(value);

  if (isNaN(numericValue)) return "";

  const formatted = numericValue.toLocaleString("es-ES", options);

  return withCurrency ? \`${formatted} €\` : formatted;
};



/**
 * Agrega ceros a la izquierda hasta alcanzar la longitud deseada
 * @param {string|number} numero - El número original
 * @param {number} longitud - La longitud total deseada
 * @returns {string} El número con ceros a la izquierda
 */
export function padLeft(numero, longitud = 0) {
  return numero.toString().padStart(longitud, '0');
}




/**
 * Retorna un UUID unico
 * @returns {string} El número con ceros a la izquierda
 */
export function getUID() {
  return \`${Date.now()}-${Math.random().toString(16).slice(2)}\`;
}

`;

  try {
    fs.writeFileSync(filePath, content, 'utf-8');
    printMessage(`✅ Archivo generado: ${filePath}`, 'green');
  } catch (error) {
    printMessage(`❌ Error al generar el archivo ${filePath}: ${error.message}`, 'red');
  }
}
