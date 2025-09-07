import inquirer from "inquirer";
import "colors";



export const menuMain = async(choices = [], section = '--') => {
    console.clear();
    console.log('==================================='.green);
    console.log('    Seleccione un opción'.white + ` ${section}`.white);
    console.log('===================================\n'.green);

    const q = [{
        type: 'list',
        name: 'selection',
        message: '¿Qué quieres crear?',
        choices,
    }];

    const {selection} = await inquirer.prompt(q);

    return selection;
}
 


 


export const readInput = async (message, allowEmpty = false, defaultValue = '') => {
  const question = [
    {
      type: 'input',
      name: 't',
      message,
      default: defaultValue,
      validate(value) {
        if (!allowEmpty && value.trim().length === 0) {
          return 'Por favor introduzca un valor';
        }
        return true;
      },
    },
  ];

  const { t } = await inquirer.prompt(question);
  return t;
};





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




/**
 * Imprime un mensaje en consola con color
 * @param {string} message - El mensaje a imprimir
 * @param {'green' | 'cyan' | 'red' | 'yellow' | 'white'} color - El color del texto
 */
export const printMessage = (message, color = 'green') => {
    const colors = {
        green: message => message.green,
        cyan: message => message.cyan,
        red: message => message.red,
        yellow: message => message.yellow,
        white: message => message.white,
    };

    const colorFn = colors[color] || colors.white;
    console.log(colorFn(message));
};