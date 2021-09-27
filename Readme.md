## ﻿ Pokemon-API (Equipo 18)

Proyecto web para la creación de una API REST  que debe ofrecernos la posibilidad de crear, consultar, actualizar y eliminar registros de una base de datos basada en la primera generación de Pokémon.

En este proyecto contamos con 2 tipos de usuarios, viewer y administrador, donde:

 - **Viewer** (solo lectura): Puede realizar consultas de todo tipo, pero no puede hacer modificaciones, inserciones ni eliminaciones.
 - **Administrator**(Escritura y lectura): Puede realizar todas las consultas, además de insertar nuevos registros, así como modificaciones o eliminación de registros existentes.

### Estructura del proyecto

El proyecto se realizó utilizando el patrón MVC.

Así mismo se contará con 4 entidades: Pokémon, Generación, Tipo y Clasificación, cada una con características individuales.

 - **Pokémon**: Número de pokédex, nombre, url de imagen, generación, tipo, clasificación y habilidades.
 - **Clasificación**: Número y nombre.
 - **Tipo**: Número, nombre y url de imagen.
 - **Categoría**: Número y nombre.

Todas las entidades tienen funciones CRUD: Consultas, inserciones, modificaciones y eliminación de registros.
#### Historias de usuario y Diagramas de caso de uso:
- [Historias de Usuario](https://github.com/AbregoDev/pokemon-API/blob/main/Historias%20de%20usuario.md)
- [Diagramas de Caso de uso](https://miro.com/app/board/o9J_lzbh7-k=/)
 
### Descripción técnica 
#### Prerrequisitos

Se requiere [Node.js](https://nodejs.org/) LTS junto con tu administrador de paquetes preferido por ejemplo [NPM](https://npmjs.org/), [Yarn](https://yarnpkg.com/), etc.
#### Instalación
###### Nota: Este ejemplo es utilizando NPM
Clona el repositorio y ejecuta el siguiente comando en tu terminal sobre la ruta donde este fue clonado.

    npm install
Esto instalará las paqueterías necesarias para que funcione la aplicación.
Asegúrate de tener instalado nodemon con el comando.

    nodemon -v
 Si el resultado es un número de versión está todo correcto, si no ejecuta el siguiente comando.
 

    npm install -g nodemon
Cuando termine y estés listo para colaborar puedes iniciar un servidor local utilizando el script.

    npm run dev
#### Happy coding!!!

### Enlaces de entrega
#### [Swagger](https://app.swaggerhub.com/apis-docs/pepetellez/pokemon-API/)

#### [API](https://pokemon-bedu.herokuapp.com/v1)

#### [Vídeo]() 

### Colaboradores:
> - [Ernesto Velasco Valdez](https://github.com/Ernestve)
> - [José Antonio Aguilar Téllez](https://github.com/pepetellez)
> - [María Fernanda Cota Pérez](https://github.com/mafer13cp)
> - [Bryan Daniel Moreno Abrego](https://github.com/AbregoDev)
> - [Juan Enrique Hernández Martínez](https://github.com/EnriqueHM)

