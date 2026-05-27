# ---- Etapa 1: Compilación (Builder) ----
FROM node:18-alpine AS builder

WORKDIR /app

# Copiamos package.json y lock
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código y construimos la app de React
COPY . .
RUN npm run build

# ---- Etapa 2: Producción (Servidor Nginx) ----
# Usamos una imagen de Nginx "unprivileged" (no root)
FROM nginxinc/nginx-unprivileged:alpine

# Copiamos los archivos estáticos compilados a la carpeta de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponemos el puerto 8080
EXPOSE 80