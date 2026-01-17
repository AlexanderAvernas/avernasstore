import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

export const fetchProducts = async () => {
  const query = `*[_type == "product"]{
    _id,
    name,
    slug,
    description,
    price,
    specialPrice,
    image,
    extraImages,
    tax_rate,
    category,
    collection,
    isNew
  }`

  const products = await client.fetch(query)

  return products.map((product) => {
    // 🔧 FIX: Säker hantering av huvudbild
    let mainImage = null;
    if (product.image?.asset) {
      try {
        mainImage = urlFor(product.image).url();
      } catch (error) {
        console.warn(`Kunde inte ladda huvudbild för ${product.name}:`, error);
      }
    }

    // 🔧 FIX: Säker hantering av extra bilder
    let extraImages = [];
    if (Array.isArray(product.extraImages)) {
      extraImages = product.extraImages
        .filter(img => img?.asset) // Filtrera bort bilder utan asset
        .map(img => {
          try {
            return urlFor(img).url();
          } catch (error) {
            console.warn(`Kunde inte ladda extra bild för ${product.name}:`, error);
            return null;
          }
        })
        .filter(Boolean); // Ta bort null-värden
    }

    return {
      id: product._id,
      name: product.name,
      slug: product.slug.current,
      description: product.description,
      price: product.price,
      specialPrice: product.specialPrice || null,
      image: mainImage,
      extraImages: extraImages,
      tax_rate: product.tax_rate || 2500,
      category: product.category || 'others',
      collection: product.collection,
      isNew: product.isNew || false
    };
  });
}

export const fetchHero = async () => {
  const query = `*[_type == "hero"][0]{
    title,
    description,
    image
  }`

  const hero = await client.fetch(query)

  if (!hero) return null

  return {
    title: hero.title || 'Ingen titel hittades',
    image: hero.image ? urlFor(hero.image).url() : null,
    description: hero.description
  }
}

// ✅ NY funktion special price
export const fetchSpecialOffer = async () => {
  const query = `*[_type == "specialOffer" && isActive == true][0]{
    title,
    description,
    image,
    buttonText
  }`

  const offer = await client.fetch(query)

  if (!offer) return null

  return {
    title: offer.title,
    description: offer.description,
    image: offer.image ? urlFor(offer.image).url() : null,
    buttonText: offer.buttonText || 'Se erbjudanden'
  }
}

// ✅  Hämta categories från Sanity
export const fetchCategories = async () => {
  const query = `*[_type == "category"] | order(displayOrder asc){
    name,
    image
  }`

  const categories = await client.fetch(query)

  return categories.map((cat) => ({
    name: cat.name,
    image: cat.image ? urlFor(cat.image).url() : null
  }))
}

// ✅ Hämta collections från Sanity
export const fetchCollections = async () => {
  const query = `*[_type == "collection"] | order(displayOrder asc){
    name,
    image
  }`

  const collections = await client.fetch(query)

  return collections.map((col) => ({
    name: col.name,
    image: col.image ? urlFor(col.image).url() : null
  }))
}

// ✅  Hämta About Firstpage
export const fetchAboutFirstpage = async () => {
  const query = `*[_type == "aboutFirstpage" && isActive == true][0]{
    title,
    image
  }`

  const about = await client.fetch(query)

  if (!about) return null

  return {
    title: about.title,
    image: about.image ? urlFor(about.image).url() : null
  }
}