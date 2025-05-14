import mysql from 'mysql2/promise';




export const listTables = async({ host, user, password, database, port, tables }) => {
    
    console.log("Lista DATABASE" , { host, user, password, database, port, tables });


    try {

        const connection = await mysql.createConnection({
            host,
            user,
            password,
            database,
            port
        });

        console.log(`\n📦 Conectado a la base de datos: ${database}\n`);



        
    } catch (error) {
        console.error('❌ Error al listar tablas:', error.message);
    }



}