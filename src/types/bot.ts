// Типы для Telegram бота

export interface Lead {
  id: number;
  lead_number?: number;
  name: string;
  business: string;
  request?: string;
  budget?: string;
  contacts: string;
  created_at: string;
  updated_at?: string;
}

export interface Subscriber {
  id: number;
  chat_id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  is_active: boolean;
  created_at: string;
  last_activity: string;
}

export interface TelegramMessage {
  message_id: number;
  chat: {
    id: number;
    type: string;
  };
  from: {
    id: number;
    username?: string;
    first_name?: string;
    last_name?: string;
  };
  text?: string;
  date: number;
}

export interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
}

export interface LeadNotification {
  leadId: number;
  name: string;
  business: string;
  request?: string;
  budget?: string;
  contacts: string;
}
