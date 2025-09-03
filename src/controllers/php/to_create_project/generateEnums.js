import fs from 'fs';
import path from 'path';
import { printMessage } from '../../../helpers/inquirer.js';

/**
 * Genera todos los archivos enum
 */
export const generateEnums = async (fullPath) => {
  await createDev(fullPath);
  await createExcludeTable(fullPath);
  await createRole(fullPath);
  await createUser(fullPath);
  await createUserStatus(fullPath);
  await createAbilityGroups(fullPath);
  await createAbilitySuffix(fullPath);
  await createApiSetup(fullPath);
  await createSettingPaginate(fullPath);
};

// Función auxiliar para crear archivo
const createFile = (filePath, content) => {
  return new Promise((resolve) => {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      printMessage(`Carpeta creada: ${dir}`, 'green');
    }

    try {
      fs.writeFileSync(filePath, content, 'utf-8');
      printMessage(`Archivo generado: ${filePath}`, 'green');
    } catch (err) {
      printMessage(`Error al generar el archivo ${filePath}: ${err}`, 'cyan');
    }

    resolve();
  });
};


const createDev = async (fullPath) => {
  const filePath = path.join(fullPath, 'app', 'Enums', 'Dev', 'EnumDefaultCompany.php');
  const content = `<?php

namespace App\\Enums\\Dev;

class EnumDefaultCompany
{
    const MY_COMPANY_ID = 1;
    const MY_COMPANY_DOMAIN = 'site.com';
    const PASSWORD = 'Site2024';

    const ADMIN_NAME = 'Admin';
    const ADMIN_EMAIL = 'webmaster@site.com';

    const MANAGER_NAME = 'Manager';
    const MANAGER_EMAIL = 'manager@site.com';

    const USER_NAME = 'User';
    const USER_EMAIL = 'user@site.com';
}
`;
  await createFile(filePath, content);
};


const createExcludeTable = async (fullPath) => {
  const filePath = path.join(fullPath, 'app', 'Enums', 'Dev', 'EnumExcludeTable.php');
  const content = `<?php

namespace App\\Enums\\Dev;

enum EnumExcludeTable
{
    const EXCLUDE_TABLE = [
        'migrations',
        'failed_jobs',
        'jobs',
        'job_batches',
        'cache',
        'cache_locks',
        'password_resets',
        'personal_access_tokens',
        'password_reset_tokens',
        'sessions',
    ];
}
`;
  await createFile(filePath, content);
};


const createRole = async (fullPath) => {
  const filePath = path.join(fullPath, 'app', 'Enums', 'Roles', 'EnumRole.php');
  const content = `<?php

namespace App\\Enums\\Roles;

class EnumRole
{
    const ADMIN = 'admin';
    const MANAGER = 'manager';
    const USER = 'user';
    const ERP = 'erp';

    const ADMIN_DESCRIPTION = 'Admin';
    const MANAGER_DESCRIPTION = 'Manager';
    const USER_DESCRIPTION = 'User';
    const ERP_DESCRIPTION = 'Erp';

    const ADMIN_ID = 1;
    const MANAGER_ID = 2;
    const USER_ID = 3;
    const ERP_ID = 4;
}
`;
  await createFile(filePath, content);
};


const createUser = async (fullPath) => {
  const filePath = path.join(fullPath, 'app', 'Enums', 'Users', 'EnumUser.php');
  const content = `<?php

namespace App\\Enums\\Users;

enum EnumUser
{
    const WEBMASTER_EMAIL = 'webmaster@base.com';
    const WEBMASTER_PASSWORD = 'Base2024';
}
`;
  await createFile(filePath, content);
};


const createUserStatus = async (fullPath) => {
  const filePath = path.join(fullPath, 'app', 'Enums', 'UserStatuses', 'EnumUserStatus.php');
  const content = `<?php

namespace App\\Enums\\UserStatuses;

class EnumUserStatus
{
    const STATUS_ACTIVE_ID = 1;
    const STATUS_INACTIVE_ID = 2;

    const STATUS_ACTIVE_NAME = 'ACTIVE';
    const STATUS_INACTIVE_NAME = 'INACTIVE';
}
`;
  await createFile(filePath, content);
};


const createAbilityGroups = async (fullPath) => {
  const filePath = path.join(fullPath, 'app', 'Enums', 'EnumAbilityGroups.php');
  const content = `<?php

namespace App\\Enums;

class EnumAbilityGroups
{
    const ABILITIES_GROUP_DEFAULT = [
        [
            'name' => 'abilities',
            'abilities' => [
                EnumAbilitySuffix::LIST,
                EnumAbilitySuffix::SHOW,
                EnumAbilitySuffix::STORE,
                EnumAbilitySuffix::UPDATE,
                EnumAbilitySuffix::DESTROY,
            ]
        ],
        [
            'name' => 'ability_groups',
            'abilities' => [
                EnumAbilitySuffix::LIST,
                EnumAbilitySuffix::SHOW,
                EnumAbilitySuffix::STORE,
                EnumAbilitySuffix::UPDATE,
                EnumAbilitySuffix::DESTROY,
            ]
        ],
        [
            'name' => 'ability_user',
            'abilities' => [
                EnumAbilitySuffix::LIST,
                EnumAbilitySuffix::SHOW,
                EnumAbilitySuffix::STORE,
                EnumAbilitySuffix::UPDATE,
                EnumAbilitySuffix::DESTROY,
            ]
        ],
        [
            'name' => 'role_user',
            'abilities' => [
                EnumAbilitySuffix::LIST,
                EnumAbilitySuffix::SHOW,
                EnumAbilitySuffix::STORE,
                EnumAbilitySuffix::UPDATE,
                EnumAbilitySuffix::DESTROY,
            ]
        ],
        [
            'name' => 'roles',
            'abilities' => [
                EnumAbilitySuffix::LIST,
                EnumAbilitySuffix::SHOW,
                EnumAbilitySuffix::STORE,
                EnumAbilitySuffix::UPDATE,
                EnumAbilitySuffix::DESTROY,
            ]
        ],
        [
            'name' => 'countries',
            'abilities' => [
                EnumAbilitySuffix::LIST,
                EnumAbilitySuffix::SHOW,
                EnumAbilitySuffix::STORE,
                EnumAbilitySuffix::UPDATE,
                EnumAbilitySuffix::DESTROY,
            ]
        ],
        [
            'name' => 'user_statuses',
            'abilities' => [
                EnumAbilitySuffix::LIST,
                EnumAbilitySuffix::SHOW,
                EnumAbilitySuffix::STORE,
                EnumAbilitySuffix::UPDATE,
                EnumAbilitySuffix::DESTROY,
            ]
        ],
        [
            'name' => 'users',
            'abilities' => [
                EnumAbilitySuffix::LIST,
                EnumAbilitySuffix::SHOW,
                EnumAbilitySuffix::STORE,
                EnumAbilitySuffix::UPDATE,
                EnumAbilitySuffix::DESTROY,
            ]
        ],
    ];


    /**
     * Role Manager
     */
    const ABILITIES_GROUP_BY_MANAGER = self::ABILITIES_GROUP_DEFAULT;

    /**
     * Role User
     */
    const ABILITIES_GROUP_BY_USER = self::ABILITIES_GROUP_DEFAULT;

    /**
     * ERP
     */
    const ABILITIES_GROUP_BY_ERP = self::ABILITIES_GROUP_DEFAULT;
    
}
`;
  await createFile(filePath, content);
};


const createAbilitySuffix = async (fullPath) => {
  const filePath = path.join(fullPath, 'app', 'Enums', 'EnumAbilitySuffix.php');
  const content = `<?php

namespace App\\Enums;

abstract class EnumAbilitySuffix
{
    const ALL = ':all';
    const LIST = ':list';
    const STORE = ':store';
    const UPDATE = ':update';
    const DESTROY = ':destroy';
    const SHOW = ':show';
}
`;
  await createFile(filePath, content);
};


const createApiSetup = async (fullPath) => {
  const filePath = path.join(fullPath, 'app', 'Enums', 'EnumApiSetup.php');
  const content = `<?php

namespace App\\Enums;

abstract class EnumApiSetup
{
    const API_VERSION = 'v1/';
    const API_NAME = 'api/';
    const QUERY_LIMIT = 2000;
    const API_DRIVER = 'driver-app/';
    const API_OFFICE = 'office/';
}
`;
  await createFile(filePath, content);
};


const createSettingPaginate = async (fullPath) => {
  const filePath = path.join(fullPath, 'app', 'Enums', 'EnumSettingPaginate.php');
  const content = `<?php

namespace App\\Enums;

abstract class EnumSettingPaginate
{
    const PER_PAGE = '10';
}
`;
  await createFile(filePath, content);
};
