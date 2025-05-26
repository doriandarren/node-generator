import 'dotenv/config';
import { clearScreen, exitScreen, menuMain, pause } from "./src/helpers/inquirer.js";
import { nodeMain } from './src/node/ nodeMain.js';
import { databaseMain } from './src/database/databaseMain.js';
import { phpMain } from './src/php/phpMain.js';
import { reactMain } from './src/react/reactMain.js';
import { exportDiagramsMain } from './src/export_diagrams/exportDigramsMain.js';
import { importDiagramsMain } from './src/import_diagrams/importDiagramsMain.js';



const main = async() => {
    let opt = '';

    clearScreen();
    console.log('🔧 Generador de Código');

    do{

        opt = await menuMain([
            { name: "Database", value: "database" },
            { name: "Export Diagrams", value: "export_diagrams" },
            { name: "Import Diagrams", value: "import_diagrams" },
            { name: "React", value: "react" },
            { name: "NodeJS", value: "nodejs" },
            { name: "PHP", value: "php" },
            { name: "Salir", value: "salir" },
        ]);

        switch (opt) {

            case 'database':
                await databaseMain();
                break;

            case 'nodejs':
                await nodeMain();
                break;

            case 'php':
                await phpMain();
                break;
        
            case 'react':
                await reactMain();
                break;
            
            case 'export_diagrams':
                await exportDiagramsMain();
                break;
            
            case 'import_diagrams':
                await importDiagramsMain();
                break;
            
            default:
                //console.log('❓ Opción no válida');
                break;
        }

        await pause();

    }while(opt != 'salir')

    exitScreen();

}


main();