import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import TelegramBot from 'node-telegram-bot-api';

const prisma = new PrismaClient();

// Инициализация Telegram бота
const bot = process.env.TELEGRAM_BOT_TOKEN 
  ? new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false })
  : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, business, request: userRequest, budget, contacts } = body;

    // Валидация обязательных полей
    if (!name || !business || !contacts) {
      return NextResponse.json(
        { error: 'Обязательные поля: имя, бизнес, контакты' },
        { status: 400 }
      );
    }

    // Сохранение в базу данных
    const lead = await prisma.lead.create({
      data: {
        name,
        business,
        request: userRequest || '',
        budget: budget || '',
        contacts,
      },
    });

    // Отправка уведомления в Telegram
    if (bot && process.env.TELEGRAM_CHAT_ID) {
      const message = `🎯 *Новая заявка #${lead.id}*

👤 *Имя:* ${name}
🏢 *Бизнес:* ${business}
💰 *Бюджет:* ${budget || 'Не указан'}
📝 *Запрос:* ${userRequest || 'Не указан'}
📞 *Контакты:* ${contacts}

📅 *Дата:* ${new Date().toLocaleString('ru-RU')}`;

      try {
        await bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message, {
          parse_mode: 'Markdown',
        });
      } catch (telegramError) {
        console.error('Ошибка отправки в Telegram:', telegramError);
        // Не прерываем процесс, если Telegram недоступен
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Заявка успешно отправлена!',
      leadId: lead.id,
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
    // Получение всех лидов (для админки в будущем)
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50, // Последние 50 заявок
    });

    return NextResponse.json({ leads });
  } catch (error) {
    console.error('Ошибка при получении лидов:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
