import inquirer from "inquirer";
import { clearScreen, readInput } from "../../../helpers/inquirer.js";
import { generateModuleStandardReact } from "./generateModuleStandardReact.js";
import { parseColumns } from '../../../helpers/helperString.js'


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
        //"/Users/dorian/ReactProjects/office.truckwashvilamalla.eu"
        // "/Users/milena/Desktop/WorkspaceJS/PROYECTOS/erp.splytin.com"
        "/Users/milena/Desktop/WorkspaceJS/PROYECTOS/app-1"
    );

    const namespace = await readInput(
        "Namespace (erp / api / invoices):",
        false,
        "api"
    );
    const singularName = await readInput(
        "Nombre singular:",
        false,
        "AgendaUnloading",
        //"Team"
    );
    const pluralName = await readInput(
        "Nombre plural:",
        false,
        "AgendaUnloadings",
        //"Teams"
    );
    const inputColumns = await readInput(
        "Columnas (separadas por espacio):",
        false,
        "name amount description"
        //"customer_id:fk name amount:integer description is_active:boolean"
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