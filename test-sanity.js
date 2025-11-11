const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2024-01-01',
});

async function test() {
  const products = await client.fetch('*[_type == "product"]');
  console.log('Hittade produkter:', products.length);
  console.log('Första produkten:', products[0]?.name);
}

test();
