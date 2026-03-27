import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const client = await clientPromise;
    const db = client.db('ananyanewshop');
    const productsCollection = db.collection('products');

    const product = await productsCollection.findOne({
      slug: slug.toLowerCase(),
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const mappedProduct = {
      ...product,
      id: product._id.toString(),
      _id: undefined,
    };

    return NextResponse.json(mappedProduct);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
