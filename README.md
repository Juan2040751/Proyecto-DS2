# Proyecto Desarrollo de Software II

------------

# Integrantes
- Juan Jose Viafara - 2040751
- Johan Sebastian Tombe - 2110051 
- William Velasco - 2042577
- César Alejandro Grijalba Zúñiga - 2110035

# Descripción 
Software que permite realizar seguimiento al proceso de contabilidad de un comercio u organización, este aplicativo ofrece herramientas que permitan automatizar las tareas contables, tales como: gestión de ventas, seguimiento de facturas,  seguimiento de inventario e informes financieros.
El software cuenta con una interfaz intuitiva y fácil de utilizar, la cuál permitirá al usuario (vendedor) realizar un trabajo con mayor rapidez y eficacia.

# Despliegue
El aplicativo se encuentra desplegado en el siguiente enlace:  https://proyecto-ds-2.vercel.app/

# Desarrollo

## Pipeline
En el siguiente diagrama se puede ver representado el proceso de implementación del código de nuestro aplicativo web. El proceso comienza con nosotros como desarrolladores comprometidos con el código, luego se muestra nuestro gestor de versiones y servidor de automatización. El código luego pasa por compilación, pruebas unitarias, pruebas y análisis de código, despliegue y servicio de almacenamiento. Tambien se puede apreciar que cada una de estas estapas está conectada a Microsoft Teams con el fin de que todo el equipo de trabajo sea notificado por este medio cuando se realice cualquier cambio u avance en el proyecto.

![](https://bit.ly/3Xkef5a)


## Construcción 

Tecnologías usadas en el proyecto:
- React Native
- Postgress
- Django

## DevOps

Tecnologías utilizadas para la ejecución del trabajo en equipo:

### Docker Compose
Se utilizó Docker Compose para la creación de tres contenedores o servicios: 
- **turbo_db:**  en esta se utilizó la imagen "postgres:15-alpine" con la cual  se creó un contenedor de la base de datos PostgreSQL.
- **turbo_frontend:** esta se construyo a partir de un Dockerfile ubicado en el directorio *frontend* de manera que este directorio quedara montado en este contenedor.
- **turbo_backend:** esta se construyo a partir de un Dockerfile ubicado en el directorio *backend*  de manera que este directorio quedara montado en este contenedor.

Aquí podemos observar el código utilizado para esta configuración, aquí mismo se podrán apreciar los puertos que se utilizan en cada contenedor y a la vez algunas variables de entorno:

```
version: "3.9"


services:
  turbo_db:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_PASSWORD: ${DB_PASSWORD}

    volumes:
      - ./data/db:/var/lib/postgresql/data
  turbo_frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "5173:5173"
    restart: always
    volumes:
      - ./frontend:/app
    depends_on:
      - turbo_backend


  turbo_backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    restart: always
    depends_on:
      - turbo_db
    environment:
      DB_NAME: ${DB_NAME}
      DB_HOST: ${DB_HOST}
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
      DB_PORT: ${DB_PORT}
    ports:
      - "8000:8000"
```

### GitHub
Se utilizó GitHub como sistema de control de versiones y almacenamiento del codigo fuente.

### Jira
Se utilizó Jira como herramienta de gestión del proyecto pues era la herramienta ideal para el desarrollo de un proyecto agíl.

### Microsoft Teams y Datadog
Se utilizarón estos dos sistemas para gestionar las notificaciones y monitoriar el proyecto. Con la ayuda de Microsoft Teams se desarrolo todo lo relacionado con comunicación y colaboración en equipo, es decir, los chats, videollamadas y notificaciones, esta misma se conectó con GitHub Actions de manera que cada acción se notificará a todos los colaboradores del proyecto. Por otro lado, Datadog como herramienta de monitoreo nos ayudó a detectar y solucionar errores en tiempo real.


### GitHub Actions
Se utilizó GitHub Actions como plataforma de integración y entrega continua (CI/CD), se programó que con cada ***push*** que se realizara en las ramas pruebas o main, la plataforma realizaria los siguientes test:

```
name: App

on:
  push:
    branches:
      - pruebas
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        folder: ./frontend
        node-version: 18
		
    - name: Create container
      run: docker build -t frontend frontend
```

### Jest
Para las pruebas se hizo uso del framework Jest 

###  SonarCloud
Utilizamos SonarCloud como herramienta de analisis estatico de código con la idea de mejorar el código buscando esos problemas de calidad, vulnerabilidades de seguridad y duplicaciones de código las cuales podían no presentar unas buenas practicas de programación, se integró con nuestro flujo de trabajo de integración continua (CI) y sistemas de control de versiones Git, es decir, que se configuró de manera que realizara analisis automáticos en cada confirmación de codigo.

### Vercel
Se utilizó esta plataforma para lograr realizar el aloje y el despliegue del aplicativo web, esta plataforma nos brindó la funcionalidad de conectar nuestro repositorio, en nuestro caso, GitHub y poder realizar despliegues continuos y automaticos cada vez que se realizara un ***push*** en nuestro repositorio.
