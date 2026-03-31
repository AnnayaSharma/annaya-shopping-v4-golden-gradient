import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const productsCollection = db.collection('products');

    const pipeline = [
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          image: { $first: { $arrayElemAt: ['$images', 0] } },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          count: 1,
          image: 1,
        },
      },
      {
        $sort: { count: -1 },
      },
    ];

    const categories = await productsCollection.aggregate(pipeline).toArray();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
