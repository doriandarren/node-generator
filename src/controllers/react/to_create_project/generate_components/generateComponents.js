import { generateButton } from './generateButton.js';
import { generateSection } from './generateSection.js';
import { generateAlert } from './generateAlert.js';
import { generatePreloaderSVG } from './generatePreloaderSVG.js';
import { generatePreloader } from './generatePreloader.js';
import { generatePreloaderMain } from './generatePreloaderMain.js';
import { generatePreloaderMainCSS } from './generatePreloaderMainCSS.js';
import { generatePreloaderButtonCSS } from './generatePreloaderButtonCSS.js';
import { generatePreloaderButton } from './generatePreloaderButton.js';
import { generateComboBox } from './generateComboBox.js';
import { generateToggle } from './generateToggle.js';
import { generateBadge } from './generateBadge.js';
import { generateTooltip } from './generateTooltip.js';
import { generateInvoiceIcon } from './generateInvoiceIcon.js';
import { generateEyeOffIcon } from './generateEyeOffIcon.js';
import { generateEyeOnIcon } from './generateEyeOnIcon.js';
import { generateDatatable } from './generateDatatable.js';
import { generateText } from './generateText.js';
import { generateCard } from './generateCard.js';



export const generateComponents = async(fullPath) => {
  
  // Btn
  await generateButton(fullPath);

  // Section
  await generateSection(fullPath);

  // Alert
  await generateAlert(fullPath);

  // Preloaders
  await generatePreloaderSVG(fullPath);
  await generatePreloader(fullPath);
  await generatePreloaderMain(fullPath);
  await generatePreloaderMainCSS(fullPath);
  await generatePreloaderButtonCSS(fullPath);
  await generatePreloaderButton(fullPath);



  // DataTable
  await generateDatatable(fullPath);


  // ComboBoxes
  await generateComboBox(fullPath);


  // Toggle
  await generateToggle(fullPath);


  // Badge
  await generateBadge(fullPath);


  // ToolTip
  await generateTooltip(fullPath);

  
  // Icons
  await generateInvoiceIcon(fullPath);
  await generateEyeOffIcon(fullPath);
  await generateEyeOnIcon(fullPath);

  // Text
  await generateText(fullPath);


  // Card
  await generateCard(fullPath);


}

