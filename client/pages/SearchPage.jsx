import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSearchValue,
  setCurrentResults,
  addCachedSearches,
  addAllPreviousSearches,
} from '../reducers/searchSlice';
import { useState } from 'react';
import SearchedPlantsContainer from '../containers/SearchedPlantsContainer';

// rendered from DashBoard
const SearchPage = () => {
  const [currentSearch, setCurrentSearch] = useState('');
  const dispatch = useDispatch();
  const { searchBarValue, currentResults, cachedSearches, allPreviousSearches } = useSelector((state) => state.search);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(setSearchValue(currentSearch));

    // check if exact search is in cachedSearches, or if search exactly matches the common name of one of the previous searches
    if (cachedSearches[searchBarValue]) {
      dispatch(setCurrentResults(cachedSearches[searchBarValue]));
      return;
    }
    for (let i = 0; i < allPreviousSearches.length; i++) {
      if (searchBarValue === element.commonName) { // where does element come from
        dispatch(setCurrentResults([element]));
        return;
      }
    }

    fetch(`/api/species?search=${currentSearch}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(setCurrentResults(data));
        dispatch(addCachedSearches());
      });
  };

  return (
    <div>
      SearchPage
      <form onSubmit={handleSubmit}>
        <label htmlFor='search'>Search:</label>
        <input
          type='text'
          name='search'
          id='search'
          onChange={(e) => setCurrentSearch(e.target.value)}
        ></input>
        <input type='submit' value='submit'></input>
      </form>
      <SearchedPlantsContainer currentResults={currentResults}/>
    </div>
  );
};

export default SearchPage;
