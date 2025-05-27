import { clearScreen, menuMain } from '../helpers/inquirer.js';
import { generateExportDiagrams } from './generateExportDiagrams.js';




export const exportDiagramsMain = async() => {    

    let opt = '';

    clearScreen();

    console.log('📦 Export Diagrams');

    do {
        opt = await menuMain([
            { name: "Nuevo archivo", value: "empty" },
            { name: "Atrás", value: "back" },
        ]);

        switch (opt) {
            case 'empty':
                await generateExportDiagrams();
                break;

            default:
                break;
        }

        //await pause();

    } while (opt !== 'back');

}