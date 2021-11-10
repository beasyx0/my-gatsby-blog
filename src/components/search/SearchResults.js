import { Link } from "gatsby"
import React from "react"
import {
  connectStateResults,
  connectHits,
  Highlight,
  Index,
  Snippet,
  PoweredBy,
} from "react-instantsearch-dom"
import useDarkMode from 'use-dark-mode';


const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults && searchResults.nbHits
  return hitCount > 0 ? (
    <div className="HitCount">
      {hitCount} result{hitCount !== 1 ? `s` : ``}
    </div>
  ) : null
})


const CustomHits = ({ hits, handleCloseResults }) => {

  const hitsLength = hits.length;

  return(
    <>
      {hitsLength > 0 && (
        <ul className={'p-0 mt-4 list-unstyled'}>
          {hits.map(hit => (
            <li key={hit.objectID}>
              <div className={'mx-0 my-4'}>
                <Link to={`${'/' + hit.slug}`} onClick={handleCloseResults}>
                  <h2 className={'h4'}>
                    <Highlight attribute="title" hit={hit} tagName="mark" />
                  </h2>
                </Link>
                <Snippet attribute="excerpt" hit={hit} tagName="mark" />
              </div>
            </li>
          ))}
        </ul>
      )}
      {hitsLength === 0 && (
        <p>No results</p>
      )}
    </>
  );
};

const AllHits = connectHits(CustomHits);


const SearchResultsStyles = {
  top: '60px',
  maxHeight: '80vh',
  overflowY: 'scroll',
  zIndex: 999,
};


const SearchResults = ({ indices, handleCloseResults }) => {

  const darkMode = useDarkMode();

  return(
    <div 
      className={`
        ${darkMode.value ? 'bg-dark' : 'bg-light'} p-2 position-absolute rounded
      `}
      style={SearchResultsStyles}
    >
      {indices.map(index => (
        <Index indexName={index.name}>
          <HitCount />
          <AllHits hitComponent={CustomHits} handleCloseResults={handleCloseResults} />
        </Index>
      ))}
      <PoweredBy />
    </div>
  );
};

export default SearchResults;
