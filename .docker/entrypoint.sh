#!/bin/sh

BUILD_DIR="/usr/share/nginx/html/assets"

for VAR_NAME in $(printenv | grep '^VITE_' | cut -d '=' -f 1); do
    VAR_VALUE=$(printenv "$VAR_NAME")  # Получаем значение переменной окружения

      echo "Found env variable: $VAR_NAME=$VAR_VALUE"

    for file in $BUILD_DIR/*.js; do
        echo "Replacing in $file: $VAR_NAME -> $VAR_VALUE"
        sed -i "s|__${VAR_NAME}__|${VAR_VALUE}|g" "$file"
    done
done

nginx -g "daemon off;"
