
// Funciones main donde se crea la variable tableName y tiene como valor asignado un String 'client', la funcion main es llamada para que ejecute correctamente el código la variable tableName 


const mostrarFormato = (message) => {
    console.log("La tabla es: " + message);
}

const imprimir = (tableName) => {
    console.log(tableName);
    mostrarFormato(tableName);
    return true;
}


const main = () => {
    const tableName = 'users';
    const resultado = imprimir(tableName);
    console.log(resultado);

}

main();

















