import inquirer from "inquirer";
import { clearScreen, readInput } from "../../../helpers/inquirer.js";
import { generateModuleStandardReact } from "./generateModuleStandardReact.js";


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
        //"/Users/dorian/ReactProjects/app-1"
        "/Users/dorian/ReactProjects/office.truckwashvilamalla.eu"
    );

    const namespace = await readInput(
        "Namespace (erp / api / invoices):",
        false,
        "api"
    );
    const singularName = await readInput(
        "Nombre singular:",
        false,
        "AgendaUnloading"
    );
    const pluralName = await readInput(
        "Nombre plural:",
        false,
        "AgendaUnloadings"
    );
    const inputColumns = await readInput(
        "Columnas (separadas por espacio):",
        false,
        "name amount description"
    );


    const cleanedInput = inputColumns.replace(/[.,;:]+/g, ' '); // reemplaza comas, puntos, punto y coma, dos puntos por espacio

    const columns = cleanedInput
        .split(/\s+/) // divide por uno o más espacios
        .filter(Boolean) // elimina vacíos
        .map((col) => ({
        name: col.trim(),
        type: "STRING",
        allowNull: true,
        }));

    

    await generateModuleStandardReact(
        fullPath,
        selectedComponents,
        namespace,
        singularName,
        pluralName,
        columns
    );


}