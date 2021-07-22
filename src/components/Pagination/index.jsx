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
import Button from 'Components/Button'
import Icon from 'Components/Icon'
import IconButton from 'Components/IconButton'
import List from 'Components/List'
import ListItem from 'Components/ListItem'
import Text from 'Components/Text'
import Container from 'Components/Container'

const ELLIPSES = '...'
const MAX_DISPLAYED_PAGE_NUMBERS = 7
const MAX_RANGE = 3

/**
 * @typedef {{
 *  totalPages: number
 *  currentPage: number
 *  onPageChange: (page: number) => void
 * }} PaginationProps
 * @param {PaginationProps} props
 */

const Pagination = ({ totalPages, currentPage = 1, onPageChange }) => {
  const pageButtons = React.useMemo(() => {
    const buttons = []

    for (let index = 1; index <= totalPages; index++) {
      buttons.push(index)
    }

    if (totalPages <= MAX_DISPLAYED_PAGE_NUMBERS) return buttons

    const firstPage = 1
    const lastPage = totalPages
    const firstSetOfButtons = buttons.slice(0, MAX_RANGE)
    const lastSetOfButtons = buttons.slice(-MAX_RANGE)

    if (currentPage <= MAX_RANGE) {
      return [...firstSetOfButtons, ELLIPSES, lastPage]
    }
    if (currentPage > totalPages - MAX_RANGE) {
      return [firstPage, ELLIPSES, ...lastSetOfButtons]
    }

    return [firstPage, ELLIPSES, currentPage - 1, currentPage, currentPage + 1, ELLIPSES, lastPage]
  }, [currentPage, totalPages])

  if (totalPages < 2) {
    return null
  }

  return (
    <Container as="nav">
      <List maxW="full" flexWrap="wrap" aria-label="pagination" display="flex" alignItems="center">
        <ListItem mr="4">
          <IconButton
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Go to previous page"
            aria-disabled={currentPage === 1}
            icon={<Icon icon="ChevronLeftIcon" size="lg" />}
            variant="iconWrapper"
            size="8"
            w="12"
          />
        </ListItem>
        {pageButtons.map((currentButton, index) => (
          <ListItem key={index} mx={{ base: 0.5, md: 1 }}>
            {typeof currentButton === 'string' ? (
              <Text aria-hidden="true">{ELLIPSES}</Text>
            ) : (
              <Button
                onClick={() => onPageChange(currentButton)}
                variant={currentButton === currentPage ? 'primary' : 'secondary'}
                size="sm"
                aria-label={
                  currentButton === currentPage
                    ? `Page ${currentButton}`
                    : `Go to page ${currentButton}`
                }
                aria-current={currentButton === currentPage ? 'page' : false}
              >
                {currentButton}
              </Button>
            )}
          </ListItem>
        ))}
        <ListItem ml="4">
          <IconButton
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Go to the next page"
            aria-disabled={currentPage === totalPages}
            icon={<Icon icon="ChevronRightIcon" size="lg" />}
            variant="iconWrapper"
            size="8"
            w="12"
          />
        </ListItem>
      </List>
    </Container>
  )
}

export default Pagination
