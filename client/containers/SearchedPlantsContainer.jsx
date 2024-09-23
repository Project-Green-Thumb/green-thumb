import React from 'react';
import SearchedPlantCard from '../components/SearchedPlantCard';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const SearchedPlantsContainer = () => {
  const currentResults = useSelector((state) => state.search.currentResults);
  const plantResults = [];
  // iterate over currentResults array
  // for each item in currentResults, create a new SearchedPlantCard component
  useEffect(() => {
    for (let i = 0; i < currentResults.length; i++) {
      plantResults.push(
        <SearchedPlantCard
          key={currentResults[i].plantId}
          {...currentResults[i]}
        />
      );
    }
  }, [currentResults]);
  return <div id='searched-plants-container'>{plantResults}</div>;
};

export default SearchedPlantsContainer;
