// Скрипт для тестирования webhook бота
// Запустите: node scripts/test-bot-webhook.js

const BOT_TOKEN = '8212229355:AAG7Iy0AkC5NXT-FLKbI019LkrXhoCSMgno';
const CHAT_ID = '643160759'; // Sofia
const API_URL = 'http://localhost:3000/api/bot';

// Имитация сообщения от Telegram
const testMessage = {
  message: {
    message_id: 123,
    chat: {
      id: parseInt(CHAT_ID),
      type: 'private'
    },
    from: {
      id: parseInt(CHAT_ID),
      username: 'sofiagguseynova',
      first_name: 'Sofia',
      last_name: 'Guseynova'
    },
    text: '/help',
    date: Math.floor(Date.now() / 1000)
  }
};

async function testBotAPI() {
  try {
    console.log('🧪 Тестируем API бота локально...');
    console.log('📨 Отправляем тестовое сообщение:', testMessage.message.text);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testMessage)
    });

    const result = await response.json();
    
    console.log('📊 Статус ответа:', response.status);
    console.log('📋 Результат:', result);

    if (response.ok) {
      console.log('✅ API работает корректно!');
    } else {
      console.log('❌ Ошибка API:', result);
    }

  } catch (error) {
    console.error('❌ Ошибка при тестировании:', error.message);
    console.log('\n💡 Убедитесь, что локальный сервер запущен:');
    console.log('   npm run dev');
  }
}

// Дополнительные тесты
async function testDifferentCommands() {
  const commands = ['/start', '/help', '/stats', '/last_lead'];
  
  for (const command of commands) {
    console.log(`\n🔄 Тестируем команду: ${command}`);
    
    const testMsg = {
      ...testMessage,
      message: {
        ...testMessage.message,
        text: command,
        message_id: Math.floor(Math.random() * 10000)
      }
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testMsg)
      });

      if (response.ok) {
        console.log(`✅ ${command} - OK`);
      } else {
        console.log(`❌ ${command} - Error:`, response.status);
      }
    } catch (error) {
      console.log(`❌ ${command} - Network error`);
    }

    // Небольшая пауза между запросами
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

console.log('🤖 Тестирование Telegram бота\n');

// Запускаем тесты
testBotAPI().then(() => {
  console.log('\n🔄 Запускаем тесты разных команд...');
  return testDifferentCommands();
}).then(() => {
  console.log('\n🏁 Тестирование завершено!');
});
