import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../../helpers/helperFile.js';




export const generateHelpers = async(fullPath) => {
    await createHelperDate(fullPath);
    await createHelperFile(fullPath);
}


const createHelperDate = async (fullPath) => {
  const folderPath = path.join(fullPath, 'app', 'Utilities', 'Helpers');
  const filePath = path.join(folderPath, 'HelperDate.php');

  createFolder(folderPath);

  const code = `<?php

namespace App\\Utilities\\Helpers;

use DateTime;
use Exception;
use stdClass;

class HelperDate
{

    /**
     * Convert String to timestamp
     *
     * Ex. 20190429234640   ->   2019-04-29 23:46:40
     */
    public static function formatStringToTimestamp(\$strDate): string
    {
        \$year = substr(\$strDate, 0, 4);
        \$month = substr(\$strDate, 4, 2);
        \$day = substr(\$strDate, 6, 2);
        \$hour = substr(\$strDate, 8, 2);
        \$min = substr(\$strDate, 10, 2);
        \$seg = substr(\$strDate, 12, 2);
        return "\$year-\$month-\$day \$hour:\$min:\$seg";
    }


    /**
     * Convert String to timestamp
     *
     * Ex. 20190429   ->   2019-04-29
     */    
    public static function formatStringToDate(\$strDate): string
    {
        \$year = substr(\$strDate, 0, 4);
        \$month = substr(\$strDate, 4, 2);
        \$day = substr(\$strDate, 6, 2);
        return "\$year-\$month-\$day";
    }



    /**
     * Convert and reverse date
     *
     * Ex. 2019-04-29   ->   29-04-2019
     * 
     * @param $str
     * @return string
     */
    public static function formatReverseDate(\$str): string
    {
        \$year = substr(\$str, 0, 4);
        \$month = substr(\$str, 5, 2);
        \$day = substr(\$str, 8, 2);
        return "\$day-\$month-\$year";
    }



    /**
     * Convert date format for database Mysql
     *
     * Ex. 29-04-2019  ->  2019-04-29
     *
     * @param $str
     * @return string
     */
    public static function formatDateForDB(\$str): string
    {
        \$day = substr(\$str, 0, 2);
        \$month = substr(\$str, 3, 2);
        \$year = substr(\$str, 6, 4);
        return "\$year-\$month-\$day";
    }



    /**
     * Convert date format for database Mysql
     *
     * Ex. 1/4/22  ->  2022-04-01
     *
     *
     * @param $str
     * @return string
     */
    public static function formatDateByDBShort(\$str): string
    {
        \$date = explode("/", \$str);
        \$day = str_pad(\$date[0], 2, '0', STR_PAD_LEFT);
        \$month = str_pad(\$date[1], 2, '0', STR_PAD_LEFT);
        \$year = strlen(\$date[2]) == 4 ? \$date[2] : '20' . \$date[2];
        return "\$year-\$month-\$day";
    }



    /**
     * Calculate days before of date
     * Ex. calculate 20 day's
     *      2019-04-10   ->   20-04-2019
     */
    public static function calculateDaysBeforeOrAfter(\$date, \$days, \$before = false): string
    {
        return date('d-m-Y', strtotime((\$before ? '-' : '') . "\$days day", strtotime(\$date)));
    }



    /**
     * Calculate days SENSE FORMAT before of date
     * Ex. calculate 20 day's
     *      2019-04-10   ->   2019-04-20
     */
    public static function calculateDaysBeforeOrAfterSenseFormat(\$date, \$days, \$before = false, \$dateTime = false): string
    {
        \$format = \$dateTime ? 'Y-m-d H:i:s' : 'Y-m-d';
        return date(\$format, strtotime((\$before ? '-' : '') . "\$days day", strtotime(\$date)));
    }



    /**
     * @param $startDate
     * @param $days
     * @return string
     */
    public static function calculateDueDate(\$startDate, \$days): string
    {
        try {
            \$startDateTime = new DateTime(\$startDate);
            \$endDateTime = clone \$startDateTime;
            \$endDateTime->modify("+\$days days");
            return \$endDateTime->format('Y-m-d H:i:s');
        } catch (Exception \$e) {
            return '';
        }
    }



    /**
     * Order Array years until today Ex. [2021,2020,2019...]
     * @param $start_year
     * @return array
     */
    public static function getYearsList(\$start_year): array
    {
        \$start_year = intval(\$start_year);
        \$yearNow = intval(date('Y'));
        \$arr = [];
        for (\$i = \$start_year; \$i <= \$yearNow; \$i++) {
            \$arr[] = \$i;
        }
        rsort(\$arr);
        return \$arr;
    }



    /**
     * Return only the month.  Ex. 6  --> June
     * @return false|string
     */
    public static function getLastMonth()
    {
        \$exd_new = strtotime('-1 month', strtotime(date('Y-m-d')));
        return date('n', \$exd_new);
    }


    /**
     * @param $thisMonth :int
     * @param $type // short or long
     * @return string
     */
    public static function monthName($thisMonth, $type): string 
    {
        $string = '';

        switch ($thisMonth) {
            case 1:     if($type == 'short') { $string = "Ene"; } elseif ($type == 'long') { $string = "Enero"; }      break;
            case '01':     if($type == 'short') { $string = "Ene"; } elseif ($type == 'long') { $string = "Enero"; }      break;
            case 2:     if($type == 'short') { $string = "Feb"; } elseif ($type == 'long') { $string = "Febrero"; }    break;
            case '02':     if($type == 'short') { $string = "Feb"; } elseif ($type == 'long') { $string = "Febrero"; }    break;
            case 3:     if($type == 'short') { $string = "Mar"; } elseif ($type == 'long') { $string = "Marzo"; }      break;
            case '03':     if($type == 'short') { $string = "Mar"; } elseif ($type == 'long') { $string = "Marzo"; }      break;
            case 4:     if($type == 'short') { $string = "Abr"; } elseif ($type == 'long') { $string = "Abril"; }      break;
            case '04':     if($type == 'short') { $string = "Abr"; } elseif ($type == 'long') { $string = "Abril"; }      break;
            case 5:     if($type == 'short') { $string = "May"; } elseif ($type == 'long') { $string = "Mayo"; }       break;
            case '05':     if($type == 'short') { $string = "May"; } elseif ($type == 'long') { $string = "Mayo"; }       break;
            case 6:     if($type == 'short') { $string = "Jun"; } elseif ($type == 'long') { $string = "Junio"; }      break;
            case '06':     if($type == 'short') { $string = "Jun"; } elseif ($type == 'long') { $string = "Junio"; }      break;
            case 7:     if($type == 'short') { $string = "Jul"; } elseif ($type == 'long') { $string = "Julio"; }      break;
            case '07':     if($type == 'short') { $string = "Jul"; } elseif ($type == 'long') { $string = "Julio"; }      break;
            case 8:     if($type == 'short') { $string = "Ago"; } elseif ($type == 'long') { $string = "Agosto"; }     break;
            case '08':     if($type == 'short') { $string = "Ago"; } elseif ($type == 'long') { $string = "Agosto"; }     break;
            case 9:     if($type == 'short') { $string = "Sep"; } elseif ($type == 'long') { $string = "Septiembre"; } break;
            case '09':     if($type == 'short') { $string = "Sep"; } elseif ($type == 'long') { $string = "Septiembre"; } break;
            case 10:    if($type == 'short') { $string = "Oct"; } elseif ($type == 'long') { $string = "Octubre"; }    break;
            case 11:    if($type == 'short') { $string = "Nov"; } elseif ($type == 'long') { $string = "Noviembre"; }  break;
            case 12:    if($type == 'short') { $string = "Dic"; } elseif ($type == 'long') { $string = "Diciembre"; }  break;
        }
        return $string;
    }



    /**
     * @return string
     */
    public static function uniqueFormat(): string
    {
        \$date = DateTime::createFromFormat('U.u', microtime(true));
        return \$date->format('YmdHisu');
    }


    /**
     * @return array
     */
    public static function getMonthlist(): array
    {
        \$months = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
        \$arr = [];
        foreach (\$months as \$i => \$text) {
            \$obj = new stdClass();
            \$obj->number = str_pad((\$i + 1), 2, '0', STR_PAD_LEFT);
            \$obj->text = \$text;
            \$arr[] = \$obj;
        }
        return \$arr;
    }




    /**
     * Ex. '2018-01-01', 3
     * return ['2018-01-01', '2018-02-02', '2018-03-03']
     *
     * Ex. '2018-01-01', 3, TRUE
     * return ['Enero', 'Febrero', 'Marzo']
     *
     * @param $date
     * @param $monthCount
     * @param boolean $isNameMonth
     * @return array
     */
    public static function findArrMonths(\$date, \$monthCount, bool \$isNameMonth = false): array
    {
        \$arr = [\$date];
        \$aux = \$date;
        for (\$i = 0; \$i < (\$monthCount - 1); \$i++) {
            \$aux = date('Y-m-d', strtotime('+1 month', strtotime(\$aux)));
            \$arr[] = \$aux;
        }

        if (\$isNameMonth) {
            return array_map(fn(\$item) => self::monthName(substr(\$item, 5, 2), 'large'), \$arr);
        }
        return \$arr;
    }





    /**
     * Find Months
     *
     * Ex. $startDate = '2018-04-01' and $months = '3'
     * -> return ['01', '04', '07', '10']
     *
     * @param $month
     * @param $starDate
     * @return array
     */
    public static function findArrMonthsByStartDate(\$startDate, \$month): array
    {
        \$arrDates = [];
        \$finalDate = date("Y-m-d", strtotime("\$startDate +1 year"));
        \$aux = date("Y-m-d", strtotime("\$startDate +\$month month"));
        \$arrDates[] = \$aux;

        while (\$aux < \$finalDate) {
            \$aux = date("Y-m-d", strtotime("\$aux +\$month month"));
            \$arrDates[] = \$aux;
        }

        \$arrMonths = array_map(fn(\$date) => substr(\$date, 5, 2), \$arrDates);
        asort(\$arrMonths);
        return \$arrMonths;
    }

    public static function findDateByHour(\$date, \$hour): string
    {
        return date("Y-m-d H:i:s", strtotime("\$date +\$hour hours"));
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




const createHelperFile = async (fullPath) => {
    
  const folderPath = path.join(fullPath, 'app', 'Utilities', 'Helpers');
  const filePath = path.join(folderPath, 'HelperFile.php');

  createFolder(folderPath);

  const code = `<?php

namespace App\\Utilities\\Helpers;

class HelperFile
{
    public function createFile(\$path)
    {
        try {
            return fopen(public_path(\$path), 'x+');
        } catch (\\Exception \$e) {
            echo \$e->getMessage();
            return null;
        }
    }

    public function createFieldLine(\$str, \$length)
    {
        if (strlen(\$str) <= \$length) {
            \$filler = str_repeat(' ', \$length - strlen(\$str));
            return \$str . \$filler;
        } else {
            return '@@@@@@@ EXCEDE EL LIMITE@@@@@@';
        }
    }

    public function createFiller(\$length)
    {
        return str_repeat(' ', \$length);
    }

    public function writeLine(\$handle, \$line)
    {
        fwrite(\$handle, \$line);
    }

    public function writeLineBreak(\$handle)
    {
        fwrite(\$handle, chr(0x0D) . chr(0x0A));
    }

    public static function zFill(\$valor, \$long = 0)
    {
        return str_pad(\$valor, \$long, '0', STR_PAD_LEFT);
    }

    public function closeFile(\$handle)
    {
        try {
            fclose(\$handle);
        } catch (\\Exception \$e) {
            // error
        }
    }

    public function replaceSpecialChars(\$value)
    {
        \$unwanted_array = array(
            'Š'=>'S','š'=>'s','Ž'=>'Z','ž'=>'z','À'=>'A','Á'=>'A','Â'=>'A','Ã'=>'A','Ä'=>'A','Å'=>'A','Æ'=>'A','Ç'=>'C','È'=>'E','É'=>'E',
            'Ê'=>'E','Ë'=>'E','Ì'=>'I','Í'=>'I','Î'=>'I','Ï'=>'I','Ñ'=>'N','Ò'=>'O','Ó'=>'O','Ô'=>'O','Õ'=>'O','Ö'=>'O','Ø'=>'O','Ù'=>'U',
            'Ú'=>'U','Û'=>'U','Ü'=>'U','Ý'=>'Y','Þ'=>'B','ß'=>'Ss','à'=>'a','á'=>'a','â'=>'a','ã'=>'a','ä'=>'a','å'=>'a','æ'=>'a','ç'=>'c',
            'è'=>'e','é'=>'e','ê'=>'e','ë'=>'e','ì'=>'i','í'=>'i','î'=>'i','ï'=>'i','ð'=>'o','ñ'=>'n','ò'=>'o','ó'=>'o','ô'=>'o','õ'=>'o',
            'ö'=>'o','ø'=>'o','ù'=>'u','ú'=>'u','û'=>'u','ý'=>'y','þ'=>'b','ÿ'=>'y'
        );
        return strtr(\$value, \$unwanted_array);
    }

    public static function listFilesIntoDir(\$pathDir)
    {
        \$arrayFiles = [];
        \$directorio = opendir(\$pathDir);
        while (\$file = readdir(\$directorio)) {
            if (!is_dir(\$file) && \$file != '.DS_Store') {
                \$arrayFiles[] = \$file;
            }
        }
        asort(\$arrayFiles);
        return \$arrayFiles;
    }

    public function openFileToRead(\$pathFile)
    {
        try {
            return fopen(\$pathFile, 'r');
        } catch (\\Exception \$e) {
            return null;
        }
    }

    public function checkLengthLine(\$handle, \$totalLine)
    {
        \$line = 1;
        while (!feof(\$handle)) {
            \$strLine = fgets(\$handle);
            echo \$strLine . "<br>";
            \$length = strlen(\$strLine);
            if (\$length != \$totalLine) {
                return "Error Line: " . \$line . ' Cantidad: ' . \$length;
            }
            \$line++;
        }
        return null;
    }

    public static function formatSizeUnits(\$bytes)
    {
        if (\$bytes >= 1073741824) {
            return number_format(\$bytes / 1073741824, 2) . ' GB';
        } elseif (\$bytes >= 1048576) {
            return number_format(\$bytes / 1048576, 2) . ' MB';
        } elseif (\$bytes >= 1024) {
            return number_format(\$bytes / 1024, 2) . ' KB';
        } elseif (\$bytes > 1) {
            return \$bytes . ' bytes';
        } elseif (\$bytes == 1) {
            return \$bytes . ' byte';
        }
        return '0 bytes';
    }

    public static function checkApplicationType(\$type): string
    {
        \$type = strtolower(\$type);
        if (\$type === 'pdf') {
            return 'data:application/' . \$type;
        }
        if (in_array(\$type, ['png', 'jpg', 'jpeg'])) {
            return 'data:image/' . \$type;
        }
        if (in_array(\$type, ['xlxs', 'xlx'])) {
            return 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet/' . \$type;
        }
        return '';
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

