import ora from "ora";
import { menuMain, pause, printMessage, readInput } from "../../../helpers/inquirer.js";



// export const startOllamaAI = async() => {

//     await sendMessage("hola! Me puedes ayudar a generar diner, ingresos pasivos u otra cosa que sea rentable?");

//     await pause();

// }


export const startOllamaAI = async () => {

  let prompt = await readInput("¿Pregunta a Ollama? [e: salir]");

  while (prompt.trim().toLowerCase() !== 'e') {
    await sendMessage(prompt);
    await pause();

    prompt = await readInput("¿Qué quieres preguntarle a Ollama? [e: salir]");
  }

}





const sendMessage = async(prompt) => {

    const q = {
        "model": "codellama:7b",
        prompt,
        "stream": false
    };

    const spinner = ora("Generando respuesta con Ollama...").start();

    try {
        
        const response = await fetch('http://192.168.1.100:11434/v1/completions', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(q)
        });


        if (!response.ok) {
            spinner.fail("❌ Error en la respuesta de Ollama.");
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        const answer = json.choices?.[0]?.text?.trim();


        spinner.succeed("✅ Respuesta generada con éxito.");

        //console.log(json);

        printMessage("\n📨 Respuesta de Ollama:\n", 'cyan');
        console.log(answer || "No se encontró respuesta válida.");

        

    } catch (err) {
        spinner.fail("❌ Error al llamar a Ollama.");
        console.log(err);   
        printMessage(`Detalles del error: ${err.message}`, 'red');
    }

}




// const v = "hola! como estas? en español por favor";
// await ollamaAI(v);
