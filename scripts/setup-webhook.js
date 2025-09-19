// Скрипт для настройки Telegram вебхука
// Запустите: node scripts/setup-webhook.js

const BOT_TOKEN = '8212229355:AAG7Iy0AkC5NXT-FLKbI019LkrXhoCSMgno';
const WEBHOOK_URL = 'https://your-domain.vercel.app/api/bot'; // Замените на ваш домен

async function setupWebhook() {
  try {
    // Удаляем старый вебхук
    console.log('Удаляем старый вебхук...');
    const deleteResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/deleteWebhook`);
    const deleteResult = await deleteResponse.json();
    console.log('Удаление:', deleteResult);

    // Устанавливаем новый вебхук
    console.log('Устанавливаем новый вебхук...');
    const setResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: WEBHOOK_URL,
        allowed_updates: ['message']
      })
    });
    
    const setResult = await setResponse.json();
    console.log('Установка:', setResult);

    // Проверяем статус вебхука
    console.log('Проверяем статус...');
    const infoResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo`);
    const infoResult = await infoResponse.json();
    console.log('Статус вебхука:', infoResult);

    if (setResult.ok) {
      console.log('✅ Вебхук успешно настроен!');
      console.log('Теперь бот будет реагировать на команды:');
      console.log('- /export_leads');
      console.log('- /last_lead');
      console.log('- /help');
    } else {
      console.log('❌ Ошибка настройки вебхука');
    }

  } catch (error) {
    console.error('Ошибка:', error);
  }
}

// Для локального тестирования (без вебхука)
async function setupLocalBot() {
  console.log('Настройка для локального тестирования...');
  
  // Удаляем вебхук для локального polling
  const deleteResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/deleteWebhook`);
  const deleteResult = await deleteResponse.json();
  console.log('Вебхук удален:', deleteResult);
  
  console.log('✅ Теперь можно использовать polling для локальной разработки');
}

// Проверяем аргументы командной строки
const args = process.argv.slice(2);
if (args.includes('--local')) {
  setupLocalBot();
} else {
  console.log('Замените WEBHOOK_URL на ваш домен, затем запустите скрипт');
  console.log('Для локального тестирования: node scripts/setup-webhook.js --local');
  // setupWebhook();
}
