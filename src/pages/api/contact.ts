import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Hàm gửi tin nhắn Telegram có retry và timeout
 */
async function sendTelegramMessage(url: string, body: any, retry = 2): Promise<any> {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      // ✅ timeout nếu Telegram chậm phản hồi
      signal: AbortSignal.timeout(6000),
    });

    const data = await res.json();
    if (!data.ok) throw new Error(data.description || 'Telegram API error');
    return data;
  } catch (err: any) {
    if (retry > 0) {
      await new Promise((r) => setTimeout(r, 1000));
      return sendTelegramMessage(url, body, retry - 1);
    }
    throw err;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res.status(405).json({ success: false, message: 'Method not allowed' });

  try {
    const { name, phone, service } = req.body;

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      throw new Error('Thiếu TELEGRAM_BOT_TOKEN hoặc TELEGRAM_CHAT_ID trong .env.local');
    }

    let serviceLabel = 'Trang điểm ngoại cảnh'; // mặc định
    if (service === 'co-dau') {
      serviceLabel = 'Trang điểm cô dâu';
    } else if (service === 'di-tiec') {
      serviceLabel = 'Trang điểm đi tiệc';
    }
    // Nội dung tin nhắn (để copy dễ dàng)
    const text = `
💄 Yêu cầu tư vấn mới:
👤 Tên: ${name}
📞 SĐT: \`${phone}\`
💅 Dịch vụ: ${serviceLabel}
⏰ Thời gian: ${new Date().toLocaleString('vi-VN')}
`;

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const body = {
      chat_id: TELEGRAM_CHAT_ID,
      text,
      parse_mode: 'Markdown',
    };

    await sendTelegramMessage(telegramUrl, body);

    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
