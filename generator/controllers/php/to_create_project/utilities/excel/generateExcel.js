import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../../helpers/helperFile.js';




export const generateExcel = async(fullPath) => {
    await createExampleExport(fullPath);
    await createExampleExportPerSheet(fullPath);
}




const createExampleExport = async (fullPath) => {
  
  const folderPath = path.join(fullPath, 'app', 'Utilities', 'Exls', 'Exports', 'Example');

  const filePath = path.join(folderPath, 'ExampleExport.php');

  createFolder(folderPath);

  const code = `<?php

namespace App\\Utilities\\Exls\\Exports\\Example;

use Maatwebsite\\Excel\\Concerns\\Exportable;
use Maatwebsite\\Excel\\Concerns\\WithMultipleSheets;

class ExampleExport implements WithMultipleSheets
{
    use Exportable;

    protected \$data;

    /**
     * Constructor.
     * @param \$data
     */
    public function __construct(\$data)
    {
        \$this->data = \$data;
    }

    public function sheets(): array
    {
        \$sheets = [];

        /**
         * Resume First page
         */
        \$dataSheet = [];

        //Create Title
        \$dataSheet[] = [
            "Fecha de Factura",
            "Num de Factura",
            "codigo Targeta",
            "Tarjeta",
            "Matricula",
        ];

        // Create Data
        foreach (\$this->data as \$item) {
            \$dataSheet[] = [
                \$item->invoice_date,
                \$item->invoice_number,
                \$item->card_code,
                \$item->card,
                \$item->plate,
            ];
        }

        \$sheets[] = new ExampleExportPerSheet(\$dataSheet, 'Resumen');

        return \$sheets;
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





const createExampleExportPerSheet = async (fullPath) => {

  const folderPath = path.join(fullPath, 'app', 'Utilities', 'Exls', 'Exports', 'Example');

  const filePath = path.join(folderPath, 'ExampleExportPerSheet.php');

  createFolder(folderPath);

  const code = `<?php

namespace App\\Utilities\\Exls\\Exports\\Example;

use Maatwebsite\\Excel\\Concerns\\FromArray;
use Maatwebsite\\Excel\\Concerns\\ShouldAutoSize;
use Maatwebsite\\Excel\\Concerns\\WithEvents;
use Maatwebsite\\Excel\\Concerns\\WithTitle;
use Maatwebsite\\Excel\\Events\\AfterSheet;

class ExampleExportPerSheet implements WithTitle, FromArray, ShouldAutoSize, WithEvents
{
    protected \$data;
    protected \$sheetTitle;
    protected \$sheetColumns;

    /**
     * @param \$data
     * @param \$sheetTitle
     */
    public function __construct(\$data, \$sheetTitle)
    {
        \$this->data = \$data;
        \$this->sheetTitle = \$sheetTitle;
        \$this->sheetColumns = count(\$data[0]);
    }

    public function title(): string
    {
        return \$this->sheetTitle;
    }

    public function array(): array
    {
        return \$this->data;
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet \$event) {
                \$event->sheet->getDelegate()->getStyle('A1:' . \$this->numberToExcelColumn(\$this->sheetColumns) . '1')->getFill()
                    ->setFillType(\\PhpOffice\\PhpSpreadsheet\\Style\\Fill::FILL_SOLID)
                    ->getStartColor()
                    ->setRGB('D0D0D0');

                \$event->sheet->getDelegate()->getStyle('A1:' . \$this->numberToExcelColumn(\$this->sheetColumns) . '1')
                    ->applyFromArray([
                        'font' => [
                            'name' => 'Calibri',
                            'size' => 14,
                        ],
                        'borders' => [
                            'allBorders' => [
                                'borderStyle' => \\PhpOffice\\PhpSpreadsheet\\Style\\Border::BORDER_THIN,
                                'color' => ['rgb' => '000000'],
                            ],
                        ],
                    ])
                    ->getAlignment()
                    ->applyFromArray([
                        'horizontal' => 'center',
                    ]);

                \$event->sheet->getDelegate()->getRowDimension(1)->setRowHeight(35);
            },
        ];
    }

    private function numberToExcelColumn(\$number): string
    {
        \$dividend = \$number;
        \$columnName = '';
        while (\$dividend > 0) {
            \$modulo = (\$dividend - 1) % 26;
            \$columnName = chr(65 + \$modulo) . \$columnName;
            \$dividend = intdiv(\$dividend - 1, 26);
        }
        return \$columnName;
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

