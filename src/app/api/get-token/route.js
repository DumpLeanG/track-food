import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Формируем тело запроса
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    // Отправляем запрос к Fatsecret API
    const response = await fetch('https://oauth.fatsecret.com/connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(
          `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: params,
    });

    // Проверяем, успешен ли запрос
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch token');
    }

    // Получаем данные токена
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}