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
    image: item.fields.image?.fields?.file?.url
    ? `https:${item.fields.image.fields.file.url}`
    : null, // Se till att det alltid är en absolut URL
    tax_rate: Number(item.fields.tax_rate) || 2500,
    category: item.fields.category || "others"
  }));
};

export const fetchHero = async () => {
    const response = await client.getEntries({
      content_type: "hero", // Kontrollera att detta matchar Contentful
    });

    console.log("Fetched hero from Contentful:", response.items); // 🔴 Loggar hela svaret från Contentful

    if (!response.items.length) return null;

    const hero = response.items[0].fields;

    return {
      title: hero.title || "Ingen titel hittades",
      image: hero.image?.fields?.file?.url || null, // 🔴 Loggar ut URL,
      description: hero.description || "Ingen beskrivning hittades"
    };
  };
