/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { TelegramMessage } from '@/types/bot';

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

// Функция для экспорта лидов в CSV формат
function formatLeadsAsCSV(leads: any[]): string {
  const headers = 'Номер заявки,ID,Имя,Бизнес,Запрос,Бюджет,Контакты,Дата создания\n';
  const rows = leads.map(lead => 
    `${lead.lead_number || lead.id},${lead.id},"${lead.name}","${lead.business}","${lead.request || ''}","${lead.budget || ''}","${lead.contacts}","${formatDate(lead.created_at)}"`
  ).join('\n');
  
  return headers + rows;
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

// Функция для создания таблиц
async function ensureTables(sql: typeof import('@vercel/postgres').sql) {
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
}

// Функция для добавления/обновления подписчика
async function upsertSubscriber(sql: typeof import('@vercel/postgres').sql, message: TelegramMessage) {
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
}

export async function POST(request: NextRequest) {
  console.log('🔄 Webhook received');
  
  try {
    const { sql, TelegramBot } = await getModules();
    
    if (!sql || !TelegramBot) {
      console.log('❌ Modules not available');
      return NextResponse.json({ error: 'Modules not available' }, { status: 500 });
    }

    const body = await request.json();
    console.log('📨 Webhook body:', JSON.stringify(body, null, 2));
    
    const { message } = body;

    // Проверяем, что это валидное сообщение
    if (!message || !message.chat) {
      console.log('❌ Invalid message format');
      return NextResponse.json({ ok: true });
    }

    const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, { polling: false });
    const chatId = message.chat.id;
    const text = message.text;

    console.log(`📝 Processing message from ${chatId}: ${text}`);

    try {
      // Создаем таблицы если не существуют
      await ensureTables(sql);
      
      // Добавляем/обновляем подписчика при любом сообщении
      await upsertSubscriber(sql, message);

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

      } else if (text === '/export_leads') {
        console.log('📊 Processing export_leads command');
        
        // Получаем всех лидов
        const result = await sql`
          SELECT id, lead_number, name, business, request, budget, contacts, created_at, updated_at 
          FROM leads 
          ORDER BY lead_number DESC;
        `;

        if (result.rows.length === 0) {
          await bot.sendMessage(chatId, '📝 *Экспорт лидов*\n\nЛидов пока нет.', {
            parse_mode: 'Markdown'
          });
          console.log('📝 No leads found');
          return NextResponse.json({ ok: true });
        }

        // Форматируем в CSV
        const csvData = formatLeadsAsCSV(result.rows);
        const fileName = `leads_export_${new Date().toISOString().split('T')[0]}.csv`;

        // Отправляем файл
        await bot.sendDocument(chatId, Buffer.from(csvData, 'utf-8'), {
          caption: `📊 *Экспорт лидов*\n\nВсего лидов: ${result.rows.length}\nДата экспорта: ${new Date().toLocaleString('ru-RU')}`,
          parse_mode: 'Markdown'
        }, {
          filename: fileName,
          contentType: 'text/csv'
        });

        console.log(`📊 Exported ${result.rows.length} leads`);

      } else if (text === '/last_lead') {
        console.log('🆕 Processing last_lead command');
        
        // Получаем последний лид
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
          console.log('📝 No leads found');
        } else {
          const lastLead = result.rows[0];
          const message = formatLead(lastLead, true);
          await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
          console.log('🆕 Last lead sent');
        }

      } else if (text === '/stats') {
        console.log('📈 Processing stats command');
        
        // Статистика по лидам
        const leadsResult = await sql`SELECT COUNT(*) as total FROM leads;`;
        const subscribersResult = await sql`SELECT COUNT(*) as total FROM bot_subscribers WHERE is_active = true;`;
        
        const today = new Date().toISOString().split('T')[0];
        const todayResult = await sql`
          SELECT COUNT(*) as total FROM leads 
          WHERE DATE(created_at) = ${today};
        `;

        const statsMessage = `📈 *Статистика*

📊 Всего лидов: ${leadsResult.rows[0].total}
📅 Лидов сегодня: ${todayResult.rows[0].total}
👥 Подписчиков бота: ${subscribersResult.rows[0].total}
🕒 Обновлено: ${new Date().toLocaleString('ru-RU')}`;

        await bot.sendMessage(chatId, statsMessage, { parse_mode: 'Markdown' });
        console.log('📈 Stats sent');

      } else if (text === '/unsubscribe') {
        await sql`
          UPDATE bot_subscribers 
          SET is_active = false 
          WHERE chat_id = ${chatId};
        `;

        await bot.sendMessage(chatId, '😔 *Вы отписались от уведомлений*\n\nЧтобы снова подписаться, отправьте /start', {
          parse_mode: 'Markdown'
        });

        console.log('🔔 User unsubscribed');

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
      }

    } catch (dbError) {
      console.error('❌ Database error:', dbError);
      await bot.sendMessage(chatId, '❌ Ошибка при работе с базой данных', {
        parse_mode: 'Markdown'
      });
    }

    console.log('✅ Webhook processed successfully');
    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

// GET метод для проверки статуса
export async function GET() {
  return NextResponse.json({ 
    status: 'Telegram webhook endpoint active',
    timestamp: new Date().toISOString()
  });
}
