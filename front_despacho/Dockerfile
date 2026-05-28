# Etapa 1: Construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copiamos archivos de dependencias
COPY package*.json ./

# Instalamos todo, incluyendo devDependencies para el build
RUN npm install

# Copiamos el resto del código
COPY . .

# Ejecutamos el build de Vite
RUN npm run build

# Etapa 2: Servidor de producción con Nginx
FROM nginx:alpine

# Copiamos el build desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiamos nuestra configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
