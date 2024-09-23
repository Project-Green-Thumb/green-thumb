import React from 'react';
import SearchedPlantCard from '../components/SearchedPlantCard';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { setLoggedIn } from '../reducers/userSlice';

const SearchedPlantsContainer = () => {
  const [plants, setPlants] = useState([]);
  const currentResults = useSelector((state) => state.search.currentResults);
  // iterate over currentResults array
  // for each item in currentResults, create a new SearchedPlantCard component
  useEffect(() => {
    const plantResults = [];
    for (let i = 0; i < currentResults.length; i++) {
      const plant = currentResults[i];
      plantResults.push(
        <SearchedPlantCard
          key={plant.id}
          {...plant}
        />
      );
    }
    setPlants(plantResults);
  }, [currentResults]);
  return (
    <div id='searched-plants-container'>
      <p>Results:</p>
      {plants}
    </div>
  );
};

export default SearchedPlantsContainer;
