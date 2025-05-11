FROM node:24-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:24-slim AS backend

WORKDIR /backend
COPY backend/package*.json ./
RUN npm install
COPY backend .

FROM nginx:alpine AS prod

# Installe Node.js AVANT toute copie ou lancement
RUN apk add --no-cache nodejs npm

COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=backend /backend/server.js /server.js
COPY --from=backend /backend/node_modules /node_modules

# Copie la conf nginx custom
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Lance le backend puis nginx (une seule CMD)
CMD ["sh", "-c", "node /server.js & nginx -g 'daemon off;'"]