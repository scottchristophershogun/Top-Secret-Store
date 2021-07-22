/**
 *
 * MIT License
 *
 * Copyright 2021 Shogun, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { isBigCommerceProduct, isShopifyProduct } from 'Components/Utils'
import * as React from 'react'

export function useIsMounted() {
  const isMounted = React.useRef(false)

  React.useLayoutEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return isMounted
}

export function useIsFirstRender() {
  const isFirstRender = React.useRef(true)

  React.useEffect(() => {
    setTimeout(() => {
      isFirstRender.current = false
    }, 0)
  }, [])

  return isFirstRender
}

/**
 * @param { import("lib/types").CmsProduct | null | undefined } cmsProduct
 */
export function useNormalizedProduct(cmsProduct) {
  /** @type { import("lib/types").Product | null } */
  const product = React.useMemo(() => {
    if (!cmsProduct) return null

    if (isShopifyProduct(cmsProduct)) return cmsProduct

    if (isBigCommerceProduct(cmsProduct)) {
      return {
        externalId: cmsProduct.id,
        name: cmsProduct.name,
        slug: cmsProduct.id.toString(),
        description: 'todo',
        descriptionHtml: 'todo',
        media: [],
        variants: [],
        thumbnail: undefined,
        _highlightResult: undefined,
      }
    }

    throw new Error('Unknown Product type. Only Shopify and BigCommerce platforms are supported')
  }, [cmsProduct])

  return product
}

export default () => null
