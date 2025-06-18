import adb from "adbkit";


// adb version
// brew install android-platform-tools




const client = adb.createClient();
const packageName = 'com.example.app'; // Cambia por el package que quieras abrir



async function controlDevice() {
    
    try {
        

        const devices = await client.listDevices();


        if(devices.length === 0){
            console.log('❌ No hay dispositivos conectados');
            return;
        }


        for (const device of devices){

            const serial = device.id;
            console.log(`📱 Dispositivo detectado: ${serial}`);


            // Lanzar la app
            await client.shell(
                serial,
                `monkey -p ${packageName} -c android.intent.category.LAUNCHER 1`
            );
            console.log(`🚀 App lanzada en ${serial}`);

            // Simular toque en coordenadas (x: 300, y: 500)
            //await client.shell(serial, 'input tap 300 500');
            
            await client.shell(serial, 'input tap 300 500');
            
            console.log(`🖱️ Tap realizado en ${serial}`);

            // Esperar un poco entre dispositivos
            await new Promise((res) => setTimeout(res, 1000));


        }


    } catch (err) {
        console.error('❌ Error:', err);
    }

}



controlDevice();

