import { clearScreen, exitScreen, menuMain, pause } from "./src/helpers/inquirer.js";



const main = async() => {

    clearScreen();
    console.log('NODEJS');
    

    let opt = '';


    do{

        opt = await menuMain();

        switch (opt) {
            case 'Proyecto':
                console.log("Proyecto");
                break;
        
            case 'Modulo':
                console.log("Modula");
                break;

            case 'Salir':
                console.log("Modula");
                break;
            
            default:
                break;
        }

        await pause();

    }while(opt != 'Salir')



    exitScreen();


}


main();