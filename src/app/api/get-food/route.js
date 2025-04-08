import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const foodId = searchParams.get('foodId');

    if (!foodId) {
      return NextResponse.json(
        { error: 'Food ID is required' },
        { status: 400 }
      );
    }

    const accessToken = req.headers.get('authorization')?.split(' ')[1];

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 401 }
      );
    }

    const url = `https://platform.fatsecret.com/rest/food/?method=food.get&food_id=${foodId}&format=json`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch food data from FatSecret API');
    }

    const data = await response.json();
    return NextResponse.json(data.food);
  } catch (error) {
    console.error('Error in API Route:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}