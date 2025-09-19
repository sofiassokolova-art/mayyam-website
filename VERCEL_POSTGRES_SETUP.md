# 🗄️ Настройка Vercel Postgres для сбора лидов

## 🎯 Зачем нужна облачная БД:
- **Постоянное хранение** лидов (не умирает при деплоях)
- **Автоматическое резервное копирование**
- **Масштабируемость** под любую нагрузку
- **Интеграция с Telegram ботом**

## 🚀 Пошаговая настройка:

### Шаг 1: Создание базы данных
1. Зайдите в **Vercel Dashboard**: https://vercel.com/dashboard
2. Выберите проект **mayyam-website**
3. Перейдите в раздел **"Storage"**
4. Нажмите **"Create Database"**
5. Выберите **"Postgres"**
6. Введите название: `mayyam-leads-db`
7. Выберите регион: **Europe** (ближе к России)
8. Нажмите **"Create"**

### Шаг 2: Автоматическая настройка
После создания Vercel автоматически добавит переменные окружения:
```
POSTGRES_URL = "postgres://..."
POSTGRES_PRISMA_URL = "postgres://..."  
POSTGRES_URL_NON_POOLING = "postgres://..."
```

### Шаг 3: Проверка подключения
1. Перейдите в **Settings → Environment Variables**
2. Убедитесь, что переменные `POSTGRES_*` появились
3. Сделайте **Redeploy** последнего деплоя

### Шаг 4: Тестирование
После деплоя напишите боту:
- `/start` - приветствие
- `/stats` - должна показать "0 лидов"
- Заполните форму на сайте
- `/last_lead` - покажет новый лид
- `/export_leads` - экспортирует CSV

## 📊 Структура базы данных:

### Таблица `leads`:
```sql
CREATE TABLE leads (
  id SERIAL PRIMARY KEY,           -- Внутренний ID
  lead_number INTEGER UNIQUE,      -- Номер заявки (1, 2, 3...)
  name TEXT NOT NULL,              -- Имя клиента
  business TEXT NOT NULL,          -- Описание бизнеса
  request TEXT,                    -- Запрос (опционально)
  budget TEXT,                     -- Бюджет (опционально)
  contacts TEXT NOT NULL,          -- Email/телефон
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Таблица `bot_subscribers`:
```sql
CREATE TABLE bot_subscribers (
  id SERIAL PRIMARY KEY,
  chat_id BIGINT UNIQUE NOT NULL,  -- Telegram Chat ID
  username TEXT,                   -- @username
  first_name TEXT,                 -- Имя пользователя
  last_name TEXT,                  -- Фамилия
  is_active BOOLEAN DEFAULT true,  -- Активная подписка
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Что произойдет после настройки:

### ✅ Автоматические уведомления:
- Каждая заявка с сайта → уведомление всем подписчикам
- Нумерация заявок: #1, #2, #3...
- Красивое форматирование с эмодзи

### 📋 Команды бота:
- `/export_leads` - CSV файл со всеми лидами
- `/last_lead` - информация о последнем лиде  
- `/stats` - статистика по лидам и подписчикам

### 🛡️ Безопасность:
- Данные хранятся в зашифрованном виде
- Автоматические бэкапы
- Защита от SQL-инъекций

## ⚡ Производительность:
- **Connection pooling** для высокой нагрузки
- **Автомасштабирование** базы данных
- **Быстрые запросы** благодаря индексам

## 💰 Стоимость:
- **Hobby план:** бесплатно до 10K запросов/месяц
- **Pro план:** $20/месяц за безлимитное использование

---

**После создания базы данных все команды бота заработают автоматически!** 🚀
