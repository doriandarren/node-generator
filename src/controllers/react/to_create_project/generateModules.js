import { generateModuleStandardReact } from '../to_create_module/generateModuleStandardReact.js';


export const generateModules = async(fullPath) => {    


  await generateModuleStandardReact(
    fullPath,
    [ 'route', 'list', 'create', 'edit', 'barrel', 'service' ],
    'api',
    'Profile',
    'Profiles',
    [
      { name: 'user_status_id', type: 'STRING', allowNull: true },
      { name: 'name', type: 'STRING', allowNull: true },
      { name: 'email', type: 'STRING', allowNull: true },
      { name: 'password', type: 'STRING', allowNull: true },
      { name: 'image_url', type: 'STRING', allowNull: true },
    ]
  );



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

}
