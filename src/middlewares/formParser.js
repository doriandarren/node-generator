import multer from 'multer';

const storage = multer.memoryStorage(); // o usa diskStorage si prefieres guardar en disco

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB límite
});

// Solo campos de texto (sin archivos)
export const formParser = upload.none();

// Los siguientes son ejemplos para implementar en el controlador.

// Un solo archivo (campo: archivo). Ejemplo pero mejor implementar en el controlador. 
// export const formParserWithFile = upload.single('file');

// Varios archivos con el mismo campo (campo: fotos). Ejemplo pero mejor implementar en el controlador. 
// export const formParserWithPhotos = upload.array('picture', 5);

// Archivos en múltiples campos. Ejemplo pero mejor implementar en el controlador. 
// export const formParserMultipleFields = upload.fields([
//   { name: 'picture', maxCount: 1 },
//   { name: 'document', maxCount: 1 }
// ]);
