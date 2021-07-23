import React from 'react'

import './styles.css'

const MOCK_TITLE = '10 useful Figma shortcuts'
const MOCK_AUTHOR = 'Lucas'
const MOCK_DATE = 'April 26, 2021'

const BlogHeader = ({ name = MOCK_TITLE, author = MOCK_AUTHOR, date = MOCK_DATE  }) => {
  return (
    <section className="BlogHeader">
      <h1>{name}</h1>
      <span>By {author} - {date}</span>
    </section>
  )
}

export default BlogHeader
