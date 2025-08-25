import inquirer from "inquirer";
import { clearScreen, readInput } from "../../../helpers/inquirer.js";
import { generateModuleStandardReact } from "./generateModuleStandardReact.js";




/* --------------------------- Parser de columnas --------------------------- */
// Sintaxis soportada: nombre[:TIPO][!]
//   - ! => requerido (allowNull: false)
//   - TIPO por defecto: STRING
//   - Ej: "name! amount:DECIMAL description:TEXT"
const parseColumns = (raw) => {
  if (!raw?.trim()) return [];

  // Reemplaza separadores comunes por espacio, **sin tocar los dos puntos** (:)
  const cleaned = raw.replace(/[.,;]+/g, " ");
  const tokens = cleaned.split(/\s+/).filter(Boolean);

  return tokens.map((token) => {
    // nombre[:tipo]
    const [name, type] = token.split(":", 2);
    return {
      name: name.trim(),
      type: (type ? type.trim() : "STRING").toUpperCase(),
      allowNull: false,
    };
  });
};



export const startModuleReact = async() => {
    
    await clearScreen();

    // route list create edit barrel service

    const opt = [
        { name: "Route", value: "route", checked: true },
        { name: "List", value: "list", checked: true },
        { name: "Create", value: "create", checked: true },
        { name: "Edit", value: "edit", checked: true },
        { name: "Barrel", value: "barrel", checked: true },
        { name: "service", value: "service", checked: true, },
    ];

    const { selectedComponents } = await inquirer.prompt([
        {
        type: "checkbox",
        name: "selectedComponents",
        message: "Componentes:",
        choices: opt,
        },
    ]);

    const fullPath = await readInput(
        "Ruta Proyecto:",
        false,
        "/Users/dorian/ReactProjects/app-1"
        //"/Users/dorian/ReactProjects/office.truckwashvilamalla.eu"
    );

    const namespace = await readInput(
        "Namespace (erp / api / invoices):",
        false,
        "api"
    );
    const singularName = await readInput(
        "Nombre singular:",
        false,
        //"AgendaUnloading",
        "Team"
    );
    const pluralName = await readInput(
        "Nombre plural:",
        false,
        // "AgendaUnloadings",
        "Teams"
    );
    const inputColumns = await readInput(
        "Columnas (separadas por espacio):",
        false,
        //"name amount description"
        "name amount:integer description"
    );


    const columns = parseColumns(inputColumns);


    await generateModuleStandardReact(
        fullPath,
        selectedComponents,
        namespace,
        singularName,
        pluralName,
        columns
    );


}