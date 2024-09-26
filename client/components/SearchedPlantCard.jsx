import React from 'react';

// rendered from SearchedPlantsContainer
const SearchedPlantCard = (props) => {
  return (
    <div className='searched-plant-card'>
      {props.default_image ? (
        <img src={props.default_image.small_url}></img>
      ) : (
        <img alt={props.common_name}></img>
      )}
      <div className='searched-plant-card-content'>
        <h3>{props.common_name}</h3>
        {/* <p>
        <em>Type: </em>
        {props.type}
      </p> */}
        <p>
          <em>Cycle: </em>
          {props.cycle}
        </p>
        <p>
          <em>Watering: </em>
          {props.watering}
        </p>
        <p>
          <em>Sunlight: </em>
          {props.sunlight}
        </p>
        {props.care_level ? (
          <p>
            <em>Care Level: </em>
            {props.care_level}
          </p>
        ) : (
          <p>Care level info not available.</p>
        )}
      </div>
    </div>
  );
};

export default SearchedPlantCard;
