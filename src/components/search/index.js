import algoliasearch from "algoliasearch/lite";
import React, { createRef, useState, useMemo } from "react";
import { InstantSearch } from "react-instantsearch-dom";
import SearchBox from "./SearchBox";
import useClickOutside from "./use-click-outside";


const Search = ({ indices }) => {
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

  const onClickOutside = () => setFocus(false);

  useClickOutside(rootRef, onClickOutside);

  const searchContainerStyles = {
    maxWidth: '500px',
  }

  return (
    <div className={'m-auto position-relative'} style={searchContainerStyles} ref={rootRef}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <SearchBox 
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
