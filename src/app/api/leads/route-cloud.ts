import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import TelegramBot from 'node-telegram-bot-api';

// Инициализация Telegram бота
const bot = process.env.TELEGRAM_BOT_TOKEN 
  ? new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false })
  : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, business, request: userRequest, budget, contacts } = body;

    // Валидация обязательных полей
    if (!name || !business || !contacts) {
      return NextResponse.json(
        { error: 'Обязательные поля: имя, бизнес, контакты' },
        { status: 400 }
      );
    }

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

    const leadId = result.rows[0].id;

    // Отправка уведомления в Telegram
    if (bot && process.env.TELEGRAM_CHAT_ID) {
      const message = `🎯 *Новая заявка #${leadId}*

👤 *Имя:* ${name}
🏢 *Бизнес:* ${business}
💰 *Бюджет:* ${budget || 'Не указан'}
📝 *Запрос:* ${userRequest || 'Не указан'}
📞 *Контакты:* ${contacts}

📅 *Дата:* ${new Date().toLocaleString('ru-RU')}

---
🌐 *Источник:* Сайт Mayyam`;

      try {
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
