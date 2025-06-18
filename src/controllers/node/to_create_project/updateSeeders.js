import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../helpers/helperFile.js';



export const updateSeeders = async(fullPath) => {    

    await updateCountrySeeder(fullPath);
    await updateUserSeeder(fullPath);
    await updateRoleSeeder(fullPath);
    await updateUserStatuses(fullPath);

}






const updateCountrySeeder = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'database', 'seeders', 'countries');
    
    // File
    const filePath = path.join(folderPath, 'countrySeeder.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
// seedCountriesManual.js
import { Country } from '../../../models/Country.js';

export async function seedCountriesManual() {
  const arrCountry = [
    ['AFGANISTÁN','AFGANISTÁN','AF','AFG','004','93'],
    ['ALAND','ALAND, ISLAS','AX','ALA','248','358'],
    ['ALBANIA','ALBANIA','AL','ALB','008','355'],
    ['ALEMANIA','ALEMANIA','DE','DEU','276','49'],
    ['ANDORRA','ANDORRA','AD','AND','020','376'],
    ['ANGOLA','ANGOLA','AO','AGO','024','244'],
    ['ANGUILA','ANGUILA','AI','AIA','660','1 264'],
    ['ANTÁRTIDA','ANTÁRTIDA','AQ','ATA','010','672'],
    ['ANTIGUA Y BARBUDA','ANTIGUA Y BARBUDA','AG','ATG','028','1 268'],
    ['ARABIA SAUDITA','ARABIA SAUDITA','SA','SAU','682','966'],
    ['ARGELIA','ARGELIA','DZ','DZA','012','213'],
    ['ARGENTINA','ARGENTINA','AR','ARG','032','54'],
    ['ARMENIA','ARMENIA','AM','ARM','051','374'],
    ['ARUBA','ARUBA','AW','ABW','533','297'],
    ['AUSTRALIA','AUSTRALIA','AU','AUS','036','61'],
    ['AUSTRIA','AUSTRIA','AT','AUT','040','43'],
    ['AZERBAIYÁN','AZERBAIYÁN','AZ','AZE','031','994'],
    ['BAHAMAS','BAHAMAS (LAS)','BS','BHS','044','1 242'],
    ['BANGLADÉS','BANGLADESH','BD','BGD','050','880'],
    ['BARBADOS','BARBADOS','BB','BRB','052','1 246'],
    ['BARÉIN','BAHREIN','BH','BHR','048','973'],
    ['BÉLGICA','BÉLGICA','BE','BEL','056','32'],
    ['BELICE','BELICE','BZ','BLZ','084','501'],
    ['BENÍN','BENÍN','BJ','BEN','204','229'],
    ['BERMUDAS','BERMUDAS','BM','BMU','060','1 441'],
    ['BIELORRUSIA','BELARÚS','BY','BLR','112','375'],
    ['BOLIVIA','BOLIVIA (ESTADO PLURINACIONAL DE)','BO','BOL','068','591'],
    ['BONAIRE, SAN EUSTAQUIO Y SABA','BONAIRE, SAN EUSTAQUIO Y SABA','BQ','BES','535',''],
    ['BOSNIA Y HERZEGOVINA','BOSNIA Y HERZEGOVINA','BA','BIH','070','387'],
    ['BOTSUANA','BOTSWANA','BW','BWA','072','267'],
    ['BRASIL','BRASIL','BR','BRA','076','55'],
    ['BRUNÉI','BRUNEI DARUSSALAM','BN','BRN','096','673'],
    ['BULGARIA','BULGARIA','BG','BGR','100','359'],
    ['BURKINA FASO','BURKINA FASO','BF','BFA','854','226'],
    ['BURUNDI','BURUNDI','BI','BDI','108','257'],
    ['BUTÁN','BHUTÁN','BT','BTN','064','975'],
    ['CABO VERDE','CABO VERDE','CV','CPV','132','238'],
    ['CAMBOYA','CAMBOYA','KH','KHM','116','855'],
    ['CAMERÚN','CAMERÚN','CM','CMR','120','237'],
    ['CANADÁ','CANADÁ','CA','CAN','124','1'],
    ['CATAR','QATAR','QA','QAT','634','974'],
    ['CHAD','CHAD','TD','TCD','148','235'],
    ['CHILE','CHILE','CL','CHL','152','56'],
    ['CHINA','CHINA','CN','CHN','156','86'],
    ['CHIPRE','CHIPRE','CY','CYP','196','357'],
    ['COLOMBIA','COLOMBIA','CO','COL','170','57'],
    ['COMORAS','COMORAS (LAS)','KM','COM','174','269'],
    ['COREA DEL NORTE','COREA (LA REPÚBLICA POPULAR DEMOCRÁTICA DE)','KP','PRK','408','850'],
    ['COREA DEL SUR','COREA (LA REPÚBLICA DE)','KR','KOR','410','82'],
    ['COSTA DE MARFIL','CÔTE DIVOIRE','CI','CIV','384','225'],
    ['COSTA RICA','COSTA RICA','CR','CRI','188','506'],
    ['CROACIA','CROACIA','HR','HRV','191','385'],
    ['CUBA','CUBA','CU','CUB','192','53'],
    ['CURAZAO','CURAÇAO','CW','CUW','531','5999'],
    ['DINAMARCA','DINAMARCA','DK','DNK','208','45'],
    ['DOMINICA','DOMINICA','DM','DMA','212','1 767'],
    ['ECUADOR','ECUADOR','EC','ECU','218','593'],
    ['EGIPTO','EGIPTO','EG','EGY','818','20'],
    ['EL SALVADOR','EL SALVADOR','SV','SLV','222','503'],
    ['EMIRATOS ÁRABES UNIDOS','EMIRATOS ÁRABES UNIDOS (LOS)','AE','ARE','784','971'],
    ['ERITREA','ERITREA','ER','ERI','232','291'],
    ['ESLOVAQUIA','ESLOVAQUIA','SK','SVK','703','421'],
    ['ESLOVENIA','ESLOVENIA','SI','SVN','705','386'],
    ['ESPAÑA','ESPAÑA','ES','ESP','724','34'],
    ['ESTADOS UNIDOS','ESTADOS UNIDOS DE AMÉRICA (LOS)','US','USA','840','1'],
    ['ESTONIA','ESTONIA','EE','EST','233','372'],
    ['ETIOPÍA','ETIOPÍA','ET','ETH','231','251'],
    ['FILIPINAS','FILIPINAS (LAS)','PH','PHL','608','63'],
    ['FINLANDIA','FINLANDIA','FI','FIN','246','358'],
    ['FIYI','FIJI','FJ','FJI','242','679'],
    ['FRANCIA','FRANCIA','FR','FRA','250','33'],
    ['GABÓN','GABÓN','GA','GAB','266','241'],
    ['GAMBIA','GAMBIA (LA)','GM','GMB','270','220'],
    ['GEORGIA','GEORGIA','GE','GEO','268','995'],
    ['GHANA','GHANA','GH','GHA','288','233'],
    ['GIBRALTAR','GIBRALTAR','GI','GIB','292','350'],
    ['GRANADA','GRANADA','GD','GRD','308','1 473'],
    ['GRECIA','GRECIA','GR','GRC','300','30'],
    ['GROENLANDIA','GROENLANDIA','GL','GRL','304','299'],
    ['GUADALUPE','GUADELOUPE','GP','GLP','312','590'],
    ['GUAM','GUAM','GU','GUM','316','1 671'],
    ['GUATEMALA','GUATEMALA','GT','GTM','320','502'],
    ['GUAYANA FRANCESA','GUAYANA FRANCESA','GF','GUF','254','594'],
    ['GUERNSEY','GUERNSEY','GG','GGY','831','44'],
    ['GUINEA','GUINEA','GN','GIN','324','224'],
    ['GUINEA-BISÁU','GUINEA BISSAU','GW','GNB','624','245'],
    ['GUINEA ECUATORIAL','GUINEA ECUATORIAL','GQ','GNQ','226','240'],
    ['GUYANA','GUYANA','GY','GUY','328','592'],
    ['HAITÍ','HAITÍ','HT','HTI','332','509'],
    ['HONDURAS','HONDURAS','HN','HND','340','504'],
    ['HONGKONG','HONG KONG','HK','HKG','344','852'],
    ['HUNGRÍA','HUNGRÍA','HU','HUN','348','36'],
    ['INDIA','INDIA','IN','IND','356','91'],
    ['INDONESIA','INDONESIA','ID','IDN','360','62'],
    ['IRAK','IRAQ','IQ','IRQ','368','964'],
    ['IRÁN','IRÁN (REPÚBLICA ISLÁMICA DE)','IR','IRN','364','98'],
    ['IRLANDA','IRLANDA','IE','IRL','372','353'],
    ['ISLA BOUVET','BOUVET, ISLA','BV','BVT','074',''],
    ['ISLA DE MAN','ISLA DE MAN','IM','IMN','833','44'],
    ['ISLA DE NAVIDAD','NAVIDAD, ISLA DE','CX','CXR','162','61'],
    ['ISLANDIA','ISLANDIA','IS','ISL','352','354'],
    ['ISLAS CAIMÁN','CAIMÁN, (LAS) ISLAS','KY','CYM','136','1 345'],
    ['ISLAS COCOS','COCOS / KEELING, (LAS) ISLAS','CC','CCK','166','61'],
    ['ISLAS COOK','COOK, (LAS) ISLAS','CK','COK','184','682'],
    ['ISLAS FEROE','FEROE, (LAS) ISLAS','FO','FRO','234','298'],
    ['ISLAS GEORGIAS DEL SUR Y SANDWICH DEL SUR','GEORGIA DEL SUR (LA) Y LAS ISLAS SANDWICH DEL SUR','GS','SGS','239','500'],
    ['ISLAS HEARD Y MCDONALD','HEARD (ISLA) E ISLAS MCDONALD','HM','HMD','334',''],
    ['ISLAS MALVINAS (FALKLAND)','MALVINAS [FALKLAND], (LAS) ISLAS','FK','FLK','238','500'],
    ['ISLAS MARIANAS DEL NORTE','MARIANAS DEL NORTE, (LAS) ISLAS','MP','MNP','580','1 670'],
    ['ISLAS MARSHALL','MARSHALL, (LAS) ISLAS','MH','MHL','584','692'],
    ['ISLAS PITCAIRN','PITCAIRN','PN','PCN','612','870'],
    ['ISLAS SALOMÓN','SALOMÓN, ISLAS','SB','SLB','090','677'],
    ['ISLAS TURCAS Y CAICOS','TURCAS Y CAICOS, (LAS) ISLAS','TC','TCA','796','1 649'],
    ['ISLAS ULTRAMARINAS MENORES DE LOS ESTADOS UNIDOS','ISLAS ULTRAMARINAS MENORES DE LOS ESTADOS UNIDOS (LAS)','UM','UMI','581','246'],
    ['ISLAS VÍRGENES BRITÁNICAS','VÍRGENES BRITÁNICAS, ISLAS','VG','VGB','092','1 284'],
    ['ISLAS VÍRGENES AMERICANAS','VÍRGENES DE LOS ESTADOS UNIDOS, ISLAS','VI','VIR','850','1 340'],
    ['ISRAEL','ISRAEL','IL','ISR','376','972'],
    ['ITALIA','ITALIA','IT','ITA','380','39'],
    ['JAMAICA','JAMAICA','JM','JAM','388','1 876'],
    ['JAPÓN','JAPÓN','JP','JPN','392','81'],
    ['JERSEY','JERSEY','JE','JEY','832','44'],
    ['JORDANIA','JORDANIA','JO','JOR','400','962'],
    ['KAZAJISTÁN','KAZAJISTÁN','KZ','KAZ','398','7'],
    ['KENIA','KENIA','KE','KEN','404','254'],
    ['KIRGUISTÁN','KIRGUISTÁN','KG','KGZ','417','996'],
    ['KIRIBATI','KIRIBATI','KI','KIR','296','686'],
    ['KUWAIT','KUWAIT','KW','KWT','414','965'],
    ['LAOS','LAO, (LA) REPÚBLICA DEMOCRÁTICA POPULAR','LA','LAO','418','856'],
    ['LESOTO','LESOTHO','LS','LSO','426','266'],
    ['LETONIA','LETONIA','LV','LVA','428','371'],
    ['LÍBANO','LÍBANO','LB','LBN','422','961'],
    ['LIBERIA','LIBERIA','LR','LBR','430','231'],
    ['LIBIA','LIBIA','LY','LBY','434','218'],
    ['LIECHTENSTEIN','LIECHTENSTEIN','LI','LIE','438','423'],
    ['LITUANIA','LITUANIA','LT','LTU','440','370'],
    ['LUXEMBURGO','LUXEMBURGO','LU','LUX','442','352'],
    ['MACAO','MACAO','MO','MAC','446','853'],
    ['MACEDONIA DEL NORTE','MACEDONIA DEL NORTE','MK','MKD','807','389'],
    ['MADAGASCAR','MADAGASCAR','MG','MDG','450','261'],
    ['MALASIA','MALASIA','MY','MYS','458','60'],
    ['MALAUI','MALAWI','MW','MWI','454','265'],
    ['MALDIVAS','MALDIVAS','MV','MDV','462','960'],
    ['MALÍ','MALÍ','ML','MLI','466','223'],
    ['MALTA','MALTA','MT','MLT','470','356'],
    ['MARRUECOS','MARRUECOS','MA','MAR','504','212'],
    ['MARTINICA','MARTINIQUE','MQ','MTQ','474','596'],
    ['MAURICIO','MAURICIO','MU','MUS','480','230'],
    ['MAURITANIA','MAURITANIA','MR','MRT','478','222'],
    ['MAYOTTE','MAYOTTE','YT','MYT','175','262'],
    ['MÉXICO','MÉXICO','MX','MEX','484','52'],
    ['MICRONESIA','MICRONESIA (ESTADOS FEDERADOS DE)','FM','FSM','583','691'],
    ['MOLDAVIA','MOLDOVA (LA REPÚBLICA DE)','MD','MDA','498','373'],
    ['MÓNACO','MÓNACO','MC','MCO','492','377'],
    ['MONGOLIA','MONGOLIA','MN','MNG','496','976'],
    ['MONTENEGRO','MONTENEGRO','ME','MNE','499','382'],
    ['MONTSERRAT','MONTSERRAT','MS','MSR','500','1 664'],
    ['MOZAMBIQUE','MOZAMBIQUE','MZ','MOZ','508','258'],
    ['BIRMANIA','MYANMAR','MM','MMR','104','95'],
    ['NAMIBIA','NAMIBIA','NA','NAM','516','264'],
    ['NAURU','NAURU','NR','NRU','520','674'],
    ['NEPAL','NEPAL','NP','NPL','524','977'],
    ['NICARAGUA','NICARAGUA','NI','NIC','558','505'],
    ['NÍGER','NÍGER (EL)','NE','NER','562','227'],
    ['NIGERIA','NIGERIA','NG','NGA','566','234'],
    ['NIUE','NIUE','NU','NIU','570','683'],
    ['ISLA NORFOLK','NORFOLK, ISLA','NF','NFK','574','672'],
    ['NORUEGA','NORUEGA','NO','NOR','578','47'],
    ['NUEVA CALEDONIA','NUEVA CALEDONIA','NC','NCL','540','687'],
    ['NUEVA ZELANDA','NUEVA ZELANDIA','NZ','NZL','554','64'],
    ['OMÁN','OMÁN','OM','OMN','512','968'],
    ['PAÍSES BAJOS','PAÍSES BAJOS (LOS)','NL','NLD','528','31'],
    ['PAKISTÁN','PAKISTÁN','PK','PAK','586','92'],
    ['PALAOS','PALAU','PW','PLW','585','680'],
    ['PALESTINA','PALESTINA, ESTADO DE','PS','PSE','275','970'],
    ['PANAMÁ','PANAMÁ','PA','PAN','591','507'],
    ['PAPÚA NUEVA GUINEA','PAPUA NUEVA GUINEA','PG','PNG','598','675'],
    ['PARAGUAY','PARAGUAY','PY','PRY','600','595'],
    ['PERÚ','PERÚ','PE','PER','604','51'],
    ['POLINESIA FRANCESA','POLINESIA FRANCESA','PF','PYF','258','689'],
    ['POLONIA','POLONIA','PL','POL','616','48'],
    ['PORTUGAL','PORTUGAL','PT','PRT','620','351'],
    ['PUERTO RICO','PUERTO RICO','PR','PRI','630','1'],
    ['REINO UNIDO','REINO UNIDO DE GRAN BRETAÑA E IRLANDA DEL NORTE (EL)','GB','GBR','826','44'],
    ['REPÚBLICA ÁRABE SAHARAUI DEMOCRÁTICA','SAHARA OCCIDENTAL','EH','ESH','732','212'],
    ['REPÚBLICA CENTROAFRICANA','REPÚBLICA CENTROAFRICANA (LA)','CF','CAF','140','236'],
    ['REPÚBLICA CHECA','CHEQUIA','CZ','CZE','203','420'],
    ['REPÚBLICA DEL CONGO','CONGO (EL)','CG','COG','178','242'],
    ['REPÚBLICA DEMOCRÁTICA DEL CONGO','CONGO (LA REPÚBLICA DEMOCRÁTICA DEL)','CD','COD','180','243'],
    ['REPÚBLICA DOMINICANA','DOMINICANA, (LA) REPÚBLICA','DO','DOM','214','1 809'],
    ['REUNIÓN','REUNIÓN','RE','REU','638','262'],
    ['RUANDA','RUANDA','RW','RWA','646','250'],
    ['RUMANIA','RUMANIA','RO','ROU','642','40'],
    ['RUSIA','RUSIA, (LA) FEDERACIÓN DE','RU','RUS','643','7'],
    ['SAMOA','SAMOA','WS','WSM','882','685'],
    ['SAMOA AMERICANA','SAMOA AMERICANA','AS','ASM','016','1 684'],
    ['SAN BARTOLOMÉ','SAINT BARTHÉLEMY','BL','BLM','652','590'],
    ['SAN CRISTÓBAL Y NIEVES','SAINT KITTS Y NEVIS','KN','KNA','659','1 869'],
    ['SAN MARINO','SAN MARINO','SM','SMR','674','378'],
    ['SAN MARTÍN - PARTE FRANCESA','SAINT MARTIN (PARTE FRANCESA)','MF','MAF','663','1 599'],
    ['SAN PEDRO Y MIQUELÓN','SAN PEDRO Y MIQUELÓN','PM','SPM','666','508'],
    ['SAN VICENTE Y LAS GRANADINAS','SAN VICENTE Y LAS GRANADINAS','VC','VCT','670','1 784'],
    ['SANTA ELENA, ASCENSIÓN Y TRISTÁN DE ACUÑA','SANTA HELENA, ASCENSIÓN Y TRISTÁN DE ACUÑA','SH','SHN','654','290'],
    ['SANTA LUCÍA','SANTA LUCÍA','LC','LCA','662','1 758'],
    ['SANTO TOMÉ Y PRÍNCIPE','SANTO TOMÉ Y PRÍNCIPE','ST','STP','678','239'],
    ['SENEGAL','SENEGAL','SN','SEN','686','221'],
    ['SERBIA','SERBIA','RS','SRB','688','381'],
    ['SEYCHELLES','SEYCHELLES','SC','SYC','690','248'],
    ['SIERRA LEONA','SIERRA LEONA','SL','SLE','694','232'],
    ['SINGAPUR','SINGAPUR','SG','SGP','702','65'],
    ['SAN MARTÍN','SINT MAARTEN (PARTE NEERLANDESA)','SX','SXM','534','1 721'],
    ['SIRIA','REPÚBLICA ÁRABE SIRIA','SY','SYR','760','963'],
    ['SOMALIA','SOMALIA','SO','SOM','706','252'],
    ['SRI LANKA','SRI LANKA','LK','LKA','144','94'],
    ['SUAZILANDIA','SUAZILANDIA','SZ','SWZ','748','268'],
    ['SUDÁFRICA','SUDÁFRICA','ZA','ZAF','710','27'],
    ['SUDÁN','SUDÁN (EL)','SD','SDN','729','249'],
    ['SUDÁN DEL SUR','SUDÁN DEL SUR','SS','SSD','728','211'],
    ['SUECIA','SUECIA','SE','SWE','752','46'],
    ['SUIZA','SUIZA','CH','CHE','756','41'],
    ['SURINAM','SURINAME','SR','SUR','740','597'],
    ['SVALBARD Y JAN MAYEN','SVALBARD Y JAN MAYEN','SJ','SJM','744','47'],
    ['TAILANDIA','TAILANDIA','TH','THA','764','66'],
    ['TAIWÁN (REPÚBLICA DE CHINA)','TAIWÁN (PROVINCIA DE CHINA)','TW','TWN','158','886'],
    ['TANZANIA','TANZANIA, REPÚBLICA UNIDA DE','TZ','TZA','834','255'],
    ['TAYIKISTÁN','TAYIKISTÁN','TJ','TJK','762','992'],
    ['TERRITORIO BRITÁNICO DEL OCÉANO ÍNDICO','TERRITORIO BRITÁNICO DEL OCÉANO ÍNDICO (EL)','IO','IOT','086','246'],
    ['TIERRAS AUSTRALES Y ANTÁRTICAS FRANCESAS','TIERRAS AUSTRALES FRANCESAS (LAS)','TF','ATF','260',''],
    ['TIMOR ORIENTAL','TIMOR-LESTE','TL','TLS','626','670'],
    ['TOGO','TOGO','TG','TGO','768','228'],
    ['TOKELAU','TOKELAU','TK','TKL','772','690'],
    ['TONGA','TONGA','TO','TON','776','676'],
    ['TRINIDAD Y TOBAGO','TRINIDAD Y TOBAGO','TT','TTO','780','1 868'],
    ['TÚNEZ','TÚNEZ','TN','TUN','788','216'],
    ['TURKMENISTÁN','TURKMENISTÁN','TM','TKM','795','993'],
    ['TURQUÍA','TURQUÍA','TR','TUR','792','90'],
    ['TUVALU','TUVALU','TV','TUV','798','688'],
    ['UCRANIA','UCRANIA','UA','UKR','804','380'],
    ['UGANDA','UGANDA','UG','UGA','800','256'],
    ['URUGUAY','URUGUAY','UY','URY','858','598'],
    ['UZBEKISTÁN','UZBEKISTÁN','UZ','UZB','860','998'],
    ['VANUATU','VANUATU','VU','VUT','548','678'],
    ['CIUDAD DEL VATICANO','SANTA SEDE (LA)','VA','VAT','336','39'],
    ['VENEZUELA','VENEZUELA (REPÚBLICA BOLIVARIANA DE)','VE','VEN','862','58'],
    ['VIETNAM','VIET NAM','VN','VNM','704','84'],
    ['WALLIS Y FUTUNA','WALLIS Y FUTUNA','WF','WLF','876','681'],
    ['YEMEN','YEMEN','YE','YEM','887','967'],
    ['YIBUTI','YIBUTI','DJ','DJI','262','253'],
    ['ZAMBIA','ZAMBIA','ZM','ZMB','894','260'],
    ['ZIMBABUE','ZIMBABUE','ZW','ZWE','716','263'],
  ];

  try {
    for (const item of arrCountry) {
      await Country.create({
        common_name: item[0],
        iso_name: item[1],
        code_alpha_2: item[2],
        code_alpha_3: item[3],
        numerical_code: item[4],
        phone_code: item[5],
      });
    }

    console.log(\`✅ Insertados \${arrCountry.length} países con éxito\`);
  } catch (error) {
    console.error('❌ Error al insertar países manuales:', error);
  }
}   
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }

}


const updateRoleSeeder = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'database', 'seeders', 'roles');
    
    // File
    const filePath = path.join(folderPath, 'roleSeeder.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { EnumRole } from '../../../enums/enumRole.js';
import Role from '../../../models/Role.js';


const seedRoles = async () => {
  const roles = [
    {
      id: EnumRole.ADMIN_ID,
      name: EnumRole.ADMIN,
      description: EnumRole.ADMIN_DESCRIPTION,
    },
    {
      id: EnumRole.MANAGER_ID,
      name: EnumRole.MANAGER,
      description: EnumRole.MANAGER_DESCRIPTION,
    },
    {
      id: EnumRole.USER_ID,
      name: EnumRole.USER,
      description: EnumRole.USER_DESCRIPTION,
    },
    {
      id: EnumRole.ERP_ID,
      name: EnumRole.ERP,
      description: EnumRole.ERP_DESCRIPTION,
    },
  ];

  for (const role of roles) {
    const exists = await Role.findOne({ where: { id: role.id } });

    if (!exists) {
      await Role.create(role);
      console.log(\`🟢 Rol "\${role.name}" creado\`);
    } else {
      console.log(\`⚠️ Rol "\${role.name}" ya existe\`);
    }
  }

  console.log('🌱 Roles insertados correctamente');
};


export default seedRoles;

`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}


const updateUserSeeder = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'database', 'seeders', 'users');
    
    // File
    const filePath = path.join(folderPath, 'userSeeder.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import RoleUser from "../../../models/RoleUser.js";
import { EnumRole } from "../../../enums/enumRole.js";
import { EnumUserStatus } from "../../../enums/enumUserStatuses.js";
import User from "../../../models/User.js";
import bcrypt from "bcryptjs";
import UserStatus from "../../../models/UserStatus.js";
import Role from "../../../models/Role.js";



const seedUsers = async () => {

  const salt = bcrypt.genSaltSync();

  const usersToCreate = [
    {
      name: 'Dorian',
      email: 'doriandarren1@gmail.com',
      password: '${process.env.PASSWORD_DEFAULT}',
      role: EnumRole.ADMIN,
      image_url: 'https://i.pravatar.cc/150?img=2'
    },
    {
      name: 'Milena',
      email: 'darimile@gmail.com',
      password: '${process.env.PASSWORD_DEFAULT}',
      role: EnumRole.ADMIN,
      image_url: 'https://i.pravatar.cc/150?img=1'
    },
    {
      name: 'Dilan',
      email: 'dilandarren@gmail.com',
      password: '${process.env.PASSWORD_DEFAULT}',
      role: EnumRole.ADMIN,
      image_url: 'https://i.pravatar.cc/150?img=3'
    },
    {
      name: 'Dariana',
      email: 'dorianadamiled@gmail.com',
      password: '${process.env.PASSWORD_DEFAULT}',
      role: EnumRole.ADMIN,
      image_url: 'https://i.pravatar.cc/150?img=4'
    },
    {
      name: 'Max',
      email: 'max16506@gmail.com',
      password: '${process.env.PASSWORD_DEFAULT}',
      role: EnumRole.ADMIN,
      image_url: 'https://i.pravatar.cc/150?img=5'
    },
    {
      name: 'Manager',
      email: 'manager@splytin.com',
      password: '${process.env.PASSWORD_DEFAULT}',
      role: EnumRole.MANAGER,
      image_url: 'https://i.pravatar.cc/150?img=6'
    },
    {
      name: 'User',
      email: 'user@splytin.com',
      password: '${process.env.PASSWORD_DEFAULT}',
      role: EnumRole.USER,
      image_url: 'https://i.pravatar.cc/150?img=7'
    }

  ];

  const userStatus = await UserStatus.findOne({ where: { name: EnumUserStatus.STATUS_ACTIVE_NAME } });

  if (!userStatus) {
    console.error('❌ Estado de usuario ACTIVO no encontrado');
    return;
  }

  for (const item of usersToCreate) {
    // Crear o encontrar usuario
    let user = await User.findOne({ where: { email: item.email } });

    if (!user) {
      user = await User.create({
        name: item.name,
        email: item.email,
        password: bcrypt.hashSync(item.password, salt),
        email_verified_at: new Date(),
        image_url: item.image_url,
        remember_token: null,
        user_status_id: userStatus.id,
      });
      console.log(\`🟢 Usuario "\${item.email}" creado\`);
    } else {
      console.log(\`⚠️ Usuario "\${item.email}" ya existe\`);
    }

    // Buscar rol
    const role = await Role.findOne({ where: { name: item.role.toLowerCase() } });

    if (!role) {
      console.warn(\`⚠️ Rol "\${item.role}" no existe\`);
      continue;
    }

    // Asignar rol si no lo tiene
    const hasRole = await RoleUser.findOne({
      where: { user_id: user.id, role_id: role.id }
    });

    if (!hasRole) {
      await RoleUser.create({ user_id: user.id, role_id: role.id });
      console.log(\`✅ Rol "\${item.role}" asignado a \${item.email}\`);
    } else {
      console.log(\`🔁 \${item.email} ya tiene el rol "\${item.role}"\`);
    }
  }

  console.log('🌱 Usuarios con roles insertados correctamente');

};


export default seedUsers;

`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}


const updateUserStatuses = async(fullPath) => {    

    // Folder
    const folderPath = path.join(fullPath, 'src', 'database', 'seeders', 'userStatuses');
    
    // File
    const filePath = path.join(folderPath, 'userStatusSeeder.js');

    // Asegurar que la carpeta exista
    createFolder(folderPath);


    // Code
    const code = `
import { EnumUserStatus } from '../../../enums/enumUserStatuses.js';
import UserStatus from '../../../models/UserStatus.js';


const seedUserStatus = async () => {
  const statuses = [
    {
      id: EnumUserStatus.STATUS_ACTIVE_ID,
      name: EnumUserStatus.STATUS_ACTIVE_NAME,
    },
    {
      id: EnumUserStatus.STATUS_INACTIVE_ID,
      name: EnumUserStatus.STATUS_INACTIVE_NAME,
    },
  ];

  for (const status of statuses) {
    const exists = await UserStatus.findOne({ where: { id: status.id } });

    if (!exists) {
      await UserStatus.create(status);
      console.log(\`🟢 Estado "\${status.name}" insertado\`);
    } else {
      console.log(\`⚠️ Estado "\${status.name}" ya existe\`);
    }
  }

  console.log('🌱 Estados de usuario insertados correctamente');
};


export default seedUserStatus;

`.trimStart();

    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);

}
