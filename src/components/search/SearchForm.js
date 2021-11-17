import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import Form from 'react-bootstrap/Form';
import { FaSearch } from 'react-icons/fa';
import useDarkMode from 'use-dark-mode';
import SearchResults from './SearchResults';


const SearchForm = connectSearchBox(({ 
  refine, 
  currentRefinement, 
  onFocus, 
  indices, 
  query, 
  hasFocus 
}) => {

    const darkMode = useDarkMode();

    const handleCloseResults = () => refine('');

    return(
      <Form>
        <Form.Group>
          <Form.Label
            for="searchFormInput"
            className={'position-absolute invisible'}
          >
            Search
          </Form.Label>
          <div className={'d-flex justify-content-between align-items-center'}>
            <FaSearch className={'mx-3 h4'} />
            <Form.Control 
              required
              value={currentRefinement}
              id="searchFormInput" 
              className={'bg-transparent text-muted'} 
              aria-label="Search"
              type="text"
              name="searchFormInput" 
              placeholder="Enter search query.."
              onChange={e => refine(e.target.value)}
              onFocus={onFocus}
            />
          </div>
        </Form.Group>
        <Form.Group className={`
          ${query && query.length > 0 && hasFocus ? 'd-block' : 'd-none'}
        `}>
          <SearchResults indices={indices} handleCloseResults={handleCloseResults} />
        </Form.Group>
      </Form>
    );
  }
)

export default SearchForm;