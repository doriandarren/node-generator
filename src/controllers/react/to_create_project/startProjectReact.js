import { readInput } from "../../../helpers/inquirer.js";
import { generateImages } from "./generate_images/generateImages.js";
import { generatePublicHeader } from "./generatePublicHeader.js";
import { generateReactCommandLine } from "./generateReactCommandLine.js";
import { generateStyle } from "./generateStyles.js";



export const startProjectReact = async() => {
    
    // Ruta predeterminada
    const defaultPath = "/Users/dorian/ReactProjects";

    const projectName = await readInput("Nombre del proyecto: ");
    let projectPath = await readInput(`Ruta para crear el proyecto (por defecto: ${defaultPath}): `, true);

    // Si no se introduce una ruta, usar la predeterminada
    if( !projectPath){
        projectPath = defaultPath;
    }
    
    // Combinar la ruta y el nombre del proyecto
    const fullPath = `${projectPath}/${projectName}`;

    //
    await generateReactCommandLine(fullPath);
    await generateStyle(fullPath);
    await generateImages(fullPath);


    // 
    await generatePublicHeader(fullPath);




    // TODO haciendo
    await generatePrivateLayouts(full_path)


    ## generate Public
    generate_module_public(full_path)

    ## React Router
    generate_react_router(full_path)

    generate_components(full_path)

    # Dashboard
    generate_module_dashboard(full_path)

    # Auth
    generate_module_auth(full_path)

    ## Profile
    generate_module_profile(full_path)

    # Teams
    generate_module_teams(full_path)

    # Redux
    generate_redux(full_path)

    # Helpers
    generate_helpers(full_path)

    # Translate
    generate_translate(full_path)

    generate_env(full_path)

    generate_gitignore(full_path)

    generate_readme(full_path)

    ## index.html
    generate_index_html(full_path)

    generate_folder_api(full_path)



}