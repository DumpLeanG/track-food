import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Получаем данные из тела запроса
    const { accessToken, query } = await req.json();

    // Формируем URL с параметрами
    const url = new URL('https://platform.fatsecret.com/rest/foods/search');
    url.searchParams.append('method', 'foods.search.v3');
    url.searchParams.append('search_expression', query);
    url.searchParams.append('format', 'json');
    url.searchParams.append('max_results', '50');
    url.searchParams.append('include_sub_categories', 'true');
    url.searchParams.append('flag_default_serving', 'true');

    // Отправляем запрос к Fatsecret API
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    // Проверяем, успешен ли запрос
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch food data');
    }

    // Получаем данные о еде
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}