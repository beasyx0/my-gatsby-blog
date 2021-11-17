import algoliasearch from "algoliasearch/lite";
import React, { createRef, useState, useMemo } from "react";
import { InstantSearch } from "react-instantsearch-dom";
import SearchForm from "./SearchForm";
import useClickOutside from "./use-click-outside";


const Search = () => {
  const rootRef = createRef();
  const [query, setQuery] = useState('');
  const [hasFocus, setFocus] = useState(false);
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  );
  const indices = [{ name: `Pages`, title: `Pages` }];

  const onClickOutside = () => setFocus(false);

  useClickOutside(rootRef, onClickOutside);

  const searchContainerStyles = {
    maxWidth: '500px',
  }

  return (
    <div className={'m-auto pb-3 position-relative'} style={searchContainerStyles} ref={rootRef}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <SearchForm 
          onFocus={() => setFocus(true)} 
          indices={indices} 
          query={query} 
          hasFocus={hasFocus} 
        />
      </InstantSearch>
    </div>
  )
}

export default Search;
