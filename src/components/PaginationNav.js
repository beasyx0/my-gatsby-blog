import React from 'react';
import { Link } from 'gatsby';


const PaginationNav = ({currentPage, numPages}) => {

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? '/' : '/blog/' + (currentPage - 1).toString();
  const nextPage = '/blog/' + (currentPage + 1).toString();

  return(
    <div className={'d-flex justify-content-around'}>
      {!isFirstPage && (
        <Link to={prevPage} rel="prev">
          ← Previous Page
        </Link>
      )}
      {!isLastPage && (
        <Link to={nextPage} rel="next">
          Next Page →
        </Link>
      )}
    </div>
  );
}

export default PaginationNav;
