import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { accessToken, query, page } = await req.json();

    const url = new URL('https://platform.fatsecret.com/rest/foods/search');
    url.searchParams.append('method', 'foods.search.v3');
    url.searchParams.append('search_expression', query);
    url.searchParams.append('format', 'json');
    url.searchParams.append('max_results', '50');
    url.searchParams.append('include_sub_categories', 'true');
    url.searchParams.append('flag_default_serving', 'true');
    url.searchParams.append('page_number', page);

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch food data');
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}