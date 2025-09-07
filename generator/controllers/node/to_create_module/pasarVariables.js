


const sumar = (num1, num2) => {
    return num1 + num2;
    
}



const imprimir = (tableName) => {
    console.log(tableName); 
    const resultado = sumar(2,10);
    console.log(resultado);
    return true;
}


const main = () => {
    const tableName = 'user';

    const is_resp = imprimir(tableName);

   if(is_resp){
    console.log('todo ok');
   }

}

main();










































// const imprimir = (tableName) => {
//     console.log(tableName)
//     return 'ok';
// }


// const main = () => {
//     const tableName = 'user';
//    const respuesta = imprimir(tableName);
// }


// main();


