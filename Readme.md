## Pokemon-API (Equipo18)
Proyecto web para la creación de una API REST  que debe ofrecernos la posibilidad de crear, consultar, actualizar y eliminar registros de una base de datos basada en la primera generación de Pokemon.
### Estructura del proyecto  

 1. Para esta sección se deben incluir historias de usuario y Diagramas de Caso de uso para complementar la descripción.
 
En este proyecto contamos con 2 tipos de usuarios viewer y administrator, donde:

 - **Viewer** (solo lectura): Puede realizar consultas de todo tipo, pero no puede hacer modificaciones, inserciones ni eliminaciones.
 - **Administrator**(Escritura y lectura): Puede realizar todas las consultas, además de insertar nuevos registros, así como modificaciones o eliminación de registros existentes.

Así mismo se contará con 4 entidades como pokémon, generación, tipo y categoría, cada una con características individuales.

 - **Pokémon**: Número de podédex, nombre, url imagen, generación, tipo, categoría y debilidades
 - **Generación**: Número y nombre.
 - **Tipo**: Nombre y url imagen.
 - **Categoría**: Nombre

Todas las entidades tienen funciones CRUD: Consultas, inserciones, modificaciones y eliminación de registros.
#### Historias de usuario y Diagramas de caso de uso
- [Historias de Usuario](https://github.com/AbregoDev/pokemon-API/blob/main/Historias%20de%20usuario.md)
- Diagramas de Caso de uso
 
### Descripción técnica 
#### Prerrequisitos

Se recomienda tener [Node.js](https://nodejs.org/) LTS instalado y funcionando correctamente junto con tu administrador de paquetes preferido por ejemplo [NPM](https://npmjs.org/), [Yarn](https://yarnpkg.com/), etc.
#### Instalación
###### Nota: Este ejemplo es utilizando NPM
Clona el repositorio y ejecuta el siguiente comando en tu terminal sobre la ruta donde este fue clonado.

    npm install
Esto instalara las paqueterías necesarias para que funcione la aplicación.
Asegúrate de tener instalado nodemon con el comando.

    nodemon -v
 Si el resultado es un numero de version esta todo correcto, si no ejecuta el siguiente comando.
 

    npm install -g nodemon
Cuando termine y estés listo para colaborar puedes iniciar un servidor local utilizando el script.

    npm run dev
#### Happy coding!!!
### Colaboradores:
> - Ernesto Velasco Valdez
> - José Antonio Aguilar Téllez
> - María Fernanda Cota Pérez
> - Bryan Daniel Moreno Abrego
> - Juan Enrique Hernández Martínez





