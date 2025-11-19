import fs from "fs";
import path from "path";
import { createFolder } from "../../../helpers/helperFile.js";
import {
  addHeaderLine,
  addModuleExport,
  addModuleProvider,
} from "../helpers/helperFileWrite.js";

export const generateMessageChannel = async (fullPath) => {
  await createMessageChannel(fullPath);

  await addHeader(fullPath);
  await addModuleProviderAdapter(fullPath);
  await addModuleExportAdapter(fullPath);
};

const createMessageChannel = async (fullPath) => {
  // Folder
  const folderPath = path.join(fullPath, "src", "common", "messages");

  // File
  const filePath = path.join(folderPath, "message-channel.service.ts");

  // Asegurar que la carpeta exista
  createFolder(folderPath);

  // Code
  const code = `import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class MessageChannelService {
  private readonly logger = new Logger(MessageChannelService.name);

  constructor(private readonly configService: ConfigService) {}

  /**
   * Send message webhook extern
   */
  async send(text: string, title:string = 'Title', isError:boolean = false): Promise<void> {
    const url = this.configService.get<string>('MESSAGE_CHANNEL');
    const appName = this.configService.get<string>('APP_NAME');
    const appEnv = this.configService.get<string>('APP_ENV');

    if (!url) {
      this.logger.error('MESSAGE_CHANNEL no está configurado en .env');
      return;
    }


    title = \`\${title} \${appName} \${appEnv}\`

    text = text.substring(0, 500);

    const embed = {
        title,
        description: text,
        color: isError ? 0xff0000 : 0x00ff00, // red / green
    }

    const payload = {
        embeds: [embed],
    }

    try {
        await axios.post(url, payload, {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        this.logger.error(\`Error enviando mensaje: \${error.message}\`);
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

const addHeader = async (fullPath) => {
  const filePath = path.join(fullPath, "src", "common", "common.module.ts");
  addHeaderLine(
    filePath,
    `import { MessageChannelService } from './messages/message-channel.service';`
  );
};

const addModuleProviderAdapter = async (fullPath) => {
  const filePath = path.join(fullPath, "src", "common", "common.module.ts");
  addModuleProvider(filePath, `MessageChannelService,`);
};

const addModuleExportAdapter = async (fullPath) => {
  const filePath = path.join(fullPath, "src", "common", "common.module.ts");
  addModuleExport(filePath, `MessageChannelService,`);
};
