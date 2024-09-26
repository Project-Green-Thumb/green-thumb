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
    if (cachedSearches[currentSearch]) {
      console.log('search bar value: ', searchBarValue)
      console.log('currentSearch: ', currentSearch);
      console.log('here we are');
      dispatch(setCurrentResults(cachedSearches[currentSearch]));
      console.log(currentResults);
      return;
    }
    for (let i = 0; i < allPreviousSearches.length; i++) {
      if (currentSearch === allPreviousSearches[i].commonName) { 
        console.log('found the plant');
        dispatch(setCurrentResults(allPreviousSearches[i]));
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
        dispatch(addAllPreviousSearches(data));
        // setSearchResults(data);
      })
      .then((data) => {
        dispatch(addCachedSearches());
      })
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
      <button onClick={() => console.log(cachedSearches)}>Console log cached searches</button>
      <button onClick={() => console.log(allPreviousSearches)}>Console log all previous searches</button>
      <SearchedPlantsContainer currentResults={currentResults}/>
    </div>
  );
};

export default SearchPage;
