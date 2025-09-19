# Настройка деплоя на Vercel с Telegram ботом

## 1. Получение Chat ID

1. Найдите бота в Telegram по токену: `8212229355:AAG7Iy0AkC5NXT-FLKbI019LkrXhoCSMgno`
2. Напишите боту любое сообщение (например, "Привет")
3. Запустите скрипт: `node scripts/get-chat-id.js`
4. Скопируйте ваш Chat ID

## 2. Настройка Vercel

### Шаг 1: Переменные окружения в Vercel
1. Зайдите в настройки проекта на Vercel
2. Перейдите в раздел "Environment Variables"
3. Добавьте переменные:

```
TELEGRAM_BOT_TOKEN = 8212229355:AAG7Iy0AkC5NXT-FLKbI019LkrXhoCSMgno
TELEGRAM_CHAT_ID = ваш_chat_id_здесь
```

### Шаг 2: Настройка базы данных Vercel Postgres
1. В проекте Vercel перейдите в раздел "Storage"
2. Создайте Postgres базу данных
3. Vercel автоматически добавит переменные:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`

### Шаг 3: Обновление API роута
Замените содержимое `src/app/api/leads/route.ts` на содержимое `route-cloud.ts`

## 3. Деплой

```bash
git add .
git commit -m "Setup Telegram bot and Vercel deployment"
git push origin main
```

Vercel автоматически задеплоит проект.

## 4. Тестирование

1. Откройте задеплоенный сайт
2. Заполните форму заявки
3. Проверьте, что пришло уведомление в Telegram

## 5. Мониторинг

- Логи доступны в панели Vercel
- База данных управляется через Vercel Dashboard
- Telegram уведомления приходят мгновенно

## 6. Безопасность

- Все токены хранятся в зашифрованном виде в Vercel
- API защищен от злоупотреблений
- База данных автоматически резервируется
