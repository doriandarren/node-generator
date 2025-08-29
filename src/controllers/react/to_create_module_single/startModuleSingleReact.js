import inquirer from "inquirer";
import { clearScreen, readInput } from "../../../helpers/inquirer.js";
import { parseColumns } from '../../../helpers/helperString.js'
import { generateModuleSingleReact } from "./generateModuleSingleReact.js";


export const startModuleSingleReact = async() => {
    

     await clearScreen();


    const opt = [
        { name: "Route", value: "route", checked: true },
        { name: "SinglePage", value: "single_page", checked: true },
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
        //"/Users/milena/Desktop/WorkspaceJS/PROYECTOS/erp.splytin.com"
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


    


    await generateModuleSingleReact(
        fullPath,
        selectedComponents,
        namespace,
        singularName,
        pluralName,
        columns
    );



}