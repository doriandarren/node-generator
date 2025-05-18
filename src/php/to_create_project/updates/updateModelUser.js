import fs from 'fs';
import path from 'path';




export const updateModelUser = async(fullPath) => {
    
    await updateUse(fullPath);
    await updateLastLine(fullPath);

}




const updateUse = async (fullPath) => {
  const userModelPath = path.join(fullPath, 'app', 'Models', 'User.php');

  // Verificar si el archivo existe
  if (!fs.existsSync(userModelPath)) {
    console.log(`❌ Error: ${userModelPath} no existe.`.cyan);
    return;
  }

  try {
    // Leer el contenido original del archivo
    let content = fs.readFileSync(userModelPath, 'utf-8');

    // Reemplazo de los 'use'
    content = content.replace(
      'use Illuminate\\Notifications\\Notifiable;',
      `use Illuminate\\Notifications\\Notifiable;
use App\\Models\\Abilities\\Ability;
use App\\Models\\AbilityUsers\\AbilityUser;
use App\\Models\\Roles\\Role;
use App\\Models\\RoleUsers\\RoleUser;
use App\\Models\\UserStatuses\\UserStatus;
use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Relations\\BelongsTo;
use Illuminate\\Database\\Eloquent\\Relations\\BelongsToMany;
use Laravel\\Sanctum\\HasApiTokens;`
    );

    // Reemplazo para agregar HasApiTokens al trait
    content = content.replace(
      'use HasFactory, Notifiable;',
      'use HasApiTokens, HasFactory, Notifiable;'
    );

    // Guardar el contenido actualizado
    fs.writeFileSync(userModelPath, content, 'utf-8');

    console.log('✅ use User Models actualizado correctamente.'.green);
  } catch (error) {
    console.error(`❌ Error al actualizar ${userModelPath}: ${error.message}`.cyan);
  }
}




const updateLastLine = async (fullPath) => {
  const userModelPath = path.join(fullPath, 'app', 'Models', 'User.php');

  if (!fs.existsSync(userModelPath)) {
    console.log(`❌ Error: ${userModelPath} no existe.`.cyan);
    return;
  }

  try {
    const lines = fs.readFileSync(userModelPath, 'utf-8').split('\n');

    const insertBlock = `
    
    /*********************
    * Relations
    ********************/
     
    /**
     * @return BelongsTo
     */
    public function status(): BelongsTo
    {
        return \$this->belongsTo(UserStatus::class, 'user_status_id', 'id');
    }

    /**
     * @return BelongsToMany
     */
    public function roles(): BelongsToMany
    {
        return \$this->belongsToMany(Role::class)->withTimestamps();
    }

    /**
     * @return BelongsToMany
     */
    public function abilities(): BelongsToMany
    {
        return \$this->belongsToMany(Ability::class)->withTimestamps();
    }

    /*********************
     * Method implements
     ********************/

    /**
     * @param \$ability
     * @return Model
     */
    public function allowTo(\$ability): Model
    {
        \$abilityDuplicated = AbilityUser::where('user_id', \$this->id)
            ->where('ability_id', \$ability->id)
            ->first();

        if (\$abilityDuplicated) {
            return \$abilityDuplicated;
        }

        return \$this->abilities()->save(\$ability);
    }

    /**
     * @param \$role
     * @return Model
     */
    public function assignRole(\$role): Model
    {
        \$roleDuplicated = RoleUser::where('user_id', \$this->id)
            ->where('role_id', \$role->id)
            ->first();

        if (\$roleDuplicated) {
            return \$roleDuplicated;
        }

        return \$this->roles()->save(\$role);
    }
`.trimEnd();

    // Buscar la última línea que contiene solo '}'
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].trim() === '}') {
        lines.splice(i, 0, insertBlock);
        break;
      }
    }

    fs.writeFileSync(userModelPath, lines.join('\n'), 'utf-8');
    console.log('✅ Contenido insertado justo antes del cierre final de la clase.'.green);
  } catch (error) {
    console.error(`❌ Error al actualizar ${userModelPath}: ${error.message}`.cyan);
  }
}