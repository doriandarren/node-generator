import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../helpers/helperFile.js';



export const generateTooltip = async (fullPath) => {
  const tooltipDir = path.join(fullPath, 'src', 'components', 'Tooltips');
  createFolder(tooltipDir);

  const filePath = path.join(tooltipDir, 'ThemedTooltip.jsx');

  const content = `import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export const ThemedTooltip = ({ children, text }) => {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const ref = useRef(null);

  useEffect(() => {
    if (show && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const tooltipHeight = 30; // altura aprox del tooltip
      const spaceAbove = rect.top;
      const top = spaceAbove < tooltipHeight
        ? rect.bottom + window.scrollY + 8
        : rect.top + window.scrollY - tooltipHeight - 8;

      setCoords({
        top,
        left: rect.left + rect.width / 2,
      });
    }
  }, [show]);

  return (
    <div
      ref={ref}
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show &&
        createPortal(
          <div
            style={{
              position: "absolute",
              top: \`\${coords.top}px\`,
              left: \`\${coords.left}px\`,
              transform: "translateX(-50%)",
              zIndex: 9999,
            }}
            className="bg-black text-white text-xs rounded px-2 py-1 shadow-lg whitespace-nowrap"
          >
            {text}
          </div>,
          document.body
        )}
    </div>
  );
};
`.trimStart();

  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo generado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al generar el archivo ${filePath}: ${error.message}`);
  }
}