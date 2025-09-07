import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';


export const generatelTestMail = async(fullPath) => {   

    await createTestEmailClass(fullPath);
    await createTestEmailView(fullPath);


}



const createTestEmailClass = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'app', 'Mail');
    
    // File
    const filePath = path.join(folderPath, 'TestMail.php');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
<?php

namespace App\\Mail;

use Illuminate\\Bus\\Queueable;
use Illuminate\\Contracts\\Queue\\ShouldQueue;
use Illuminate\\Mail\\Mailable;
use Illuminate\\Mail\\Mailables\\Content;
use Illuminate\\Mail\\Mailables\\Envelope;
use Illuminate\\Queue\\SerializesModels;

class TestMail extends Mailable
{
    use Queueable, SerializesModels;


    protected String $mySubject;
    protected String $myBody;



    /**
     * Create a new message instance
     */
    public function __construct($mySubject = 'Default Subject', $myBody = '')
    {
        $this->mySubject = $mySubject;
        $this->myBody = $myBody;
    }


    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->mySubject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'tests.email_test',
            with: [
                'mySubject' => $this->mySubject,
                'myBody' => $this->myBody,
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \\Illuminate\\Mail\\Mailables\\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}    
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }

}


const createTestEmailView = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'resource', 'views', 'tests');
    
    // File
    const filePath = path.join(folderPath, 'test_email.blade.php');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DeliveryNote</title>
    <style>
        /* Incluir Tailwind CSS como estilos en línea o utilizando un compilador de CSS */
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 1rem;
            font-family: Arial, sans-serif;
        }
        .header {
            background-color: #4A90E2;
            color: white;
            padding: 1px;
            text-align: center;
        }
        .content {
            background-color: #f9f9f9;
            padding: 1rem;
        }
        .footer {
            text-align: center;
            padding: 1rem;
            font-size: 0.875rem;
            color: #888;
        }
        .button {
            background-color: #4A90E2;
            color: white;
            padding: 0.5rem 1rem;
            text-decoration: none;
            border-radius: 0.25rem;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 3rem;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
        }
        th {
            background-color: #f2f2f2;
            text-align: left;
        }
        p{
            margin-bottom: 2rem;
            font-size: 1rem;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <h1>{{ $mySubject ?? '' }}</h1>
    </div>
    <div class="content">
        <p>Hola!</p>
        <p>
            Esto es un correo de Prueba.
        </p>
        <p>
            {{ $myBody ?? '' }}
        </p>

    </div>
    <div class="footer">

        <p style="font-size: 10px; text-align: justify;">
            <strong>AVISO LEGAL:</strong> Este mensaje y sus posibles documentos adjuntos son confidenciales y están
            dirigidos exclusivamente a sus destinatarios. Por favor, si Ud. no es uno de ellos, notifíquenoslo y
            elimine el mensaje de su sistema. De conformidad con la legislación vigente, queda prohibida la copia,
            difusión o revelación de su contenido a terceros sin el previo consentimiento por escrito de Splytin.
            Asimismo, en relación con la normativa de protección de datos puede ejercer sus derechos de acceso,
            rectificación, cancelación, oposición y portabilidad de acuerdo a lo establecido en nuestra política
            de privacidad en la siguiente dirección: Calle XXXX, España.
        </p>

        <p style="font-size: 10px; text-align: justify;">
            <strong>LEGAL NOTICE:</strong> This message (including any attachments) may contain privileged and/or
            confidential information. Therefore, we would like to inform whoever may receive it by mistake that the
            information contained herein is strictly confidential, and its unauthorized use is prohibited by law.
            Therefore, in this case, please notify us by email and refrain from copying the message or forwarding
            it to third parties, and proceed to delete it immediately. According to the Organic Law of Protection of
            Personal Data, SPLITYN informs you that your data is protected according to Organic Law 15/1999.
            The owner of the data will have, at any time, the right to access the files, and can also exercise
            the rights of rectification, cancellation and opposition in the terms included in the data protection
            legislation at the following address: Calle XXX, Spain.
        </p>

        <hr style="margin: 1.5rem 0; border: none; border-top: 1px solid #ccc;">

        <p style="font-size: 12px;">&copy; {{ date('Y') }} Globalfleet. All rights reserved.</p>

    </div>
</div>

@php //dd("OK"); @endphp
</body>
</html>

`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }

}