import fs from "fs";
import path from "path";
import { createFolder } from "../../../helpers/helperFile.js";
import { addHeaderLine, addModuleImport } from "../helpers/helperFileWrite.js";

export const generateSeeder = async (fullPath) => {
  await updateFileAppModule(fullPath);
  await createController(fullPath);
  await createModule(fullPath);
  await createService(fullPath);
  await createData(fullPath);
};

const updateFileAppModule = async (fullPath) => {
    // Update header Import
  let filePath = path.join(fullPath, "src", "app.module.ts");
  addHeaderLine(filePath, `import { SeedModule } from './seed/seed.module';`);

  // Update into Module Imports
  filePath = path.join(fullPath, "src", "app.module.ts");
  addModuleImport(filePath, `SeedModule,`);

};

const createController = async (fullPath) => {
  // Folder
  const folderPath = path.join(fullPath, "src", "seed");

  // File
  const filePath = path.join(folderPath, "seed.controller.ts");

  // Asegurar que la carpeta exista
  createFolder(folderPath);

  // Code
  const code = `import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  execute() {
    return this.seedService.runSeed();
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

const createModule = async (fullPath) => {
  // Folder
  const folderPath = path.join(fullPath, "src", "seed");

  // File
  const filePath = path.join(folderPath, "seed.module.ts");

  // Asegurar que la carpeta exista
  createFolder(folderPath);

  // Code
  const code = `import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
//import { ProductsModule } from './../products/products.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  //imports: [ProductsModule]
})
export class SeedModule {}
    
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }
};

const createService = async (fullPath) => {
  // Folder
  const folderPath = path.join(fullPath, "src", "seed");

  // File
  const filePath = path.join(folderPath, "seed.service.ts");

  // Asegurar que la carpeta exista
  createFolder(folderPath);

  // Code
  const code = `import { Injectable } from '@nestjs/common';
// import { ProductsService } from 'src/products/products.service';
// import { initialData } from './data/seed-product';

@Injectable()
export class SeedService {

  constructor(
    // private readonly productsService: ProductsService,
  ){}
  
  async runSeed() {
    // await this.deleteProducts();

    // await this.insertProducts();


    return 'Seed exe';
  }


  // private async deleteProducts(){
  //   await this.productsService.deleteAllProducts();
  //   return true; 
  // }

  // private async insertProducts(){
  //   const products = initialData.products;
  //   const insertPromise: Promise<any>[] = [];
  //   products.forEach( product => {
  //     insertPromise.push(this.productsService.create(product));
  //   })
  //   await Promise.all(insertPromise);
  //   return true;
  // }

}   
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }
};

const createData = async (fullPath) => {
  // Folder
  const folderPath = path.join(fullPath, "src", "seed", "data");

  // File
  const filePath = path.join(folderPath, "seed-product.ts");

  // Asegurar que la carpeta exista
  createFolder(folderPath);

  // Code
  const code = `interface SeedProduct {
    description: string;
    images: string[];
    stock: number;
    price: number;
    sizes: ValidSizes[];
    slug: string;
    tags: string[];
    title: string;
    type: ValidTypes;
    gender: 'men'|'women'|'kid'|'unisex'
}

type ValidSizes = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
type ValidTypes = 'shirts'|'pants'|'hoodies'|'hats';


interface SeedData {
    products: SeedProduct[];
}


export const initialData: SeedData = {
    products: [
        {
            description: "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
            images: [
                '1740176-00-A_0_2000.jpg',
                '1740176-00-A_1.jpg',
            ],
            stock: 7,
            price: 75,
            sizes: ['XS','S','M','L','XL','XXL'],
            slug: "mens_chill_crew_neck_sweatshirt",
            type: 'shirts',
            tags: ['sweatshirt'],
            title: "Men’s Chill Crew Neck Sweatshirt",
            gender: 'men'
        },
        {
            description: "The Men's Quilted Shirt Jacket features a uniquely fit, quilted design for warmth and mobility in cold weather seasons. With an overall street-smart aesthetic, the jacket features subtle silicone injected Tesla logos below the back collar and on the right sleeve, as well as custom matte metal zipper pulls. Made from 87% nylon and 13% polyurethane.",
            images: [
                '1740507-00-A_0_2000.jpg',
                '1740507-00-A_1.jpg',
            ],
            stock: 5,
            price: 200,
            sizes: ['XS','S','M','XL','XXL'],
            slug: "men_quilted_shirt_jacket",
            type: 'shirts',
            tags: ['jacket'],
            title: "Men's Quilted Shirt Jacket",
            gender: 'men'
        },
        
        {
            description: "Introducing the Tesla Raven Collection. The Men's Raven Lightweight Zip Up Bomber has a premium, modern silhouette made from a sustainable bamboo cotton blend for versatility in any season. The hoodie features subtle thermoplastic polyurethane Tesla logos on the left chest and below the back collar, a concealed chest pocket with custom matte zipper pulls and a french terry interior. Made from 70% bamboo and 30% cotton.",
            images: [
                '1740250-00-A_0_2000.jpg',
                '1740250-00-A_1.jpg'
            ],
            stock: 10,
            price: 130,
            sizes: ['S','M','L','XL','XXL'],
            slug: "men_raven_lightweight_zip_up_bomber_jacket",
            type: 'shirts',
            tags: ['shirt'],
            title: "Men's Raven Lightweight Zip Up Bomber Jacket",
            gender: 'men'
        },

        {
            description: "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Men's Turbine Long Sleeve Tee features a subtle, water-based T logo on the left chest and our Tesla wordmark below the back collar. The lightweight material is double-dyed, creating a soft, casual style for ideal wear in any season. Made from 50% cotton and 50% polyester.",
            images: [
                '1740280-00-A_0_2000.jpg',
                '1740280-00-A_1.jpg',
            ],
            stock: 50,
            price: 45,
            sizes: ['XS','S','M','L'],
            slug: "men_turbine_long_sleeve_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Men's Turbine Long Sleeve Tee",
            gender: 'men'
        },
        {
            description: "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Men's Turbine Short Sleeve Tee features a subtle, water-based Tesla wordmark across the chest and our T logo below the back collar. The lightweight material is double-dyed, creating a soft, casual style for ideal wear in any season. Made from 50% cotton and 50% polyester.",
            images: [
                '1741416-00-A_0_2000.jpg',
                '1741416-00-A_1.jpg',
            ],
            stock: 50,
            price: 40,
            sizes: ['M','L','XL','XXL'],
            slug: "men_turbine_short_sleeve_tee",
            type: 'shirts',
            tags: ['shirt'],
            title: "Men's Turbine Short Sleeve Tee",
            gender: 'men'
        },
    ]
}   
`.trimStart();

  try {
    fs.writeFileSync(filePath, code);
    console.log(`✅ Archivo creado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al crear archivo: ${error.message}`);
  }
};
