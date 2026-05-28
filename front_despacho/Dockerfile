# Etapa 1: Construcción
FROM node:18-alpine AS builder

WORKDIR /app
 
# Copiamos archivos
COPY package*.json ./

# Instalación limpia
RUN npm install

# Copiamos el resto
COPY . .

# EJECUCIÓN DIRECTA A TRAVÉS DE NPX (Esto salta cualquier problema de permisos de ./node_modules/.bin/vite)
RUN npx vite build

# Etapa 2: Servidor de producción
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]