# Frontend EV2 Innovatech 🖥️
Frontend - Sistema de Logística y Ventas (Innovatech Chile)
Este repositorio contiene la capa de presentación (Frontend) para el sistema de logística de ITPCARGO. Implementado como una Single Page Application (SPA), permite la gestión centralizada de despachos y órdenes de compra.

🏗️ Arquitectura y Justificación Técnica
La aplicación sigue una arquitectura de microservicios, donde el Frontend actúa como cliente independiente que consume servicios de una API Restful.

React.js: Elegido por su capacidad de crear interfaces dinámicas y su excelente ecosistema para manejo de estado global.

Servidor Nginx: Se utiliza Nginx sobre Alpine Linux en producción, aprovechando su bajo consumo de recursos y alta eficiencia como servidor de archivos estáticos.

Docker Multi-Stage Build: Implementamos esta estrategia para:

Seguridad: El entorno de construcción (Node.js) se descarta, dejando en la imagen final solo el binario ejecutable (archivos estáticos), reduciendo la superficie de ataque.

Optimización: Se reduce drásticamente el tamaño de la imagen final, facilitando el transporte y despliegue en AWS.

Seguridad: Se configuró el Dockerfile para ejecutar la aplicación bajo un usuario no root, siguiendo el principio de privilegio mínimo.

🔗 Integración y Flujo de Comunicación
El sistema se integra con los microservicios de Ventas y Despachos (Backend) bajo la siguiente política:

Endpoint: El Frontend consume la API a través de variables de entorno configuradas durante el proceso de build/runtime.

Políticas de Seguridad: La comunicación Front → Back respeta los Security Groups de AWS, donde solo la instancia de Frontend permite acceso público, mientras que el Backend reside en una subred con acceso restringido.

🚀 Pipeline CI/CD (GitHub Actions)
Automatizamos el ciclo de vida para garantizar la entrega continua:

Trigger: Cualquier push sobre la rama deploy dispara el flujo de trabajo.

Build: Se ejecuta un docker build en GitHub Actions que compila el código y construye la imagen optimizada.

Push: La imagen se etiqueta y se publica en el registro de contenedores (ECR/Docker Hub).

Deploy: Mediante una conexión SSH segura a la instancia EC2, se ejecuta el script de actualización que descarga la nueva imagen y reinicia el contenedor (aplicando Zero Downtime al actualizar volúmenes/redes).

Nota: Todas las credenciales (AWS_ACCESS_KEY, SSH_PRIVATE_KEY) son gestionadas exclusivamente mediante GitHub Repository Secrets.

🛠️ Ejecución Local
Requisitos Previos
Docker y Docker Desktop instalados.

Git.

Pasos para levantar el servicio
Clona el repositorio:

Bash
git clone https://github.com/donnourrutia/EV2DevopsFrontend.git
cd EV2DevopsFrontend
Construye la imagen (Multi-stage):

Bash
docker build -t frontend-itpcargo .
Levanta el contenedor:

Bash
docker run -d -p 80:80 --name dashboard-itpcargo frontend-itpcargo
Accede en: http://localhost.

⚙️ Principios DevOps Aplicados
Este proyecto no solo está "contenedorizado", sino que sigue prácticas de nivel industrial:

Control de Versiones: Historial de commits bajo convención (Fix/Feat/Update).

Gestión de Entornos: Uso estricto de variables de entorno para desacoplar el código de la infraestructura.

Persistencia: Aunque este repositorio es Frontend, en el stack global (docker-compose.yml), se utilizan Named Volumes para la base de datos, garantizando que la información de las órdenes de compra sea persistente tras reinicios.

Documentación: Este documento asegura la trazabilidad y mantenibilidad del sistema.
