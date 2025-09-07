import fs from 'fs';
import path from 'path';

export const updateUserMigration = async (fullPath) => {
  const migrationsPath = path.join(fullPath, 'database', 'migrations');
  const files = fs.readdirSync(migrationsPath);

  let updated = false;

  const oldStart = `Schema::create('users', function (Blueprint $table) {\n            $table->id();`;
  const replacement = `Schema::create('user_statuses', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_status_id');
            $table->foreign('user_status_id')->references('id')->on('user_statuses')->onDelete("cascade");
            $table->string('image_url')->nullable();
            $table->timestamp('last_session')->nullable();`;

  for (const file of files) {
    const filePath = path.join(migrationsPath, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    if (content.includes(oldStart)) {
      const newContent = content.replace(oldStart, replacement);
      fs.writeFileSync(filePath, newContent);
      console.log(`✅ Bloque reemplazado correctamente en: ${filePath}`.green);
      updated = true;
      break;
    }
  }

  if (!updated) {
    console.warn(`⚠️ No se encontró el patrón a reemplazar en las migraciones.`);
  }
};
