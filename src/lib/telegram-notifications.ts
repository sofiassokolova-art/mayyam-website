/* eslint-disable @typescript-eslint/no-explicit-any */
import { LeadNotification } from '@/types/bot';

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

// Функция для получения всех активных подписчиков
async function getActiveSubscribers(sql: typeof import('@vercel/postgres').sql) {
  const result = await sql`
    SELECT chat_id FROM bot_subscribers 
    WHERE is_active = true;
  `;
  return result.rows.map((row: any) => row.chat_id);
}

// Функция для рассылки уведомлений всем подписчикам
export async function notifyAllSubscribers(leadData: LeadNotification) {
  try {
    const { sql, TelegramBot } = await getModules();
    
    if (!sql || !TelegramBot) {
      console.warn('Cannot send notifications: modules not available');
      return;
    }

    const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, { polling: false });
    
    // Получаем всех активных подписчиков
    const subscribers = await getActiveSubscribers(sql);
    
    if (subscribers.length === 0) {
      console.log('No active subscribers to notify');
      return;
    }

    const message = `🎯 *Новая заявка #${leadData.leadId}*

👤 *Имя:* ${leadData.name}
🏢 *Бизнес:* ${leadData.business}
💰 *Бюджет:* ${leadData.budget || 'Не указан'}
📝 *Запрос:* ${leadData.request || 'Не указан'}
📞 *Контакты:* ${leadData.contacts}

📅 *Дата:* ${new Date().toLocaleString('ru-RU')}

---
🌐 *Источник:* Сайт Mayyam`;

    // Рассылаем всем подписчикам
    const notifications = subscribers.map(async (chatId: number) => {
      try {
        await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
        console.log(`Notification sent to ${chatId}`);
      } catch (error) {
        console.error(`Failed to send notification to ${chatId}:`, error);
        
        // Если пользователь заблокировал бота, деактивируем его
        if ((error as Error & { response?: { body?: { error_code?: number } } }).response?.body?.error_code === 403) {
          await sql`
            UPDATE bot_subscribers 
            SET is_active = false 
            WHERE chat_id = ${chatId};
          `;
        }
      }
    });

    await Promise.all(notifications);
    console.log(`Notifications sent to ${subscribers.length} subscribers`);

  } catch (error) {
    console.error('Error in notifyAllSubscribers:', error);
  }
}
