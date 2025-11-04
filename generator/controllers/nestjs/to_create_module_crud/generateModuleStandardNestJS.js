import fs from "fs";
import path from "path";
import { createFolder } from "../../../helpers/helperFile.js";

export const generateModuleStandardNestJS = async (
  fullPath,
  selectedComponents,
  namespace,
  singularName,
  pluralName,
  columns
) => {
  

  /*
  {
    fullPath: '/Users/dorian/NodeProjects/app-1',
    selectedComponents: [
      'controller',
      'dto',
      'entity',
      'service',
      'module',
      'seeder',
      'postman'
    ],
    namespace: 'API',
    singularName: 'AgendaUnloading',
    pluralName: 'AgendaUnloadings',
    columns: [
      { name: 'name', type: 'STRING', allowNull: false },
      { name: 'amount', type: 'STRING', allowNull: false },
      { name: 'description', type: 'STRING', allowNull: false }
    ]
  }
  */


  console.log({fullPath, selectedComponents, namespace, singularName, pluralName, columns});

  



  
  //Crear metodo para 





};
