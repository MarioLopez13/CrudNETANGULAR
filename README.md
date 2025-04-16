

# CRUD de Empleados (.NET + Angular)

Este proyecto es una aplicación CRUD (Crear, Leer, Actualizar, Eliminar) de empleados, desarrollada con un backend en ASP.NET Core y un frontend en Angular.
Para ejecutar el angular ng serve --open

## 🧩 Estructura del Proyecto

El proyecto se divide 2 dos ramas 1 donde esta el .net y otra rama donde esta angular

- **Backend (.NET)**: Proporciona una API REST para gestionar empleados, utilizando Entity Framework para acceso a base de datos.
- **Frontend (Angular)**: Interfaz de usuario que consume la API y permite al usuario interactuar con el sistema de empleados.

## 🚀 Funcionalidades

- Crear nuevo empleado
- Listar empleados existentes
- Editar información de un empleado
- Eliminar un empleado

## 🗂️ Ramas del Repositorio

Para mantener el orden del desarrollo, se han creado dos ramas principales:

- `net-backend` → Contiene el proyecto de ASP.NET Core.
- `angular-frontend` → Contiene el proyecto de Angular.

## 🛠️ Tecnologías Utilizadas

- **Backend**:
  - ASP.NET Core
  - Entity Framework Core
  - SQL Server

- **Frontend**:
  - Angular
  - Angular Material

## 📝 Notas

- Asegúrate de levantar primero el backend antes de iniciar el frontend.
- El frontend debe apuntar a la URL base del backend en el servicio `empleado.service.ts`.
