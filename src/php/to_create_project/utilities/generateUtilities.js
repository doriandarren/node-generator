import { generateExcel } from './excel/generateExcel.js';
import { generateHelpers } from './helpers/generateHelpers.js';
import { generateMessages } from './messages/generateMessages.js';



export const generateUtilities = async(fullPath) => {
  
  await generateExcel(fullPath)
  await generateHelpers(fullPath)
  await generateMessages(fullPath)

}
