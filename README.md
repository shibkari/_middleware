# Express.js REST API Server

REST API сервер побудований на базі **Express.js**, що надає два ресурси: `users` (користувачі) та `articles` (статті). Сервер підтримує повний набір CRUD-операцій та містить централізовану обробку помилок.

---

## Структура проекту

```
├── app.js                      # Точка входу, налаштування Express
├── routes/
│   ├── usersRoutes.js          # Маршрути для користувачів
│   └── articlesRoutes.js       # Маршрути для статей
├── controllers/
│   ├── usersController.js      # Логіка обробки запитів користувачів
│   └── articlesController.js   # Логіка обробки запитів статей
├── data/
## Express.js REST API Server

REST API сервер побудований на базі **Express.js**, що надає два ресурси: `users` (користувачі) та `articles` (статті). Сервер підтримує повний набір CRUD-операцій та містить централізовану обробку помилок.

## Структура проекту

```

├── app.js # Точка входу, налаштування Express
├── routes/
│ ├── usersRoutes.js # Маршрути для користувачів
│ └── articlesRoutes.js # Маршрути для статей
├── controllers/
│ ├── usersController.js # Логіка обробки запитів користувачів
│ └── articlesController.js # Логіка обробки запитів статей
├── data/
│ └── store.js # In-memory сховище даних
├── middleware/
│ ├── middlewares.js # Нові middleware (логінг, auth, validation, sessions)
│ └── errorMiddleware.js # Обробка помилок
└── package.json

````

## Встановлення та запуск

```bash
npm install
node app.js
````

Сервер слухає на порту `3000`.

## Middlewares

- `logRequests` — глобальний логгер: дата/час, метод, URL, IP, User-Agent; для POST/PUT також тіло запиту.
- `demoAuth` — демонстраційний мідлвар: логування наявності заголовка `Authorization` (не блокує запити).
- `strictAuth` — строгий мідлвар: перевіряє `Authorization: Basic <credentials>` коли активовано заголовком `x-require-auth: true` (повертає 401 при відсутності/помилці).
- `validateUserData` / `validateArticleData` — валідація `name`/`title` із trim і перевіркою довжини.
- `demoArticleAccess` — демонстраційний контроль доступу до статей (строгий режим через `x-require-strict-access: true`, для DELETE у strict вимагає `x-user-role: admin`).
- `checkUserExists` / `checkArticleExists` — повертають 404, якщо ресурс не знайдено.
- `attachSessionInfo` — допоміжний мідлвар для демонстрації сесій (логує session id та час створення).

## Маршрути (коротко)

- `GET /` — кореневий маршрут
- `GET /users` — список користувачів
- `POST /users` — створення користувача (застосовано `demoAuth`, `strictAuth`, `validateUserData`)
- `POST /users/strict` — демонстраційний строгий маршрут (примусове `strictAuth`)
- `PUT /users/:userId` — оновлення (з `checkUserExists`, `validateUserData`)
- `DELETE /users/:userId` — видалення (з `checkUserExists`)

- `GET /articles`
- `POST /articles` — (`demoAuth`, `demoArticleAccess`, `validateArticleData`)
- `POST /articles/strict` — демонстраційний строгий маршрут (примусове `strictAuth` та `strict access`)
- `PUT /articles/:articleId` — (`checkArticleExists`, `validateArticleData`)
- `DELETE /articles/:articleId` — (`checkArticleExists`)

## Session support

Сервер містить базову підтримку сесій через `express-session` (налаштовано у `app.js`). Це демонстраційна конфігурація з memory store і підходить лише для розробки. Мідлвар `attachSessionInfo` логуватиме `session.id` та час створення для демонстрації.

## Формат відповідей

Усі контролери повертають текстові відповіді (Content-Type text/html або plain text) для сумісності з існуючими тестами.

## Подальші кроки

- Додати `express-session` з зовнішнім store для продакшену або JWT для безпечної автентифікації.
- Додати unit/integration тести для мідлварів.
- Ініціалізувати git-репозиторій та опублікувати на GitHub.
