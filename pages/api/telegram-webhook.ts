/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next';

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

// Функция для форматирования даты
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Функция для форматирования лида
function formatLead(lead: any, isLast = false): string {
  const leadNumber = lead.lead_number || lead.id;
  const prefix = isLast ? '🆕 *Последний лид*' : `🎯 *Лид #${leadNumber}*`;
  
  return `${prefix}

👤 *Имя:* ${lead.name}
🏢 *Бизнес:* ${lead.business}
💰 *Бюджет:* ${lead.budget || 'Не указан'}
📝 *Запрос:* ${lead.request || 'Не указан'}
📞 *Контакты:* ${lead.contacts}
📅 *Дата:* ${formatDate(lead.created_at)}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('🔄 Pages API Webhook received');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sql, TelegramBot } = await getModules();
    
    if (!sql || !TelegramBot) {
      console.log('❌ Modules not available');
      return res.status(500).json({ error: 'Modules not available' });
    }

    const { message } = req.body;
    console.log('📨 Webhook body:', JSON.stringify(req.body, null, 2));

    // Проверяем, что это валидное сообщение
    if (!message || !message.chat) {
      console.log('❌ Invalid message format');
      return res.status(200).json({ ok: true });
    }

    const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, { polling: false });
    const chatId = message.chat.id;
    const text = message.text;

    console.log(`📝 Processing message from ${chatId}: ${text}`);

    try {
      // Создаем таблицы если не существуют
      await sql`
        CREATE TABLE IF NOT EXISTS leads (
          id SERIAL PRIMARY KEY,
          lead_number INTEGER UNIQUE NOT NULL DEFAULT 1,
          name TEXT NOT NULL,
          business TEXT NOT NULL,
          request TEXT,
          budget TEXT,
          contacts TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS bot_subscribers (
          id SERIAL PRIMARY KEY,
          chat_id BIGINT UNIQUE NOT NULL,
          username TEXT,
          first_name TEXT,
          last_name TEXT,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // Добавляем/обновляем подписчика
      const { chat, from } = message;
      await sql`
        INSERT INTO bot_subscribers (chat_id, username, first_name, last_name, last_activity)
        VALUES (${chat.id}, ${from.username || null}, ${from.first_name || null}, ${from.last_name || null}, CURRENT_TIMESTAMP)
        ON CONFLICT (chat_id) 
        DO UPDATE SET 
          username = EXCLUDED.username,
          first_name = EXCLUDED.first_name,
          last_name = EXCLUDED.last_name,
          is_active = true,
          last_activity = CURRENT_TIMESTAMP;
      `;

      if (text === '/start') {
        const welcomeMessage = `🎉 *Добро пожаловать!*

Вы подписались на уведомления о новых лидах с сайта Mayyam.

🤖 *Доступные команды:*

📊 /export_leads - Экспорт всех лидов в CSV файл
🆕 /last_lead - Показать последний лид
📋 /stats - Статистика по лидам
🔔 /unsubscribe - Отписаться от уведомлений
📋 /help - Показать эту справку

---
✨ Теперь вы будете получать уведомления о каждом новом лиде!`;

        await bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });
        console.log('✅ Welcome message sent');

      } else if (text === '/help') {
        const helpMessage = `🤖 *Бот управления лидами*

Доступные команды:

📊 /export_leads - Экспорт всех лидов в CSV файл
🆕 /last_lead - Показать последний лид
📈 /stats - Статистика по лидам
🔔 /unsubscribe - Отписаться от уведомлений
📋 /help - Показать эту справку

---
🌐 Лиды поступают автоматически с сайта Mayyam
✨ Все подписчики получают уведомления о новых лидах`;

        await bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
        console.log('📋 Help sent');

      } else if (text === '/stats') {
        const leadsResult = await sql`SELECT COUNT(*) as total FROM leads;`;
        const subscribersResult = await sql`SELECT COUNT(*) as total FROM bot_subscribers WHERE is_active = true;`;

        const statsMessage = `📈 *Статистика*

📊 Всего лидов: ${leadsResult.rows[0].total}
👥 Подписчиков бота: ${subscribersResult.rows[0].total}
🕒 Обновлено: ${new Date().toLocaleString('ru-RU')}`;

        await bot.sendMessage(chatId, statsMessage, { parse_mode: 'Markdown' });
        console.log('📈 Stats sent');

      } else if (text === '/last_lead') {
        const result = await sql`
          SELECT id, lead_number, name, business, request, budget, contacts, created_at, updated_at 
          FROM leads 
          ORDER BY lead_number DESC 
          LIMIT 1;
        `;

        if (result.rows.length === 0) {
          await bot.sendMessage(chatId, '📝 *Последний лид*\n\nЛидов пока нет.', {
            parse_mode: 'Markdown'
          });
        } else {
          const lastLead = result.rows[0];
          const message = formatLead(lastLead, true);
          await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
        }
        console.log('🆕 Last lead processed');
      }

    } catch (dbError) {
      console.error('❌ Database error:', dbError);
      await bot.sendMessage(chatId, '❌ Ошибка при работе с базой данных');
    }

    console.log('✅ Webhook processed successfully');
    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error('❌ Webhook error:', error);
    return res.status(500).json({ error: 'Internal error' });
  }
}
