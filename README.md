# Gestor de Tarjetas de Crédito

Este proyecto es un gestor de tarjetas de crédito desarrollado durante la pasantía en la Fiscalía de Estado y la Facultad de Informática de la UNLP. El proyecto está dividido en dos partes: el frontend desarrollado con Angular y el backend desarrollado con .NET.

## Descripción

El Gestor de Tarjetas de Crédito permite a los usuarios agregar, validar y gestionar tarjetas de crédito. La aplicación valida que los datos ingresados sean correctos antes de guardarlos en una lista.

## Tecnologías Utilizadas

### Frontend

- **Framework**: Angular
- **Lenguaje**: TypeScript
- **Estilos**: CSS, Bootstrap
- **Plantillas**: HTML

### Backend

- **Framework**: .NET
- **Lenguaje**: C#
- **Base de Datos**: SQL Server

El backend utiliza SQL Server para el almacenamiento de la información de las tarjetas de crédito.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- Node.js
- Angular CLI
- .NET SDK
- SQL Server

## Instalación

### Clonar el Repositorio

```sh
git clone https://github.com/tu-usuario/gestor-tarjetas-credito.git
cd gestor-tarjetas-credito
```

### Configuración del Frontend

1. Navega al directorio del Front-End: ` cd FETarjetaDeCredito  `
2. Instala las dependencias: `npm install`
3. Inicia la aplicacion Angular: `npm start`

### Configuración del Backend

1. Navega al directorio del backend: `cd BETarjetaDeCredito`
2. Restaura las dependencias de .NET: `dotnet restore`
3. Inicia la aplicación .NET: `dotnet run`

## Uso

1. Abre tu navegador y navega a http://localhost:[codigo indicado por la terminal] para acceder a la aplicación frontend.
2. Utiliza la interfaz para agregar, validar y gestionar tarjetas de crédito.

## Estructura del Proyecto

* **FETarjetaDeCredito/**: Contiene el código del frontend desarrollado con Angular.
* **BETarjetaDeCredito/**: Contiene el código del backend desarrollado con .NET.