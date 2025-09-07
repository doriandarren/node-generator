import { clearScreen, menuMain } from "../../helpers/inquirer.js";
import { startOllamaAI } from "./ollama/startOllamaAI.js";


export const aiMain = async() => {

    let opt = '';

    clearScreen();

    do{

        opt = await menuMain([
            { name: "Ollama Local", value: "ollama" },
            { name: "Atrás", value: "back" },
        ], 'AI Ollama');

        switch (opt) {
            case 'ollama':
                await startOllamaAI();
                break;


            default:
                break;
        }

        //await pause();

    }while(opt != 'back')

}