import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('ananyanewshop');
    const productsCollection = db.collection('products');

    const products = await productsCollection.find({}).toArray();
    const mappedProducts = products.map((p) => ({
      ...p,
      id: p._id.toString(),
      _id: undefined,
    }));

    return NextResponse.json(mappedProducts);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
