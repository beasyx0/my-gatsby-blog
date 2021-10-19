import React from 'react';
import { Link } from 'gatsby';


const PaginationNav = ({
    currentPage, 
    numPages, 
    isFirstPage, 
    isLastPage, 
    prevPage, 
    nextPage
  }) => {

  return(
    <div className={'d-flex justify-content-around'}>
      {numPages > 1 && (
        <>
          {!isFirstPage && (
            <Link to={prevPage} rel="prev">
              ← Previous Page
            </Link>
          )}
          <small>Page {currentPage} of {numPages}</small>
          {!isLastPage && (
            <Link to={nextPage} rel="next">
              Next Page →
            </Link>
          )}
        </>
      )}
    </div>
  );
}

export default PaginationNav;
