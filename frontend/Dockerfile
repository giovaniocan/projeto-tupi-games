FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/src/assets /usr/share/nginx/html/src/assets
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]