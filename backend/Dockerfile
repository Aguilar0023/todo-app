# Imagen base optimizada
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install --only=production

# Copiar código fuente
COPY src/ ./src/

# Exponer puerto
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]
