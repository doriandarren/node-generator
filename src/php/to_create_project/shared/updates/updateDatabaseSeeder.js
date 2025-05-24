import fs from "fs";
import path from "path";

export const updateDatabaseSeeder = async (fullPath) => {
  
  
    const filePath = path.join(
    fullPath,
    "database",
    "seeders",
    "DatabaseSeeder.php"
  );

  try {
    await fs.promises.access(filePath);
  } catch {
    console.log(`❌ Error: ${filePath} no existe.`.cyan);
    return;
  }

  try {
    let content = await fs.promises.readFile(filePath, "utf-8");

    const lines = content.split("\n");
    const startIndex = lines.findIndex((line) =>
      line.includes("public function run(): void")
    );

    if (startIndex === -1) {
      console.log(
        `⚠️ No se encontró 'public function run(): void' en ${filePath}`.yellow
      );
      return;
    }

    // Contenido nuevo que reemplazará todo desde esa línea hasta el final
    const replacement = `    public function run(): void
    {
        \$this->call([
            CountrySeeder::class,
            UserStatusSeeder::class,
            RoleSeeder::class,
            AbilitySeeder::class,
            UserRolesAbilitiesSeeder::class,
        ]);
    }
}`;

    // Cortamos el archivo hasta la línea anterior al `run()` y agregamos el reemplazo
    const newContent = [...lines.slice(0, startIndex), replacement].join("\n");

    await fs.promises.writeFile(filePath, newContent, "utf-8");
    console.log("✅ DatabaseSeeder.php actualizado correctamente.".green);
  } catch (error) {
    console.error(`❌ Error al actualizar ${filePath}: ${error.message}`.cyan);
  }
};
