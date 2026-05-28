# Frontend EV2 Innovatech 🖥️

Este repositorio contiene la capa de presentación (Frontend) para el sistema de logística y ventas de **ITPCARGO**. Desarrollado como una Single Page Application (SPA), este dashboard permite a los administradores gestionar las órdenes de compra y coordinar la asignación de despachos de manera centralizada.

## 🏗️ Arquitectura y Tecnologías
La aplicación está diseñada para ser rápida, responsiva y fácil de desplegar, basada en una arquitectura moderna:
* **Frontend:** React.js.
* **Servidor Web:** Nginx (actuando como servidor de archivos estáticos de alto rendimiento).
* **Contenedorización:** Docker con un enfoque *multi-stage build* para minimizar drásticamente el tamaño de la imagen final de producción y mejorar la seguridad.
* **Integración:** Comunicación mediante peticiones HTTP hacia los microservicios independientes de Backend (Ventas y Despachos) alojados en AWS.

## 🚀 Automatización CI/CD
El ciclo de vida del despliegue está automatizado mediante **GitHub Actions** (`deploy.yml`).
1. **Trigger:** El flujo se ejecuta automáticamente al realizar un `push` sobre la rama de integración `deploy` (o `main`).
2. **Build:** Se instala el entorno de Node.js, se compila el código fuente de React para producción y se empaqueta dentro de una imagen limpia de Nginx.
3. **Deploy:** Se ejecutan las instrucciones en la instancia pública de AWS EC2 para descargar la última versión y reiniciar el contenedor, aplicando los cambios en el sitio en vivo.

## 🔐 Configuración y Seguridad
* **Gestión de Entornos:** Las conexiones hacia las IPs o dominios de los microservicios (Ventas y Despachos) se configuran como variables de entorno, permitiendo separar fácilmente el entorno local del de producción en AWS.
* **Secrets:** Las credenciales y claves de acceso para conectarse al servidor de despliegue están protegidas utilizando *GitHub Repository Secrets*.
* **CORS:** El Frontend asume que los microservicios tienen habilitado el Cross-Origin Resource Sharing para su IP/Dominio específico.

## 🛠️ Ejecución Local

### Requisitos Previos
* Docker instalado en tu máquina local.

### Pasos para levantar el servicio
1. Clona el repositorio y navega a la carpeta principal del proyecto:
   ```bash
   git clone [https://github.com/donnourrutia/EV2DevopsFrontend.git](https://github.com/donnourrutia/EV2DevopsFrontend.git)
   cd EV2DevopsFrontend
   ```
2. Construye la imagen de Docker localmente:
   ```bash
   docker build -t frontend-itpcargo .
   ```
3. Levanta el contenedor exponiendo el puerto 80 hacia tu navegador:
   ```bash
   docker run -d -p 80:80 frontend-itpcargo
   ```
4. Abre tu navegador y accede a `http://localhost` para visualizar el dashboard.
