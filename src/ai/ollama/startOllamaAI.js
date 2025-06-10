import { pause } from "../../helpers/inquirer.js";



export const startOllamaAI = async() => {

    await sendMessage("hola! Estoy haciendo pruebas");

    await pause();

}


const sendMessage = async(prompt) => {

    const q = {
        "model": "codellama:7b",
        prompt,
        "stream": false
    };

    try {
        
        const response = await fetch('http://192.168.1.100:11434/v1/completions', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(q)
        });


        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);


        

    } catch (err) {
        console.log(err);   
    }

}




// const v = "hola! como estas? en español por favor";
// await ollamaAI(v);
