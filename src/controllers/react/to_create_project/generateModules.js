import { generateModuleStandardReact } from '../to_create_module_crud/generateModuleStandardReact.js';


export const generateModules = async(fullPath) => {    


  // User Status
  await generateModuleStandardReact(
    fullPath,
    [ 'route', 'list', 'create', 'edit', 'barrel', 'service' ],
    'api',
    'UserStatus',
    'UserStatuses',
    [
      { name: 'name', type: 'STRING', allowNull: true },
    ]
  );

  // User
  await generateModuleStandardReact(
    fullPath,
    [ 'route', 'list', 'create', 'edit', 'barrel', 'service' ],
    'api',
    'User',
    'Users',
    [
      { name: 'user_status_id', type: 'fk', allowNull: true },
      { name: 'name', type: 'STRING', allowNull: true },
      { name: 'email', type: 'STRING', allowNull: true },
      { name: 'password', type: 'STRING', allowNull: true },
      { name: 'email_verfied_at', type: 'STRING', allowNull: true },
      { name: 'image_url', type: 'STRING', allowNull: true },
    ]
  );



  // Profile (Igual que User la diferencia que el usaurio gestionará algunos datos) 
  await generateModuleStandardReact(
    fullPath,
    [ 'route', 'list', 'create', 'edit', 'barrel', 'service' ],
    'api',
    'Profile',
    'Profiles',
    [
      { name: 'name', type: 'STRING', allowNull: true },
      { name: 'email', type: 'STRING', allowNull: true },
      { name: 'password', type: 'STRING', allowNull: true },
      { name: 'image_url', type: 'STRING', allowNull: true },
    ]
  );




  // Teams
  await generateModuleStandardReact(
    fullPath,
    [ 'route', 'list', 'create', 'edit', 'barrel', 'service' ],
    'api',
    'Team',
    'Teams',
    [
      { name: 'name', type: 'STRING', allowNull: true },
      { name: 'description', type: 'STRING', allowNull: true },
    ]
  );



  // System
  await generateModuleStandardReact(
    fullPath,
    [ 'route', 'list', 'create', 'edit', 'barrel', 'service' ],
    'api',
    'System',
    'Systems',
    [
      { name: 'name', type: 'STRING', allowNull: true },
      { name: 'status', type: 'STRING', allowNull: true },
      { name: 'version', type: 'STRING', allowNull: true },
    ]
  );
  
  
  // Quotes
  await generateModuleStandardReact(
    fullPath,
    [ 'route', 'list', 'create', 'edit', 'barrel', 'service' ],
    'api',
    'Quote',
    'Quotes',
    [
      { name: 'author', type: 'STRING', allowNull: true },
      { name: 'feedback', type: 'STRING', allowNull: true },
      { name: 'title', type: 'STRING', allowNull: true },
    ]
  );


}
