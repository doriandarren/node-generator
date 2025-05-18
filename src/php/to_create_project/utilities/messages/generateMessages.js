import fs from "fs";
import path from "path";
import { createFolder } from '../../../../helpers/helperFile.js';

export const generateMessages = async (fullPath) => {
  const folderPath = path.join(fullPath, "app", "Utilities", "Messages");
  const filePath = path.join(folderPath, "MessageChannel.php");

  createFolder(folderPath);

  const code = `<?php

namespace App\\Utilities\\Messages;

use Illuminate\\Http\\Client\\ConnectionException;
use Illuminate\\Support\\Facades\\Http;
use stdClass;

class MessageChannel
{
    // Discord
    const URL = 'https://discord.com/api/webhooks/1227264474621411509/pPLiLLoDwTx51Z9s5DBtqYaZ7juMaHZayu-QkJdhTLwCvXZdWT9dmFi85ssHdgMRakA6';

    /**
     * @param \$text
     * @param string \$title
     * @param bool \$isError
     * @return void
     */
    public static function send(\$text, string \$title = 'Title', bool \$isError = false): void
    {
        \$title .= ' ' . env('APP_NAME') . ' ' . env('APP_ENV');

        // Limitar \$text a 500 caracteres
        \$text = mb_substr(\$text, 0, 500);

        \$embed = [
            'title' => \$title,
            'description' => \$text,
            'color' => \$isError ? 0xFF0000 : 0x00FF00 // Red : Green
        ];

        \$payload = [
            'embeds' => [\$embed]
        ];

        try {
            Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post(self::URL, \$payload);
        } catch (\\GuzzleHttp\\Exception\\GuzzleException \$e) {
            echo 'Error: ' . \$e->getMessage();
        } catch (ConnectionException \$e) {
            echo 'Error: ' . \$e->getMessage();
        }
    }
}
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }
};
