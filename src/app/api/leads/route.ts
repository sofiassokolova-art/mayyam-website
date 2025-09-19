import { NextRequest, NextResponse } from 'next/server';

// Динамические импорты для разных сред
async function getModules() {
  try {
    const { sql } = await import('@vercel/postgres');
    return { sql };
  } catch (error) {
    console.warn('Some modules not available:', error);
    return { sql: null };
  }
}

export async function POST(request: NextRequest) {
  try {
    const { sql } = await getModules();
    const body = await request.json();
    const { name, business, request: userRequest, budget, contacts } = body;

    // Валидация обязательных полей
    if (!name || !business || !contacts) {
      return NextResponse.json(
        { error: 'Обязательные поля: имя, бизнес, контакты' },
        { status: 400 }
      );
    }

    let leadId = Math.floor(Math.random() * 10000); // Временный ID для fallback

    // Сохранение в базу данных (только если доступен sql)
    if (sql) {
      try {
        // Создание таблицы если не существует
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

        // Создание последовательности для номеров заявок если не существует
        await sql`
          CREATE SEQUENCE IF NOT EXISTS lead_number_seq START 1;
        `;

        // Получаем следующий номер заявки
        const nextNumberResult = await sql`
          SELECT COALESCE(MAX(lead_number), 0) + 1 as next_number FROM leads;
        `;
        
        const leadNumber = nextNumberResult.rows[0].next_number;

        // Сохранение в базу данных с номером заявки
        const result = await sql`
          INSERT INTO leads (lead_number, name, business, request, budget, contacts)
          VALUES (${leadNumber}, ${name}, ${business}, ${userRequest || ''}, ${budget || ''}, ${contacts})
          RETURNING id, lead_number;
        `;

        leadId = result.rows[0].id;
        // Используем lead_number как основной номер для отображения
        leadId = result.rows[0].lead_number;
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Продолжаем без БД, но с Telegram уведомлением
      }
    }

    // Отправка уведомления всем подписчикам бота
    if (process.env.TELEGRAM_BOT_TOKEN) {
      try {
        // Импортируем функцию уведомления из lib
        const { notifyAllSubscribers } = await import('@/lib/telegram-notifications');
        
        await notifyAllSubscribers({
          leadId,
          name,
          business,
          request: userRequest,
          budget,
          contacts
        });
      } catch (telegramError) {
        console.error('Ошибка отправки уведомлений:', telegramError);
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
    const { sql } = await getModules();
    
    if (!sql) {
      return NextResponse.json({ 
        leads: [],
        message: 'Database not available in development mode'
      });
    }

    // Получение всех лидов (для админки в будущем)
    const result = await sql`
      SELECT id, lead_number, name, business, request, budget, contacts, created_at, updated_at 
      FROM leads 
      ORDER BY lead_number DESC 
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