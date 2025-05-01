import inquirer from "inquirer";
import color from "colors";




export const menu = async() => {
    console.clear();
    console.log('==============================='.green);
    console.log('    Seleccione un opción'.white);
    console.log('===============================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;

}



export function clearScreen() {
    console.clear(); // limpia terminal como `cls` o `clear`
}