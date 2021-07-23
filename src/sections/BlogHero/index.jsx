import React from 'react'
import { ResponsiveImage } from 'frontend-ui'

import './styles.css'

const MOCK_HERO_IMAGE = {
  src: 'https://f.shgcdn.com/bbb79467-d427-4135-a589-2d194a0a011d/'
}

const BlogHero = ({ image = MOCK_HERO_IMAGE }) => {
  if (!image) return

  return (
    <div className="BlogHero">
      <ResponsiveImage className="BlogHero-hero" src={image.src} alt="" />
    </div>
  )
}

export default BlogHero
