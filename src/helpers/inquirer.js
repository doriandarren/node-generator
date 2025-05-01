import inquirer from "inquirer";
import "colors";



export const menuMain = async(questions) => {
    console.clear();
    console.log('==============================='.green);
    console.log('    Seleccione un opción'.white);
    console.log('===============================\n'.green);

    const q = [{
        type: 'list',
        name: 'selection',
        message: '¿Qué quieres crear?',
        choices: ['Proyecto', 'Modulo', 'Salir'],
    }];

    const {selection} = await inquirer.prompt(q);

    return selection;
}
 


export const readInput = async(message, allowEmpty = false) => {
    const question = [
        {
            type: 'input',
            name: 't',
            message,
            validate(value){
                if( !allowEmpty && value.length === 0){
                    return 'Por favor introduzca un valor'
                }
                return true;
            }
        }
    ];

    const { t } = await inquirer.prompt(question);
    return t;
}





export const clearScreen = async() => {
    console.clear();
}


export const exitScreen = async() => {
    console.log('\n👋 Bye...'.green);
}


export const pause = async() => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'ENTER'.green } para continuar`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question);
}