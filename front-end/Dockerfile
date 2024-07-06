#front-end/Dockerfile

# Используем официальный Node.js образ как базовый
FROM node:14

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в рабочую директорию
COPY . .

# Копируем файл .env в контейнер
COPY .env .env

# Сборка приложения
RUN npm run build

# Используем nginx для сервировки статических файлов
FROM nginx:alpine
COPY --from=0 /usr/src/app/build /usr/share/nginx/html

# Открываем порт, который используется приложением
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
