FROM node:20-alpine AS build


COPY package*.json ./

RUN npm ci

COPY . .


#ENV VITE_BASE_URL=${VITE_BASE_URL}
RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /dist /usr/share/nginx/html
COPY  .deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY .deploy/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
#CMD ["nginx", "-g", "daemon off;"]


#CMD ["cat", "/etc/nginx/conf.d/default.conf"]
#CMD ["ls", "-la", "/usr/share/hginx/html"]
