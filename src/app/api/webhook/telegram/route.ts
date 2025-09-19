/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';

// Динамические импорты для разных сред
async function getModules() {
  try {
    const TelegramBot = (await import('node-telegram-bot-api')).default;
    return { TelegramBot };
  } catch (error) {
    console.warn('TelegramBot module not available:', error);
    return { TelegramBot: null };
  }
}

export async function POST(request: NextRequest) {
  console.log('🔄 Telegram Webhook received');
  
  try {
    const { TelegramBot } = await getModules();
    
    if (!TelegramBot) {
      console.log('❌ TelegramBot module not available');
      return NextResponse.json({ error: 'TelegramBot not available' }, { status: 500 });
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
      if (text === '/start') {
        const welcomeMessage = `🎉 *Добро пожаловать!*

Бот управления лидами активен!

🤖 *Доступные команды:*

📋 /help - Справка по командам
📈 /status - Статус системы
🔧 /test - Тестовое сообщение

---
✨ Система готова к работе!`;

        await bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });
        console.log('✅ Welcome message sent');

      } else if (text === '/help') {
        const helpMessage = `🤖 *Бот управления лидами*

Доступные команды:

📋 /help - Показать эту справку
📈 /status - Статус системы
🔧 /test - Тестовое сообщение

---
🌐 Лиды поступают автоматически с сайта Mayyam
⚠️ База данных настраивается...`;

        await bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
        console.log('📋 Help sent');

      } else if (text === '/status') {
        const statusMessage = `📈 *Статус системы*

✅ Webhook: Активен
✅ Telegram API: Работает
⚠️ База данных: Настраивается
🕒 Время: ${new Date().toLocaleString('ru-RU')}

---
🔧 Система готова к приему лидов!`;

        await bot.sendMessage(chatId, statusMessage, { parse_mode: 'Markdown' });
        console.log('📈 Status sent');

      } else if (text === '/test') {
        const testMessage = `🔧 *Тестовое сообщение*

Бот работает корректно!

📊 Данные:
- Chat ID: ${chatId}
- Время: ${new Date().toLocaleString('ru-RU')}
- Токен: ✅ Настроен
- Webhook: ✅ Активен

---
✅ Все системы работают!`;

        await bot.sendMessage(chatId, testMessage, { parse_mode: 'Markdown' });
        console.log('🔧 Test message sent');
      }

    } catch (commandError) {
      console.error('❌ Command error:', commandError);
      await bot.sendMessage(chatId, '❌ Ошибка при выполнении команды');
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
    timestamp: new Date().toISOString(),
    version: '2.0'
  });
}