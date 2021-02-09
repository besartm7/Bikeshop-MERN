import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const PaginationBox = ({ pages, page, isAdmin=false, keyword = ''}) => {
    return pages > 1 && (
        <Pagination size="sm" variant='outline-dark'>
            {[...Array(pages).keys()].map(x => (
                <LinkContainer key={x+1} to={!isAdmin ? keyword ? `/search/${keyword}/page/${x+1}` : `/bikes/page/${x+1}` : `/admin/bikelist/${x+1}`}>
                    <Pagination.Item active={x+1 === page}>{x+1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
}

export default PaginationBox
