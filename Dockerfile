FROM node:24-slim AS build

COPY frontend /app

WORKDIR /app
RUN npm install
COPY . .
RUN npm run build

FROM node:24-slim AS backend

WORKDIR /backend
COPY backend/package*.json ./
RUN npm install
COPY backend .

FROM nginx:alpine AS prod

RUN apk add --no-cache nodejs npm

COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=backend /backend/server.js /server.js
COPY --from=backend /backend/assets /assets
COPY --from=backend /backend/node_modules /node_modules

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["sh", "-c", "node /server.js & nginx -g 'daemon off;'"]