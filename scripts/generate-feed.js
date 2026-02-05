import 'dotenv/config'
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

// För att bygga bild-URLer från Sanity
const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source).url()
}

async function generateFeed() {
  console.log('🔄 Generating product feed...')
  
  const query = `*[_type == "product"]{
    _id,
    name,
    slug,
    description,
    price,
    specialPrice,
    image,
    collection
  }`

  const products = await client.fetch(query)
  console.log(`📦 Found ${products.length} products`)
  
  const baseUrl = 'https://margaretaavernas.se'

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Margareta Avernäs Smycken</title>
    <link>${baseUrl}</link>
    <description>Handgjorda smycken i återvunnet silver</description>
    ${products
      .map((product) => {
        const price = product.specialPrice || product.price
        
        // Hantera Sanity-bild korrekt
        let imageUrl = ''
        if (product.image) {
          try {
            imageUrl = urlFor(product.image)
          } catch (error) {
            console.warn(`⚠️ Kunde inte generera bild för ${product.name}`)
            imageUrl = `${baseUrl}/placeholder.jpg` // fallback
          }
        }
        
        return `
    <item>
      <g:id>${product._id}</g:id>
      <g:title>${escapeXml(product.name)}</g:title>
      <g:description>${escapeXml(product.description || product.name)}</g:description>
      <g:link>${baseUrl}/product/${product.slug.current}</g:link>
      <g:image_link>${imageUrl}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>in stock</g:availability>
      <g:price>${(price / 100).toFixed(2)} SEK</g:price>
      <g:brand>Margareta Avernäs</g:brand>
      <g:google_product_category>Apparel &amp; Accessories &gt; Jewelry</g:google_product_category>
      ${product.collection ? `<g:product_type>${escapeXml(product.collection)}</g:product_type>` : ''}
    </item>`
      })
      .join('')}
  </channel>
</rss>`

  const outputPath = path.join(__dirname, '..', 'public', 'product-feed.xml')
  fs.writeFileSync(outputPath, xml, 'utf-8')
  console.log('✅ Product feed generated at /public/product-feed.xml')
  console.log(`📍 File location: ${outputPath}`)
}

function escapeXml(unsafe) {
  if (!unsafe) return ''
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

generateFeed().catch(console.error)