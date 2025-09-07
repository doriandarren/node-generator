// src/utils/messageChannel.js
const URL = 'https://discord.com/api/webhooks/1368232013127225436/2gYOCBvVvBHz1gh9HyKTF7IPHRbGMqVTup4EN-9ru5hfcPkr84TLNcOoNaTN2kvCl1zu';


export class MessageChannel {
    
  static async send(text, title = 'Message Channel', isError = false) {
    const appName = process.env.APP_NAME || 'NodeApp';
    const appEnv = process.env.APP_ENV || 'development';
    const finalTitle = `${title} ${appName} ${appEnv}`;

    // Limitar a 500 caracteres
    const limitedText = text.slice(0, 500);

    const payload = {
      embeds: [
        {
          title: finalTitle,
          description: limitedText,
          color: isError ? 0xFF0000 : 0x00FF00,
        },
      ],
    };

    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error(`Error al enviar mensaje: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error al conectar con Discord:', error.message);
    }
  }
}

