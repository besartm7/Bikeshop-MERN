import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const PaginationOnly = ({ pages, page, rout }) => {
    return pages > 1 && (
        <Pagination size="sm" variant='outline-dark'>
            {[...Array(pages).keys()].map(x => (
                <LinkContainer key={x+1} to={`${rout}/${x+1}`}>
                    <Pagination.Item active={x+1 === page}>{x+1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
}


export default PaginationOnly
