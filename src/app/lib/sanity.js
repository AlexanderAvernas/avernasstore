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
    collection
  }`

  const products = await client.fetch(query)

  return products.map((product) => ({
    id: product._id,
    name: product.name,
    slug: product.slug.current,
    description: product.description,
    price: product.price,
    specialPrice: product.specialPrice || null,
    image: product.image ? urlFor(product.image).url() : null,
    extraImages: product.extraImages
      ? product.extraImages.map(img => urlFor(img).url())
      : [],
    tax_rate: product.tax_rate || 2500,
    category: product.category || 'others',
    collection: product.collection
  }))
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
    description: hero.description || 'Ingen beskrivning hittades'
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
