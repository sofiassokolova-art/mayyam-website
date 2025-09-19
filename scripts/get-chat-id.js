// Скрипт для получения Chat ID
// Запустите: node scripts/get-chat-id.js
// Предварительно напишите боту любое сообщение в Telegram

const BOT_TOKEN = '8212229355:AAG7Iy0AkC5NXT-FLKbI019LkrXhoCSMgno';

async function getChatId() {
  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`);
    const data = await response.json();
    
    if (data.ok && data.result.length > 0) {
      const updates = data.result;
      console.log('Найденные чаты:');
      
      updates.forEach((update, index) => {
        if (update.message) {
          console.log(`${index + 1}. Chat ID: ${update.message.chat.id}`);
          console.log(`   Имя: ${update.message.from.first_name || 'Не указано'}`);
          console.log(`   Username: @${update.message.from.username || 'Не указано'}`);
          console.log(`   Сообщение: "${update.message.text}"`);
          console.log('---');
        }
      });
    } else {
      console.log('Нет сообщений. Напишите боту любое сообщение и запустите скрипт снова.');
    }
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

getChatId();
