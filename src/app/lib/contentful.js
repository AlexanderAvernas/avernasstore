import { createClient } from 'contentful';
console.log("contentful.js is loaded!");


const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID, // Space ID från Contentful
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN, // API-nyckel från Contentful
});

export const fetchProducts = async () => {
  const response = await client.getEntries({
    content_type: 'product', // Content Type ID från Contentful
  });

  console.log("Fetched products from Contentful:", response.items);




  // Returnera produkterna i ett enklare format
  return response.items.map((item) => ({
    id: item.sys.id,
    name: item.fields.name,
    slug: item.fields.slug,
    description: item.fields.description,
    price: item.fields.price,
    image: item.fields.image.fields.file.url,
    tax_rate: item.fields.tax_rate,
  }));
};
