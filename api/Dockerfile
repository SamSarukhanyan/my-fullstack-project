# Используем официальный Node.js образ как базовый
FROM node:14

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Устанавливаем nodemon глобально
RUN npm install -g nodemon

# Копируем весь проект в рабочую директорию
COPY . .

# Копируем файл .env в контейнер
COPY .env .env

# Открываем порт, который используется приложением
EXPOSE 4600

# Запускаем приложение с использованием nodemon
CMD ["nodemon", "src/index.js"]
