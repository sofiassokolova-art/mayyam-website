// Скрипт для локального тестирования бота
// Запустите: node scripts/test-bot-local.js

const BOT_TOKEN = '8212229355:AAG7Iy0AkC5NXT-FLKbI019LkrXhoCSMgno';
const CHAT_ID = '643160759';

let TelegramBot;
try {
  TelegramBot = require('node-telegram-bot-api');
} catch (error) {
  console.error('node-telegram-bot-api не установлен. Установите: npm install node-telegram-bot-api');
  process.exit(1);
}

// Создаем бота с polling
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

console.log('🤖 Локальный бот запущен!');
console.log('Доступные команды:');
console.log('- /export_leads');
console.log('- /last_lead');
console.log('- /help');
console.log('\nДля остановки нажмите Ctrl+C');

// Обработчик команд
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Проверяем, что это наш чат
  if (chatId.toString() !== CHAT_ID) {
    return;
  }

  console.log(`📨 Получена команда: ${text}`);

  try {
    if (text === '/export_leads') {
      // Имитируем экспорт лидов
      const mockLeads = [
        {
          id: 1,
          name: 'Тестовый клиент',
          business: 'Интернет-магазин',
          request: 'Настройка рекламы',
          budget: '100,000 руб',
          contacts: 'test@example.com',
          created_at: new Date().toISOString()
        }
      ];

      const csvData = 'ID,Имя,Бизнес,Запрос,Бюджет,Контакты,Дата создания\n' +
        mockLeads.map(lead => 
          `${lead.id},"${lead.name}","${lead.business}","${lead.request}","${lead.budget}","${lead.contacts}","${lead.created_at}"`
        ).join('\n');

      await bot.sendDocument(chatId, Buffer.from(csvData, 'utf-8'), {
        filename: `leads_export_test.csv`,
        contentType: 'text/csv'
      }, {
        caption: '📊 *Тестовый экспорт лидов*\n\nВсего лидов: 1 (тестовый)',
        parse_mode: 'Markdown'
      });

    } else if (text === '/last_lead') {
      const message = `🆕 *Последний лид (тестовый)*

👤 *Имя:* Тестовый клиент
🏢 *Бизнес:* Интернет-магазин
💰 *Бюджет:* 100,000 руб
📝 *Запрос:* Настройка рекламы
📞 *Контакты:* test@example.com
📅 *Дата:* ${new Date().toLocaleString('ru-RU')}`;

      await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });

    } else if (text === '/help' || text === '/start') {
      const helpMessage = `🤖 *Бот управления лидами (локальный тест)*

Доступные команды:

📊 /export_leads - Экспорт всех лидов в CSV файл
🆕 /last_lead - Показать последний лид
📋 /help - Показать эту справку

---
⚠️ Это локальный тест. В продакшене данные будут браться из реальной базы.`;

      await bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
    }

  } catch (error) {
    console.error('Ошибка:', error);
    await bot.sendMessage(chatId, '❌ Ошибка при выполнении команды');
  }
});

// Обработчик ошибок
bot.on('error', (error) => {
  console.error('Ошибка бота:', error);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Остановка бота...');
  bot.stopPolling();
  process.exit(0);
});
