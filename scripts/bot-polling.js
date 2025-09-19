// Временный бот с polling для тестирования
// Запустите: node scripts/bot-polling.js

const BOT_TOKEN = '8212229355:AAG7Iy0AkC5NXT-FLKbI019LkrXhoCSMgno';

let TelegramBot;
try {
  TelegramBot = require('node-telegram-bot-api');
} catch (error) {
  console.error('node-telegram-bot-api не установлен');
  process.exit(1);
}

// Создаем бота с polling
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

console.log('🤖 Временный бот с polling запущен!');
console.log('📋 Доступные команды:');
console.log('   /start, /help, /stats, /last_lead, /export_leads');
console.log('🔄 Бот работает через polling (не webhook)');
console.log('⏹️  Для остановки нажмите Ctrl+C');

// Обработчик команд
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  const from = msg.from;

  console.log(`📨 Сообщение от ${from.first_name} (@${from.username}): ${text}`);

  try {
    if (text === '/start') {
      const welcomeMessage = `🎉 *Добро пожаловать!*

Временный бот работает через polling.

🤖 *Доступные команды:*

📊 /export_leads - Экспорт лидов (тестовый)
🆕 /last_lead - Последний лид (тестовый)
📋 /stats - Статистика (тестовая)
📋 /help - Справка

---
⚠️ Это временное решение для тестирования.
🔧 Основной бот будет работать после настройки Vercel.`;

      await bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });

    } else if (text === '/help') {
      const helpMessage = `🤖 *Временный бот управления лидами*

Доступные команды:

📊 /export_leads - Экспорт лидов (тестовый)
🆕 /last_lead - Последний лид (тестовый)  
📈 /stats - Статистика (тестовая)
📋 /help - Справка

---
⚠️ Для полной функциональности нужно:
1. Отключить Deployment Protection в Vercel
2. Или настроить исключения для API роутов`;

      await bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });

    } else if (text === '/stats') {
      const statsMessage = `📈 *Тестовая статистика*

📊 Всего лидов: 0 (тестовый режим)
📅 Лидов сегодня: 0
👥 Подписчиков бота: 1
🕒 Обновлено: ${new Date().toLocaleString('ru-RU')}

---
⚠️ Реальные данные будут доступны после настройки webhook`;

      await bot.sendMessage(chatId, statsMessage, { parse_mode: 'Markdown' });

    } else if (text === '/last_lead') {
      const message = `📝 *Последний лид*

Лидов пока нет (тестовый режим).

---
⚠️ Реальные лиды будут отображаться после настройки webhook и базы данных.`;

      await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });

    } else if (text === '/export_leads') {
      const csvData = `Номер заявки,ID,Имя,Бизнес,Запрос,Бюджет,Контакты,Дата создания
1,1,"Тестовый клиент","Тестовый бизнес","Тест","100000","test@example.com","${new Date().toLocaleString('ru-RU')}"`;

      await bot.sendDocument(chatId, Buffer.from(csvData, 'utf-8'), {
        caption: `📊 *Тестовый экспорт лидов*\n\nВсего лидов: 1 (тестовый)\nДата экспорта: ${new Date().toLocaleString('ru-RU')}`,
        parse_mode: 'Markdown'
      }, {
        filename: `test_leads_export.csv`,
        contentType: 'text/csv'
      });
    }

  } catch (error) {
    console.error('❌ Ошибка:', error);
    await bot.sendMessage(chatId, '❌ Ошибка при выполнении команды');
  }
});

// Обработчик ошибок
bot.on('error', (error) => {
  console.error('❌ Ошибка бота:', error);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Остановка бота...');
  bot.stopPolling();
  process.exit(0);
});

console.log('\n📝 Инструкция по настройке webhook:');
console.log('1. Зайдите в Vercel Dashboard');
console.log('2. Settings → Deployment Protection');
console.log('3. Отключите защиту или добавьте исключения для /api/*');
console.log('4. Redeploy проект');
console.log('5. Запустите: node scripts/setup-webhook.js');
