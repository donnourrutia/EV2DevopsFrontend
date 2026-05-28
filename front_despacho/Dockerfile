# Etapa 1: Construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copiamos archivos
COPY package*.json ./

# Instalamos dependencias y nos aseguramos de que los binarios tengan permisos
RUN npm install && \
    chmod -R 777 node_modules/.bin

COPY . .

# Ejecutamos el build, forzando la ruta del binario
RUN ./node_modules/.bin/vite build

# Etapa 2: Servidor de producción
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]