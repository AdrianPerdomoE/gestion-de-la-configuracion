# PymeYa
El proyecto "PymeYa" se trata de un aplicativo web que se desarrolló con el fin de proporcionar soporte a las pequeñas y medianas empresas, más conocidas como Pymes, en labores como la gestión y promoción de productos, y así brindar mayor visibilidad al público e impulsar el desarrollo de estos negocios emergentes.

El proyecto se divide en dos partes:
* **Backend**: Se encarga de las responsabilidades lógicas, de negocio, de procesamiento de peticiones y respuestas a un cliente. En pocas palabras, es el cerebro de la aplicación. Está desarrollado en el lenguaje de programación **JavaScript** y usando el framework **ExpressJS**. Se usa una base de datos no relacional **MongoDB** que está en la nube, y la conexión ya está integrada al backend.
* **Frontend**: Es la parte visible para el usuario, y, por lo tanto, se encarga de brindar una experiencia de usuario agradable al enviar, recibir y mostrar los datos involucrados en las peticiones enviadas al backend. Se desarrolló en el lenguaje de programación **TypeScript**, y se usó el framework **Angular**.


## Instalación y ejecución en un entorno local
Se recomienda usar un dispositivo con sistema operativo Windows (preferiblemente la versión 10 u 11 para evitar problemas de compatibilidad) y un espacio de aproximadamente 1GB para alojar el proyecto.

### Requisitos
* Git ([descargar última versión](https://git-scm.com/downloads))
* NodeJS ([descargar última versión](https://nodejs.org/es))
* Node Package Manager (NPM) - incluido en la instalación de NodeJS
  
### Pasos a seguir

1. **Abrir la consola de comandos de Windows**: Esto puedes hacerlo buscando el programa `CMD`, `Símbolo del sistema`, `Windows Terminal` o `Command Prompt`, dependiendo del idioma o la versión de Windows. También se puede abrir fácilmente presionando la tecla `Windows + R`, escribir `cmd` en el cuadro de texto y dar click en **Aceptar**. Esto abrerá una terminal de Windows donde podrás usar los comandos necesarios para clonar, instalar y ejecutar el proyecto. Recuerda que por lo general, al abrir la terminal de esta manera, se ubicará en la ruta del usuario de la sesión que tengas activa en Windows (por ejemplo `C:\Users\alejo`).

2. **Verificar la instalación de Git**: Deberás verificar si Git se instaló correctamente en tu sistema. Para esto, puedes escribir en la terminal el comando `git --version`. Si se instaló correctamente, te aparecerá un mensaje que dice `git version <VersiónDeGit>`. Si te aparece un mensaje diciendo que no se reconoció el comando, deberás verificar la instalación de Git antes de continuar con el siguiente paso. En la sección de requisitos está el enlace para instalarlo desde el sitio oficial.

3. **Clonar el repositorio**: Con la terminal abierta y Git instalado, ya podrías clonar el repositorio remoto. Primero, asegúrate que la ruta donde está la terminal sea la ruta donde quieres que se clone el repositorio. Si por ejemplo está en la ruta `C:\Users\alejo`, el repositorio se clonará en la ruta `C:\Users\alejo\gestion-de-la-configuracion`. Para ver los directorios disponibles en la ruta donde está la terminal, puedes usar el comando `dir`. Con el comando `cd <NombreDeLaCarpeta>` podrás entrar a una carpeta que esté en el directorio actual donde está la terminal. Para salir de una carpeta y volver al directorio que la contiene, puedes usar `cd ..`. Ya estando en el directorio donde quieres que se clone el repositorio, usa el siguiente comando:

```sh
git clone -b adrian_david_perdomo_echeverri-alejandro_cordoba_rios https://github.com/AdrianPerdomoE/gestion-de-la-configuracion.git
```

4. **Verificar la instalación de NodeJS y NPM**: Al tener clonado el repositorio y antes de ejecutar los proyectos, se necesita verificar si NodeJS y NPM se instalaron correctamente. Para ello, usa el comando `node --version` y `npm --version`. Si al ejecutar dichos comandos te aparece la versión y no un mensaje de error, podrás continuar al siguiente paso. De lo contrario, deberás verificar si la instalación de estos recursos fue correcta. Al instalar NodeJS desde el sitio web indicado en la sección de requisitos, se incluirá NPM en la misma instalación.

5. **Instalar las dependencias para el backend**: Después del proceso anterior, tu repositorio se habrá clonado en el mismo directorio donde se ejecutó dicho comando, así que tendrás que usar el comando `cd gestion-de-la-configuracion` para entrar al repositorio clonado en tu equipo. Luego, tendrás que ubicarte en el directorio donde está el backend usando `cd backend`. Antes de ejecutar el comando que lanzará el backend, deberás instalar las dependencias necesarias para que todo funcione correctamente, ejecutando el comando `npm install`. Si no te apareció ningún error crítico, podrás continuar al siguiente paso. Si hubo un error al instalar alguna librería, deberás volver a ejecutar el mismo comando, pero antes deberás borrar la carpeta `node_modules` que se creó el el directorio del backend, y así asegurarte de que no vuelva a fallar el comando.

6. **Ejecutar el backend**: Ahora, en la misma terminal de comandos y estando en el directorio del backend, procede a ejecutar el comando `npm start` (esto realmente ejecutará el comando `nodemon index.js`). Si te aparece un mensaje satisfactorio de que el servidor está ejecutándose en `localhost:3700`, ¡hurra, ya tienes el backend listo! Puedes usar aplicativos como Postman u otro recurso para usar APIs para comunicarte con el servidor. Sin embargo, esto no es necesario ni recomendable para usar la App, así que en el siguiente paso continuaremos con el frontend. En caso de algún error al ejecutar el comando, deberás asegurarte que el puerto `3700` no está siendo usado por otro recurso del sistema.

7. **Abrir una nueva consola de comandos**: Sin cerrar la consola que tiene en ejecución el backend, deberás abrir otra consola de comandos de Windows, de la misma forma que se explica en el paso 1. Luego, deberás usar los comandos `dir`, `cd <NombreDeLaCarpeta>` o `cd ..` para ubicarte en la carpeta donde está el repositorio clonado. Asegúrate de que la consola quede ubicada en `...\gestion-de-la-configuracion`.

8. **Instalar las dependencias para el frontend**: Tendrás que ubicarte en el directorio donde está el frontend usando `cd frontend`. Antes de ejecutar el comando que lanzará el frontend, deberás instalar las dependencias necesarias para que todo funcione correctamente, ejecutando el comando `npm install`. Si no te apareció ningún error crítico, podrás continuar al siguiente paso. Si hubo un error al instalar alguna librería, deberás volver a ejecutar el mismo comando, pero antes deberás borrar la carpeta `node_modules` que se creó el el directorio del frontend, y así asegurarte de que no vuelva a fallar el comando.

9. **Ejecutar el frontend**: Ahora, en la misma terminal de comandos y estando en el directorio del frontend, procede a ejecutar el comando `npm start` (esto realmente ejecutará el comando `ng serve` - si usas directamente `ng serve -o`, podrás ejecutar el frontend y abrirlo automáticamente en el navegador predeterminado del sistema). Si te aparece un mensaje satisfactorio de que el servidor está ejecutándose en `localhost:4200`, ya puedes usar un navegador web para usar la aplicación web usando la ruta `http://localhost:4200/`. En caso de algún error al ejecutar el comando, deberás asegurarte que el puerto `4200` no está siendo usado por otro recurso del sistema.
