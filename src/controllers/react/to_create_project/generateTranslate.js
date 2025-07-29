import fs from "fs";
import path from "path";
import { printMessage } from '../../../helpers/inquirer.js';
import { createFolder, runExec } from '../../../helpers/helperFile.js';


export const generateTranslate = async(fullPath) => {    
    await setupI18n(fullPath)
    await createI18n(fullPath)
    await createLocalesEn(fullPath)
    await createLocalesEs(fullPath)
    await updateFileMain(fullPath)
}



const setupI18n = async (fullPath) => {
  printMessage('🌐 Instalando i18n...', 'cyan');

  await runExec(
    'npm install i18next react-i18next i18next-http-backend i18next-browser-languagedetector',
    fullPath
  );

  printMessage('✅ i18n instalado correctamente.', 'green');
}



const createI18n = async (fullPath) => {
  const srcDir = path.join(fullPath, 'src');
  const filePath = path.join(srcDir, 'i18n.js');

  // Crear carpeta src si no existe
  createFolder(srcDir);

  const content = `import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

const storedLang = localStorage.getItem("i18nextLng") || "es";

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: storedLang,
    fallbackLng: "es",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator"],
      caches: ["cookie"],
    },
  });

export default i18n;
`;

  try {
    fs.writeFileSync(filePath, content, 'utf-8');
    printMessage(`✅ Archivo creado: ${filePath}`, 'green');
  } catch (error) {
    printMessage(`❌ Error al crear el archivo ${filePath}: ${error.message}`, 'red');
  }
}


const createLocalesEs = async (fullPath) => {
  const esDir = path.join(fullPath, 'public', 'locales', 'es');
  const filePath = path.join(esDir, 'translation.json');

  // Crear la carpeta si no existe
  createFolder(esDir);

  const content = `{
  "welcome": "Bievendido!",
  "languages": {
    "en": "EN",
    "es": "ES"
  },
  "title": {
    "config": "Configuración"
  },
  "message": {
    "are_you_sure": "¿Estás seguro?",
    "record_saved": "Registro guardado",
    "record_deleted": "Registro eliminado",
    "record_updated": "Registro actualizado",
    "ok": "Vale"
  },
  "menu": {
    "contact": "Contacto",
    "about": "¿Quienes somos?"
  },
  "login_page": {
    "title": "Bienvend@ a Site",
    "subtitle": "Plataforma Site Facturas.",
    "email_placeholder": "Correo electrónico",
    "password_placeholder": "Contraseña",
    "remember": "Recuérdame",
    "email": "Correo electrónico",
    "password": "Contraseña",
    "sign_in": "Acceder",
    "remember_me": "Recuerdame",
    "forgot_password": "Olvidaste la contraseña?",
    "forgot": "¿Olvidaste tu contraseña?",
    "btn_login": "Acceder",
    "register": "Registrarse",
    "or_continue_with": "Continuar con",
    "terms_txt1": "Al acceder estás de acuerdo con nuestros ",
    "terms_txt2": "Términos y Condiciones",
    "terms_txt3": "y nuestra",
    "terms_txt4": "Política de Privacidad",
    "credential_error": "Claves de acceso no válidas"
  },
  "privacity_polices": "Políticas de Privacidad",
  "link_interest": "Enlaces de interés",
  "login": "Login",
  "coockies": "Cookies",
  "page_not_found": "Página no encontrada",
  "actions": "Acciones",
  "updated": "Actualizado",
  "update": "Actualizar",
  "dashboard": "Inicio",
  "logout": "Cerrar sesión",
  "profile": "Perfil",
  "resources": "Recursos",
  "home": "Inicio",
  "search": "Buscar",
  "next": "Siguiente",
  "back": "Anterior",
  "show": "Mostrar",
  "no_results_found": "No se encontraron resultados.",
  "loading": "Cargando...",
  "save": "Guardar",
  "add": "Nuevo",
  "edit": "Editar",
  "cancel": "Cancelar",
  "delete": "Borrar",
  "name": "Nombre",
  "yes": "Sí",
  "no": "No",
  "yesterday": "Ayer",
  "today": "Hoy",
  "month": "Mes",
  "year": "Año",
  "insert": "Agregar",
  "setting": "Configuración",
  "settings": "Configuraciones",
  "log": "Registro",
  "logs": "Registros",
  "average_15_days": "Media 15 días",
  "average_30_days": "Media 30 días",
  "average_3_months": "Media 3 meses",
  "last_week": "Última semana",
  "setting_table": {
    "next_table": "Sig",
    "prev_table": "Prev",
    "rows_per_page": "Páginas",
    "of": "de",
    "search": "Buscar"
  },
  "form": {
    "required": "Requerido",
    "select": "Seleccione",
    "must_be_number": "Número",
    "must_be_positive": "Mayor a cero"
  },
  "errors": {
    "error_internal": "Error Interno",
    "error_process": "No se pudo procesar la solicitud"
  },
  "error": "Error al procesar la información",
  "code": "Código",
  "address": "Dirección",
  "cif": "Código identificación fiscal",
  "email": "Correo electrónico",
  "website": "Sitio web",
  "phone": "Teléfono",
  "code_zip": "Código postal",
  "project_id": "Proyecto Id",
  "projects": "Proyectos",
  "hours": "Horas",
  "invoice_at": "Fecha factura",
  "customer_id": "Cliente",
  "invoices": "Facturas",
  "invoice": "Factura",
  "company_id": "Compañia Id",
  "company_name": "Razón social",
  "companies": "Compañias",
  "customer": "Cliente",
  "customers": "Clientes",
  "number": "Número",
  "date": "Fecha",
  "invoice_id": "Factura Id",
  "invoice_header_id": "Factura cabecera Id",
  "invoice_headers": "Facturas",
  "vat": "IVA",
  "unit_prices": "Precio unidad",
  "project_hours": "Horas proyecto",
  "total": "Total",
  "description": "Descripción",
  "project_hour_id": "Hora proyecto Id",
  "own_company_id": "Compañias propias Id",
  "own_companies": "Compañias propias",
  "total_hours": "Horas Totales",
  "current_hours": "Horas Actuales",
  "started_at": "Fecha Inicio",
  "finished_at": "Fecha Finalizado",
  "country_id": "País",
  "tax": "NIF",
  "state": "Estado",
  "municipality": "Municipio",
  "zip_code": "Codigo Postal",
  "is_generated": "Está Generado",
  "invoice_counter_id": "Serie",
  "invoice_lines": "Factura lineas",
  "due_date": "Fecha de Vencimiento",
  "vat_quote": "IVA",
  "total_without_vat": "Total sin IVA",
  "total_with_vat": "Total con IVA",
  "has_paid": "Pagada",
  "providers": "Proveedores",
  "products": "Productos",
  "product": "Producto",
  "services": "Servicios",
  "service": "Servicio",
  "invoice_counters": "Contadores",
  "amount_without_vat": "Importe sin IVA",
  "amount_with_vat": "Importe con IVA",
  "counter": "Contador",
  "serial": "Serial",
  "purchase_price_without_vat": "Precio de compra sin IVA",
  "sale_price_without_vat": "Precio de venta sin IVA",
  "invoiced_at": "Facturado",
  "path": "Ruta",
  "processed_at": "Procesado",
  "ims_invoice_headers": "Ficheros IMS",
  "provider_id": "Proveedor",
  "plate": "Matrícula",
  "customer_devices": "Dispositivos",
  "rental_price_without_vat": "Alquiler sin IVA",
  "provider_rental_price_without_vat": "Alquiler Prov. sin IVA",
  "installed_at": "Fecha de Instalación",
  "sim": "SIM",
  "file": "campo",
  "remittance_types": "Tipos de Remesas",
  "remittance_type": "Tipo de Remesa",
  "remittance_type_id": "Remesa",
  "invoice_date": "Fecha de factura",
  "invoice_due_date": "Fecha de Vencimiento",
  "vat_type": "Tipo de IVA",
  "invoice_counter": "Contador",
  "unit_nb": "Cantidad",
  "customer_data": "Datos",
  "customer_invoices": "Facturación cliente",
  "customers_invoices": "Facturas",
  "bank_account": " Cuenta bancaria",
  "bank_name": "Nombre del banco",
  "account_holder": "Titular de la cuenta",
  "due_date_by_days": "A cuantos días",
  "due_date_days": "Vencimiento el día",
  "customer_code": "Código de cliente",
  "team": "Equipo",
  "teams": "Equipos",
  "details": "Detalles",
  "detail": "Detalle",
  "status": "Status",
  "statuses": "Statuses",
  "type": "Tipo",
  "types": "Tipos",
  "is_exempt": "Exento IVA",
  "service_activated": "Servicio activado",
  "services_activated": "Servicios activados",
  "country": "País",
  "countries": "Paises"
}`;

  try {
    fs.writeFileSync(filePath, content, 'utf-8');
    printMessage(`✅ Archivo creado: ${filePath}`, 'green');
  } catch (error) {
    printMessage(`❌ Error al crear el archivo ${filePath}: ${error.message}`, 'red');
  }
}



const createLocalesEn = async (fullPath) => {
  const enDir = path.join(fullPath, 'public', 'locales', 'en');
  const filePath = path.join(enDir, 'translation.json');

  createFolder(enDir);

  const content = `{
  "welcome": "Welcome!",
  "languages": {
    "en": "EN",
    "es": "ES"
  },
  "title": {
    "config": "Settings"
  },
  "message": {
    "are_you_sure": "Are you sure?",
    "record_saved": "Record saved",
    "record_deleted": "Record deleted",
    "record_updated": "Record updated",
    "ok": "Ok"
  },
  "menu": {
    "contact": "Contact",
    "about": "About"
  },
  "login_page": {
    "title": "Welcome to Site",
    "subtitle": "Site Invoices Platform.",
    "email_placeholder": "Email",
    "password_placeholder": "Password",
    "remember": "Remember me",
    "email": "Email",
    "password": "Password",
    "sign_in": "Sign in",
    "remember_me": "Remember me",
    "forgot_password": "Forgot your password?",
    "forgot": "Forgot your password?",
    "btn_login": "Sign in",
    "register": "Create account",
    "or_continue_with": "Continue with",
    "terms_txt1": "By signing in, you agree to our ",
    "terms_txt2": "Terms and Conditions",
    "terms_txt3": " and our ",
    "terms_txt4": "Privacy Policy",
    "credential_error": "Invalid credentials"
  },
  "privacity_polices": "Privacy Policies",
  "link_interest": "Useful links",
  "login": "Login",
  "coockies": "Cookies",
  "page_not_found": "Page not found",
  "actions": "Actions",
  "updated": "Updated",
  "update": "Update",
  "dashboard": "Home",
  "logout": "Log out",
  "profile": "Your profile",
  "resources": "Resources",
  "home": "Home",
  "search": "Search",
  "next": "Next",
  "back": "Back",
  "show": "Show",
  "no_results_found": "No results found.",
  "loading": "Loading...",
  "save": "Save",
  "add": "New",
  "edit": "Edit",
  "cancel": "Cancel",
  "delete": "Delete",
  "name": "Name",
  "yes": "Yes",
  "no": "No",
  "yesterday": "Yesterday",
  "today": "Today",
  "month": "Month",
  "year": "Year",
  "insert": "Add",
  "setting": "Setting",
  "settings": "Settings",
  "log": "Log",
  "logs": "Logs",
  "average_15_days": "Average 15 days",
  "average_30_days": "Average 30 days",
  "average_3_months": "Average 3 months",
  "last_week": "Last week",
  "setting_table": {
    "next_table": "Next",
    "prev_table": "Prev",
    "rows_per_page": "Pages",
    "of": "of",
    "search": "Search"
  },
  "form": {
    "required": "Required",
    "select": "Select",
    "must_be_number": "Number",
    "must_be_positive": "Must be positive"
  },
  "errors": {
    "error_internal": "Internal Error",
    "error_process": "Error processing the information"
  },
  "error": "Error processing the information",
  "code": "Code",
  "address": "Address",
  "cif": "Tax Identification Code",
  "email": "Email",
  "website": "Website",
  "phone": "Phone",
  "code_zip": "Zip Code",
  "project_id": "Project Id",
  "projects": "Projects",
  "hours": "Hours",
  "invoice_at": "Invoice Date",
  "customer_id": "Customer",
  "invoices": "Invoices",
  "invoice": "Invoice",
  "company_id": "Company Id",
  "company_name": "Company Name",
  "companies": "Companies",
  "customer": "Customer",
  "customers": "Customers",
  "number": "Number",
  "date": "Date",
  "invoice_id": "Invoice Id",
  "invoice_header_id": "Invoice Header Id",
  "invoice_headers": "Invoices",
  "vat": "VAT",
  "unit_prices": "Unit Price",
  "project_hours": "Project Hours",
  "total": "Total",
  "description": "Description",
  "project_hour_id": "Project Hour Id",
  "own_company_id": "Own Company Id",
  "own_companies": "Own Companies",
  "total_hours": "Total Hours",
  "current_hours": "Current Hours",
  "started_at": "Start Date",
  "finished_at": "End Date",
  "country_id": "Country",
  "tax": "Tax ID",
  "state": "State",
  "municipality": "Municipality",
  "zip_code": "Zip Code",
  "is_generated": "Is Generated",
  "invoice_counter_id": "Series",
  "invoice_lines": "Invoice Lines",
  "due_date": "Due Date",
  "vat_quote": "VAT",
  "total_without_vat": "Total without VAT",
  "total_with_vat": "Total with VAT",
  "has_paid": "Paid",
  "providers": "Providers",
  "products": "Products",
  "product": "Product",
  "services": "Services",
  "service": "Service",
  "invoice_counters": "Counters",
  "amount_without_vat": "Amount without VAT",
  "amount_with_vat": "Amount with VAT",
  "counter": "Counter",
  "serial": "Serial",
  "purchase_price_without_vat": "Purchase Price without VAT",
  "sale_price_without_vat": "Sale Price without VAT",
  "invoiced_at": "Invoiced",
  "path": "Path",
  "processed_at": "Processed",
  "ims_invoice_headers": "IMS Files",
  "provider_id": "Provider",
  "plate": "Plate",
  "customer_devices": "Devices",
  "rental_price_without_vat": "Rental without VAT",
  "provider_rental_price_without_vat": "Provider Rental without VAT",
  "installed_at": "Installation Date",
  "sim": "SIM",
  "file": "Field",
  "remittance_types": "Remittance Types",
  "remittance_type": "Remittance Type",
  "remittance_type_id": "Remittance",
  "invoice_date": "Invoice Date",
  "invoice_due_date": "Due Date",
  "vat_type": "VAT Type",
  "invoice_counter": "Counter",
  "unit_nb": "Quantity",
  "customer_data": "Data",
  "customer_invoices": "Customer Billing",
  "customers_invoices": "Invoices",
  "bank_account": "Bank Account",
  "bank_name": "Bank Name",
  "account_holder": "Account Holder",
  "due_date_by_days": "Due in Days",
  "due_date_days": "Due Date",
  "customer_code": "Customer Code",
  "team": "Team",
  "teams": "Teams",
  "details": "Details",
  "detail": "Detail",
  "status": "Status",
  "statuses": "Statuses",
  "type": "Type",
  "types": "Types",
  "is_exempt": "Exempt",
  "service_activated": "Service activated",
  "services_activated": "Activated Services",
  "country": "Country",
  "countries": "Countries"
}`;

  try {
    fs.writeFileSync(filePath, content, 'utf-8');
    printMessage(`✅ Archivo creado: ${filePath}`, 'green');
  } catch (error) {
    printMessage(`❌ Error al crear el archivo ${filePath}: ${error.message}`, 'red');
  }
}



const updateFileMain = async (fullPath) => {
  const mainJsxPath = path.join(fullPath, 'src', 'main.jsx');

  // Verifica si el archivo existe
  if (!fs.existsSync(mainJsxPath)) {
    printMessage(`❌ Error: ${mainJsxPath} no existe.`, 'red');
    return;
  }

  try {
    let content = fs.readFileSync(mainJsxPath, 'utf-8');

    // Solo actualiza si no está ya importado
    if (!content.includes("import './i18n';")) {
      content = content.replace(
        "import { createRoot } from 'react-dom/client'",
        "import { createRoot } from 'react-dom/client';\nimport './i18n';"
      );

      fs.writeFileSync(mainJsxPath, content, 'utf-8');
      printMessage('✅ main.jsx configurado correctamente.', 'green');
    } else {
      printMessage('ℹ️ main.jsx ya contiene la importación de i18n.', 'yellow');
    }
  } catch (error) {
    printMessage(`❌ Error al actualizar ${mainJsxPath}: ${error.message}`, 'red');
  }
}
