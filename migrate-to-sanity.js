// migrate-to-sanity.js
const contentful = require('contentful');
const { createClient } = require('@sanity/client');
const axios = require('axios');
require('dotenv').config();

// Contentful klient (läsa från)
const contentfulClient = contentful.createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

// Sanity klient (skriva till)
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

// Hjälpfunktion för att ladda upp bilder till Sanity
async function uploadImageToSanity(imageUrl, filename) {
  try {
    console.log(`   📸 Laddar upp bild: ${filename}...`);
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);

    const asset = await sanityClient.assets.upload('image', buffer, {
      filename: filename,
    });

    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error(`   ❌ Fel vid uppladdning av bild ${filename}:`, error.message);
    return null;
  }
}

// Huvudfunktion för att migrera produkter
async function migrateProducts() {
  console.log('🚀 Startar migrering av produkter från Contentful till Sanity...\n');

  try {
    // Hämta alla produkter från Contentful
    const response = await contentfulClient.getEntries({
      content_type: 'product',
    });

    console.log(`📦 Hittade ${response.items.length} produkter i Contentful\n`);

    for (const [index, item] of response.items.entries()) {
      console.log(`\n[${index + 1}/${response.items.length}] Migrerar: ${item.fields.name}`);

      // Ladda upp huvudbild
      let mainImage = null;
      if (item.fields.image?.fields?.file?.url) {
        const imageUrl = `https:${item.fields.image.fields.file.url}`;
        mainImage = await uploadImageToSanity(imageUrl, `${item.fields.slug}-main.jpg`);
      }

      // Ladda upp extra bilder
      const extraImages = [];
      const imageFields = ['image1', 'image2', 'image3', 'image4'];

      for (const field of imageFields) {
        if (item.fields[field]?.fields?.file?.url) {
          const imageUrl = `https:${item.fields[field].fields.file.url}`;
          const extraImage = await uploadImageToSanity(
            imageUrl,
            `${item.fields.slug}-${field}.jpg`
          );
          if (extraImage) {
            // ✅ FIXAT: Lägg till _key för varje bild
            extraImages.push({
              ...extraImage,
              _key: `${field}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
            });
          }
        }
      }

      // Skapa produktdokument i Sanity
      const sanityProduct = {
        _type: 'product',
        name: item.fields.name,
        slug: {
          _type: 'slug',
          current: item.fields.slug,
        },
        description: item.fields.description || '',
        price: item.fields.price,
        tax_rate: item.fields.tax_rate || 2500,
        category: item.fields.category || 'others',
        collection: item.fields.collection || null,
      };

      // Lägg till bilder om de finns
      if (mainImage) sanityProduct.image = mainImage;
      if (extraImages.length > 0) sanityProduct.extraImages = extraImages;

      // Skapa produkten i Sanity
      await sanityClient.create(sanityProduct);
      console.log(`   ✅ Produkt skapad i Sanity!`);
    }

    console.log('\n🎉 Migration av produkter slutförd!');
  } catch (error) {
    console.error('\n❌ Fel vid migrering av produkter:', error.message);
    throw error;
  }
}

// Migrera Hero-section
async function migrateHero() {
  console.log('\n\n🚀 Startar migrering av Hero-section...\n');

  try {
    const response = await contentfulClient.getEntries({
      content_type: 'hero',
    });

    if (response.items.length === 0) {
      console.log('⚠️  Ingen hero hittades i Contentful');
      return;
    }

    const hero = response.items[0].fields;

    // Ladda upp hero-bild
    let heroImage = null;
    if (hero.image?.fields?.file?.url) {
      const imageUrl = `https:${hero.image.fields.file.url}`;
      heroImage = await uploadImageToSanity(imageUrl, 'hero-image.jpg');
    }

    // Skapa hero i Sanity
    const sanityHero = {
      _type: 'hero',
      title: hero.title || '',
      description: hero.description || '',
    };

    if (heroImage) sanityHero.image = heroImage;

    await sanityClient.create(sanityHero);
    console.log('✅ Hero migrerad!\n');
  } catch (error) {
    console.error('❌ Fel vid migrering av hero:', error.message);
    throw error;
  }
}

// Kör migreringen
async function runMigration() {
  console.log('\n═══════════════════════════════════════════');
  console.log('   CONTENTFUL → SANITY MIGRATION');
  console.log('═══════════════════════════════════════════\n');

  try {
    await migrateProducts();
    await migrateHero();

    console.log('\n═══════════════════════════════════════════');
    console.log('   ✨ ALL MIGRATION SLUTFÖRD! ✨');
    console.log('═══════════════════════════════════════════\n');
    console.log('Nästa steg:');
    console.log('1. Starta Sanity Studio: cd sanity && sanity start');
    console.log('2. Kontrollera datan på http://localhost:3333');
    console.log('3. Uppdatera din Next.js-kod');
    console.log('4. Testa din app: npm run dev\n');
  } catch (error) {
    console.error('\n❌ Migration misslyckades:', error);
    process.exit(1);
  }
}

// Starta migrering
runMigration();
