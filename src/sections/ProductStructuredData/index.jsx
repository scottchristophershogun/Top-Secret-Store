import React, { useState, useEffect } from 'react'
import Head from 'frontend-head'
import { useRouter } from 'frontend-router'
import { useCartActions } from 'frontend-checkout'
import { useIsMounted } from 'Components/Hooks'

/**
 * @typedef { import("lib/types").ShopifyProduct } ShopifyProduct
 * @typedef { import("lib/types").Variant } Variant
 * @typedef {{
 *  product: ShopifyProduct
 * }} ProductStructuredDataProps
 * @param { ProductStructuredDataProps } props
 */
const ProductStructuredData = ({ product }) => {
  const router = useRouter()
  const isMounted = useIsMounted()
  const [availableForSale, setAvailableForSale] = useState(false)

  const { isProductAvailableForSale } = useCartActions()

  useEffect(() => {
    if (!product || !product.variants || !product.variants.length) return

    const [variant] = product.variants

    async function setIsProductAvailableForSale() {
      const available = await isProductAvailableForSale({ id: variant.storefrontId })

      if (!isMounted.current) return

      setAvailableForSale(available)
    }

    setIsProductAvailableForSale()
  }, [product, isProductAvailableForSale, isMounted])

  if (!product) return null

  const { name, thumbnail, variants, description, externalId } = product
  const variant = variants && variants[0]

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: thumbnail ? thumbnail.src : undefined,
    sku: (variant || []).sku,
    mpn: externalId,
    brand: {
      '@type': 'Organization',
      name: 'Shogun',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: (variant || []).price,
      availability: availableForSale ? 'InStock' : 'OutOfStock',
      url: `https://shogun-starter-kit-mvp.frontend.getshogun.com${router.pathname}`,
      seller: {
        '@type': 'Shogun',
        name: 'Shogun',
      },
    },
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </Head>
  )
}

export default ProductStructuredData
