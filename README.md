# React-app

Frontend: React  
State management: Redux Toolkit  
Routing: React-router-dom  
Backend: NodeJS (Express)   
Database: MongoDB (Mongoose)   
Unit тесты: Jest, Supertest  

## Использование MongoDB

Установите на локальную машину MongoDB Community Server (https://www.mongodb.com/try/download/community)

## Использование Docker

1. Установите Docker Desktop.
2. Запустите Docker Desktop.
3. Откройте папку с приложением в своём IDE, создайте терминал и запустите в терминале команду: docker compose up -d
4. Когда приложение соберётся и запустится, откройте его по URL: http://localhost:9000

# Тестирование

Чтобы запускать тесты, желательно установить расширение для Visual Studio Code: Jest  
Если нужно запускать backend тесты, то выполните комманду: npm run dev и подождите пока сервер запустится