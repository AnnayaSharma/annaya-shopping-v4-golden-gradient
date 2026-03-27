const { MongoClient } = require('mongodb');

async function run() {
  const uri = "mongodb://imastercharlie786:Mehraj4781@portfolio-shard-00-00.68g7x.mongodb.net:27017,portfolio-shard-00-01.68g7x.mongodb.net:27017,portfolio-shard-00-02.68g7x.mongodb.net:27017/ananyanewshop?ssl=true&replicaSet=atlas-spg1tt-shard-0&authSource=admin&retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('ananyanewshop');
  const products = await db.collection('products').find({}).toArray();
  
  // Find which property contains the '{name, hex, _id}' object for any product
  // Check category
  const badCategories = products.filter(p => typeof p.category === 'object');
  if (badCategories.length > 0) {
    console.log("Found BAD CATEGORIES:", badCategories.map(p => ({ id: p._id, category: p.category })));
  }

  // Also check if any other field is wrongly set
  const badNames = products.filter(p => typeof p.name === 'object');
  if (badNames.length > 0) console.log("Found BAD NAMES:", badNames);

  // Check if size is an object
  const badSizes = products.filter(p => Array.isArray(p.sizes) && typeof p.sizes[0] === 'object');
  if (badSizes.length > 0) console.log("Found BAD SIZES:", badSizes.map(p => ({ id: p._id, sizes: p.sizes})));

  // Check if color is not array of objects but just array of arrays or strings
  // Not strictly causing this error but good to know
  
  await client.close();
  console.log("DB check done.");
}

run().catch(console.error);
