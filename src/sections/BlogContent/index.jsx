import React from 'react'
import { RichText } from 'frontend-ui'

import './styles.css'

const BlogContent = ({ content }) => {
  return (
    <article className="BlogContent">
      <RichText source={content} />
    </article>
  )
}

export default BlogContent
