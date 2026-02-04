// src/app/api/product-feed/route.js
import { fetchProducts } from '../../lib/sanity'

export async function GET() {
  const products = await fetchProducts()
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://margaretaavernas.se'

  // Skapa Facebook Product Feed XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Margareta Avernäs Smycken</title>
    <link>${baseUrl}</link>
    <description>Handgjorda smycken i återvunnet silver</description>
    ${products
      .map((product) => {
        const price = product.specialPrice || product.price
        const availability = 'in stock'
        
        return `
    <item>
      <g:id>${product.id}</g:id>
      <g:title>${escapeXml(product.name)}</g:title>
      <g:description>${escapeXml(product.description || product.name)}</g:description>
      <g:link>${baseUrl}/product/${product.slug}</g:link>
      <g:image_link>${product.image}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>${availability}</g:availability>
      <g:price>${(price / 100).toFixed(2)} SEK</g:price>
      <g:brand>Margareta Avernäs</g:brand>
      <g:google_product_category>Apparel &amp; Accessories &gt; Jewelry</g:google_product_category>
      ${product.collection ? `<g:product_type>${escapeXml(product.collection)}</g:product_type>` : ''}
    </item>`
      })
      .join('')}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600', // Cache i 1 timme
    },
  })
}

function escapeXml(unsafe) {
  if (!unsafe) return ''
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}