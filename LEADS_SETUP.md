# Настройка системы сбора лидов

## 1. Настройка базы данных

База данных уже настроена с помощью Prisma и SQLite. Файл базы данных создается автоматически.

## 2. Настройка Telegram бота

### Шаг 1: Создание бота
1. Найдите @BotFather в Telegram
2. Отправьте команду `/newbot`
3. Выберите имя и username для бота
4. Скопируйте токен бота

### Шаг 2: Получение Chat ID
1. Добавьте своего бота в чат или напишите ему
2. Перейдите по ссылке: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
3. Найдите ваш chat_id в ответе

### Шаг 3: Настройка переменных окружения
Создайте файл `.env` в корне проекта:

```env
# Database
DATABASE_URL="file:./dev.db"

# Telegram Bot
TELEGRAM_BOT_TOKEN="ваш_токен_от_BotFather"
TELEGRAM_CHAT_ID="ваш_chat_id"
```

## 3. Запуск проекта

```bash
npm run dev
```

## 4. Тестирование

1. Откройте сайт в браузере
2. Заполните форму заявки
3. Проверьте, что:
   - Данные сохранились в базу (файл `dev.db`)
   - Пришло уведомление в Telegram

## 5. API Endpoints

### POST /api/leads
Создание новой заявки

**Body:**
```json
{
  "name": "Имя клиента",
  "business": "Описание бизнеса", 
  "request": "Запрос (опционально)",
  "budget": "Бюджет (опционально)",
  "contacts": "Email или телефон"
}
```

### GET /api/leads
Получение всех заявок (для админки)

## 6. Структура базы данных

```sql
CREATE TABLE leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  business TEXT NOT NULL,
  request TEXT,
  budget TEXT,
  contacts TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 7. Валидация формы

- **Имя**: обязательное поле
- **Бизнес**: обязательное поле  
- **Контакты**: обязательное поле, проверка на email или телефон
- **Запрос и Бюджет**: опциональные поля

## 8. Безопасность

- Все данные валидируются на сервере
- API защищен от SQL-инъекций через Prisma
- Ошибки Telegram не прерывают сохранение заявки

## 9. Мониторинг

Все ошибки логируются в консоль. В продакшене рекомендуется настроить систему логирования.
