# Используем базовый образ для сборки
FROM node:20-alpine AS build-stage



WORKDIR /build

COPY . .

RUN npm ci


RUN npm run build


###

# Базовый образ для продакшн
FROM node:20-alpine AS production-stage

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}


# Выводим переменную для отладки
RUN echo "VITE_API_BASE_URL=${VITE_API_BASE_URL}"

WORKDIR /var/www/html

COPY package*.json  ./

COPY --from=build-stage /build/dist/ dist/

RUN npm install --omit=dev

RUN npm install -g vite

RUN rm -rf build

EXPOSE 4173

# Запускаем приложение Vite в режиме preview
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]

