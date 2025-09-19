import { NextRequest, NextResponse } from 'next/server';

// Динамические импорты для разных сред
async function getModules() {
  try {
    const { sql } = await import('@vercel/postgres');
    const TelegramBot = (await import('node-telegram-bot-api')).default;
    return { sql, TelegramBot };
  } catch (error) {
    console.warn('Some modules not available:', error);
    return { sql: null, TelegramBot: null };
  }
}

export async function POST(request: NextRequest) {
  try {
    const { sql, TelegramBot } = await getModules();
    const body = await request.json();
    const { name, business, request: userRequest, budget, contacts } = body;

    // Валидация обязательных полей
    if (!name || !business || !contacts) {
      return NextResponse.json(
        { error: 'Обязательные поля: имя, бизнес, контакты' },
        { status: 400 }
      );
    }

    let leadId = Math.floor(Math.random() * 10000); // Временный ID

    // Сохранение в базу данных (только если доступен sql)
    if (sql) {
      try {
        // Создание таблицы если не существует
        await sql`
          CREATE TABLE IF NOT EXISTS leads (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            business TEXT NOT NULL,
            request TEXT,
            budget TEXT,
            contacts TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `;

        // Сохранение в базу данных
        const result = await sql`
          INSERT INTO leads (name, business, request, budget, contacts)
          VALUES (${name}, ${business}, ${userRequest || ''}, ${budget || ''}, ${contacts})
          RETURNING id;
        `;

        leadId = result.rows[0].id;
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Продолжаем без БД, но с Telegram уведомлением
      }
    }

    // Отправка уведомления в Telegram
    if (TelegramBot && process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      try {
        const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
        const message = `🎯 *Новая заявка #${leadId}*

👤 *Имя:* ${name}
🏢 *Бизнес:* ${business}
💰 *Бюджет:* ${budget || 'Не указан'}
📝 *Запрос:* ${userRequest || 'Не указан'}
📞 *Контакты:* ${contacts}

📅 *Дата:* ${new Date().toLocaleString('ru-RU')}

---
🌐 *Источник:* Сайт Mayyam`;

        await bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message, {
          parse_mode: 'Markdown',
        });
      } catch (telegramError) {
        console.error('Ошибка отправки в Telegram:', telegramError);
        // Не прерываем процесс, если Telegram недоступен
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Заявка успешно отправлена!',
      leadId: leadId,
    });

  } catch (error) {
    console.error('Ошибка при обработке заявки:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { sql } = await getModules();
    
    if (!sql) {
      return NextResponse.json({ 
        leads: [],
        message: 'Database not available in development mode'
      });
    }

    // Получение всех лидов (для админки в будущем)
    const result = await sql`
      SELECT * FROM leads 
      ORDER BY created_at DESC 
      LIMIT 50;
    `;

    return NextResponse.json({ leads: result.rows });
  } catch (error) {
    console.error('Ошибка при получении лидов:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}