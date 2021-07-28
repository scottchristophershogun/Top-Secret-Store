import React from 'react'
import ResponsiveImage from 'frontend-ui/ResponsiveImage'
import Link from 'frontend-link'
import Heading from 'Components/Heading'
import Container from 'Components/Container'
import Flex from 'Components/Flex'
import Text from 'Components/Text'
import { LinkBox, LinkOverlay } from "@chakra-ui/react"

import './styles.css'

const BlogFeed = ({ blogs = [], Title }) => {
  return (
    <Container as="section" className="BlogFeed" mx="auto" maxWidth="1280px" p={6} minHeight="70vh">
      <Heading as="h1" mt="4" mb="6">{Title || 'Starter Kit blog'}</Heading>
      <Flex direction={{ base: 'column' }}>
        {blogs.map((blog, index) => (
          <Flex as="article" className="BlogFeed-post" key={index} py="6" px="4" direction="column">
            <Text><time>{blog.Date}</time> - by {blog.Author}</Text>
            <Heading className="BlogFeed-postTitle" mb="2"><Link href={`/blog/${slugify(blog.name)}`}>{blog.name}</Link></Heading>
            <ResponsiveImage className="BlogFeed-postImage" src={blog.Hero.src} alt="" />
          </Flex>
        ))}
      </Flex>
    </Container>
  )
}

export default BlogFeed

const slugify = string =>
  string.toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, '') // remove leading, trailing -
