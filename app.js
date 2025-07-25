import { clearScreen, exitScreen, menuMain, pause } from "./src/helpers/inquirer.js";
import { nodeMain } from './src/controllers/node/nodeMain.js';
import { databaseMain } from './src/controllers/database/databaseMain.js';
import { phpMain } from './src/controllers/php/phpMain.js';
import { reactMain } from './src/controllers/react/reactMain.js';
import { exportDiagramsMain } from './src/controllers/export_diagrams/exportDigramsMain.js';
import { importDiagramsMain } from './src/controllers/import_diagrams/importDiagramsMain.js';
import 'dotenv/config';
import { aiMain } from "./src/controllers/ai/aiMain.js";


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
            { name: "Ollama", value: "ollama" },
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

            case 'ollama':
                await aiMain();
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