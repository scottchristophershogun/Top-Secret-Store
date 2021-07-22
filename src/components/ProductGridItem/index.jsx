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
import * as React from 'react'
import { useTheme } from '@chakra-ui/react'

import Container from 'Components/Container'
import Image from 'Components/Image'
import Link from 'Components/Link'
import Text from 'Components/Text'
import { getArrayNodesReplaced, getMatchesFromString } from 'Components/Utils'

/**
 * @typedef { import("lib/types").MediaItem } MediaItem
 * @type { MediaItem['details'] }
 */
const defaultImage = {
  name: 'Default Image',
  src: 'https://f.shgcdn.com/3e439e58-55b0-417d-8475-9b8db731b619/',
  width: 720,
  height: 480,
}

/**
 * @param {MediaItem[]} media
 * @returns {MediaItem['details']}
 */
const getFirstImage = media => {
  if (!media.length) return defaultImage

  return media[0].details
}

/**
 * @typedef { import("lib/types").ShopifyProduct } ShopifyProduct
 * @typedef { import("lib/types").PropsOf<Image>['loading'] } LoadingOptions
 * @typedef {{
 *  product: ShopifyProduct
 *  imageLoading: LoadingOptions
 * }} ProductGridItemProps
 * @param {ProductGridItemProps} props
 */
const ProductGridItem = ({ imageLoading, product }) => {
  const {
    name,
    slug,
    variants: [firstVariant],
    media,
    _highlightResult: highlightResult,
  } = product

  const theme = useTheme()

  const { price } = firstVariant
  const firstImage = getFirstImage(media)
  const { src, width = 720, height = 480 } = firstImage

  const highlightName =
    highlightResult && highlightResult.name ? highlightResult?.name.value : undefined
  const displayName = React.useMemo(() => {
    if (highlightName === undefined) return name

    /** @type {React.ReactNode[]} */
    let displayName = [highlightName]
    const matches = getMatchesFromString(highlightName, /<em>([^<]+)<\/em>/g)

    if (matches.length > 0) {
      matches.forEach((match, i) => {
        const replacement = (
          <Container key={`${match}${i}`} as="span" bg="lime">
            {match}
          </Container>
        )

        displayName = getArrayNodesReplaced(displayName, `<em>${match}</em>`, replacement)
      })
    }

    return displayName
  }, [name, highlightName])

  return (
    <Link href={`/products/${slug}`} aria-label={`Navigate to ${name} product page`}>
      <Container mb="3">
        <Image
          src={src}
          alt=""
          htmlWidth={width.toString()}
          htmlHeight={height.toString()}
          sizes={`(min-width: ${theme.breakpoints.sm}) 450px, 360px`}
          loading={imageLoading}
        />
      </Container>
      <Text fontSize="lg" color="black">
        {displayName}
      </Text>
      <Text color="gray.800" mb="3">
        ${Number(price).toFixed(2)}
      </Text>
    </Link>
  )
}

export default ProductGridItem
